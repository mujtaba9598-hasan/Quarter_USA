import Link from "next/link";
import Image from "next/image";
import { FooterTicker } from "@/components/layout/FooterTicker";
import { CookiePreferencesButton } from "@/components/layout/CookiePreferencesButton";

const footerLinks = {
  services: [
    { label: "Web Development", href: "/web-development" },
    { label: "Website Redesign", href: "/website-redesign" },
    { label: "Feature Injection", href: "/feature-injection" },
    { label: "Express Build", href: "/express-build" },
    { label: "Custom AI Models", href: "/ai-model-training" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Schedule Consultation", href: "/booking" },
    { label: "Client Portal", href: "/portal" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Cookie Preferences", href: "#", onclick: "deleteCookiePreferences" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

/**
 * Footer — Server Component.
 * Light mode coastal theme. Link hover effects use pure CSS.
 * Only the live ticker is a client island.
 */
export function Footer() {
  return (
    <footer>
      {/* Live Operations Ticker — client island */}
      <div
        className="overflow-hidden py-2"
        style={{
          background: "var(--color-ocean)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <FooterTicker />
      </div>

      {/* Main Footer */}
      <div
        style={{
          background: "var(--color-ocean)",
          color: "var(--color-white)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" aria-label="Back to Homepage" className="inline-block transition-opacity hover:opacity-80">
                <img
                  src="/quartermasters-logo-monogram.png"
                  alt="Quartermasters"
                  className="h-[32px] w-[32px] rounded-sm object-contain"
                />
              </Link>
              <p
                className="mt-4 max-w-sm text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Web development, AI integration, and custom digital
                infrastructure — built by senior engineers for businesses
                that demand an unfair advantage.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="pill-tag pill-tag--tech">#WebDev</span>
                <span className="pill-tag pill-tag--it">#AIIntegration</span>
                <span className="pill-tag pill-tag--tech">#ExpressBuild</span>
              </div>
            </div>

            {/* Service Links */}
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gold)",
                }}
              >
                Services
              </p>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors text-white/50 hover:text-white/90"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gold)",
                }}
              >
                Company
              </p>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    {link.label === "Cookie Preferences" ? (
                      <CookiePreferencesButton />
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm transition-colors text-white/50 hover:text-white/90"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                &copy; {new Date().getFullYear()} Quartermasters. All rights reserved.
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                California, United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
