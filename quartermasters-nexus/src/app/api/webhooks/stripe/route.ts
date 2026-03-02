import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe-service';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';
import { Resend } from 'resend';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    if (!STRIPE_WEBHOOK_SECRET) {
        console.error("Missing STRIPE_WEBHOOK_SECRET");
        return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const payload = await req.text();
    const signature = req.headers.get('Stripe-Signature');

    if (!signature) {
        return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleSuccessfulCheckout(session);
                break;
            }
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentIntentSuccess(paymentIntent);
                break;
            }
            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentIntentFailure(paymentIntent);
                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        // Always return 200 to acknowledge receipt of webhook from Stripe
        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error: any) {
        console.error(`Webhook handler failed: ${error.message}`);
        // Still return 200 so Stripe doesn't infinitely retry unless it's a critical DB outage
        return NextResponse.json({ error: "Handler failed internally, logged." }, { status: 200 });
    }
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
    const metadata = session.metadata || {};
    const clientId = metadata.client_id;
    const service = metadata.service;
    const tier = metadata.tier;
    const amountTotal = session.amount_total ? session.amount_total / 100 : 0; // Convert cents to dollars
    const currency = session.currency?.toUpperCase() || 'USD';

    if (!clientId) {
        console.error("Completed checkout session missing client_id metadata", session.id);
        return;
    }

    // 1. Record the Payment
    const { error: paymentError } = await supabase.from('payments').insert({
        client_id: clientId,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        amount: amountTotal,
        currency,
        status: 'succeeded',
        service,
        tier,
        metadata: {
            customer_email: session.customer_details?.email,
            customer_name: session.customer_details?.name,
        }
    });

    if (paymentError) {
        console.error("Failed to insert payment record", paymentError);
        throw paymentError;
    }

    // 2. Also log as a CRM Interaction
    await supabase.from('interactions').insert({
        contact_id: clientId,
        type: 'payment',
        summary: `Completed payment of ${amountTotal} ${currency} for ${service} (${tier}) package via portal.`,
        metadata: {
            stripe_session_id: session.id,
            amount: amountTotal,
            currency,
            service,
            tier
        }
    });

    // 3. Email founder on successful payment
    await notifyFounderPayment({
        amount: amountTotal,
        currency,
        service: service || 'Unknown',
        tier: tier || 'Unknown',
        customerEmail: session.customer_details?.email || 'Not provided',
        customerName: session.customer_details?.name || 'Not provided',
        stripeSessionId: session.id,
    });
}

/**
 * Send founder a payment notification email via Resend.
 */
async function notifyFounderPayment(details: {
    amount: number;
    currency: string;
    service: string;
    tier: string;
    customerEmail: string;
    customerName: string;
    stripeSessionId: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not set — skipping founder payment notification');
        return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { amount, currency, service, tier, customerEmail, customerName, stripeSessionId } = details;

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;">
        <tr><td style="height:4px;background:#10B981;"></td></tr>
        <tr><td style="padding:32px 40px 8px;">
          <h2 style="margin:0;color:#10B981;font-size:14px;text-transform:uppercase;letter-spacing:2px;">Payment Received</h2>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;">
          <h1 style="margin:0 0 24px;color:#f0f0f0;font-size:28px;">$${amount.toLocaleString()} ${currency}</h1>
          <table style="width:100%;margin:12px 0;" cellpadding="8" cellspacing="0">
            <tr><td style="color:#9ca3af;width:140px;">Service</td><td style="color:#f0f0f0;font-weight:600;">${service}</td></tr>
            <tr><td style="color:#9ca3af;">Tier</td><td style="color:#f0f0f0;">${tier}</td></tr>
            <tr><td style="color:#9ca3af;">Customer</td><td style="color:#f0f0f0;">${customerName}</td></tr>
            <tr><td style="color:#9ca3af;">Email</td><td style="color:#f0f0f0;">${customerEmail}</td></tr>
            <tr><td style="color:#9ca3af;">Stripe Session</td><td style="color:#f0f0f0;font-size:12px;">${stripeSessionId}</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #1f2937;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Quartermasters Payment Notification</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    try {
        await resend.emails.send({
            from: 'Quartermasters <hello@quartermasters.me>',
            to: 'ceocli@quartermasters.me',
            subject: `[Payment] $${amount.toLocaleString()} ${currency} — ${service} (${tier})`,
            html,
        });
    } catch (err) {
        console.error('Failed to send founder payment notification:', err);
    }
}

async function handlePaymentIntentSuccess(intent: Stripe.PaymentIntent) {
    // Update status if it exists, but checkout.session.completed typically handles the primary logic
    console.log(`Payment intent ${intent.id} succeeded`);
}

async function handlePaymentIntentFailure(intent: Stripe.PaymentIntent) {
    console.log(`Payment intent ${intent.id} failed`);

    // Try to find the associated client via customer or metadata
    // We'll log it if possible
    const metadata = intent.metadata || {};
    const clientId = metadata.client_id;

    if (clientId) {
        await supabase.from('payments').insert({
            client_id: clientId,
            stripe_session_id: 'unknown_session_from_intent_failure',
            stripe_payment_intent_id: intent.id,
            amount: intent.amount / 100,
            currency: intent.currency.toUpperCase(),
            status: 'failed',
            metadata: { error: intent.last_payment_error }
        });
    }
}
