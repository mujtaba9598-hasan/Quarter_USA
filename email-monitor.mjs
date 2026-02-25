/**
 * Quartermasters CEO Email Monitor
 * Checks ceocli@quartermasters.me every 3 minutes for new emails.
 * Run: node email-monitor.mjs
 */

import { ImapFlow } from 'imapflow';

// ── Hardcoded Credentials ──
const CONFIG = {
    host: 'imap.hostinger.com',
    port: 993,
    secure: true,
    auth: {
        user: 'ceocli@quartermasters.me',
        pass: 'Aatika2011,'
    },
    logger: false // suppress debug logs
};

const CHECK_INTERVAL_MS = 3 * 60 * 1000; // 3 minutes
const seenUIDs = new Set();
let isFirstRun = true;

function timestamp() {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function log(msg) {
    console.log(`[${timestamp()}] ${msg}`);
}

function logEmail(email) {
    console.log('┌──────────────────────────────────────────────────');
    console.log(`│ FROM:    ${email.from}`);
    console.log(`│ SUBJECT: ${email.subject}`);
    console.log(`│ DATE:    ${email.date}`);
    console.log(`│ UID:     ${email.uid}`);
    if (email.preview) {
        console.log(`│ PREVIEW: ${email.preview.slice(0, 200)}${email.preview.length > 200 ? '...' : ''}`);
    }
    console.log('└──────────────────────────────────────────────────');
}

async function checkInbox() {
    const client = new ImapFlow(CONFIG);

    try {
        await client.connect();
        log('Connected to mailbox');

        const lock = await client.getMailboxLock('INBOX');

        try {
            // Fetch unseen (unread) messages
            const unseenMessages = [];

            for await (const msg of client.fetch(
                { seen: false },
                {
                    envelope: true,
                    bodyStructure: true,
                    source: false
                }
            )) {
                const uid = msg.uid;
                const envelope = msg.envelope;

                const email = {
                    uid,
                    from: envelope.from?.map(a => `${a.name || ''} <${a.address}>`).join(', ') || 'Unknown',
                    subject: envelope.subject || '(No Subject)',
                    date: envelope.date?.toLocaleString('en-US', { timeZone: 'Asia/Dubai' }) || 'Unknown',
                    to: envelope.to?.map(a => a.address).join(', ') || '',
                    messageId: envelope.messageId || ''
                };

                unseenMessages.push(email);

                if (!seenUIDs.has(uid)) {
                    seenUIDs.add(uid);

                    if (!isFirstRun) {
                        log('*** NEW EMAIL ***');
                        logEmail(email);
                    }
                }
            }

            if (isFirstRun) {
                log(`Inbox scan complete. ${unseenMessages.length} unread email(s) found.`);
                if (unseenMessages.length > 0) {
                    log('--- Current Unread Emails ---');
                    unseenMessages.forEach(logEmail);
                    log('--- End of Unread ---');
                }
                isFirstRun = false;
            } else {
                const newCount = unseenMessages.filter(e => !seenUIDs.has(e.uid) || seenUIDs.size === unseenMessages.length).length;
                log(`Check complete. ${unseenMessages.length} unread. Tracking ${seenUIDs.size} UIDs.`);
            }

            // Also get total mailbox stats
            const status = await client.status('INBOX', { messages: true, unseen: true });
            log(`Mailbox: ${status.messages} total, ${status.unseen} unread`);

        } finally {
            lock.release();
        }

        await client.logout();

    } catch (err) {
        if (err.code === 'EAUTH' || err.responseText?.includes('Authentication')) {
            log(`AUTH ERROR: ${err.message}`);
            log('Check credentials. Hostinger may require app-specific password or webmail login first.');
        } else if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
            log(`CONNECTION ERROR: ${err.message}`);
        } else {
            log(`ERROR: ${err.message}`);
        }
    }
}

// ── Main Loop ──
async function main() {
    console.log('');
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║   QUARTERMASTERS CEO EMAIL MONITOR               ║');
    console.log('║   ceocli@quartermasters.me                       ║');
    console.log('║   Checking every 3 minutes                       ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log('');

    log('Starting initial inbox check...');
    await checkInbox();

    log(`Next check in 3 minutes. Press Ctrl+C to stop.`);

    setInterval(async () => {
        log('Checking inbox...');
        await checkInbox();
        log(`Next check in 3 minutes.`);
    }, CHECK_INTERVAL_MS);
}

main().catch(err => {
    log(`FATAL: ${err.message}`);
    process.exit(1);
});
