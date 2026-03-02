"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { playTick, playClick } from "@/lib/sounds";
import ClickSpark from "@/components/ui/ClickSpark";

const serviceLinks = [
  { label: "Web Development", href: "/web-development" },
  { label: "Website Redesign", href: "/website-redesign" },
  { label: "Feature Injection", href: "/feature-injection" },
  { label: "Express Build", href: "/express-build" },
  { label: "Custom AI Models", href: "/ai-model-training", highlight: true },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", dropdown: serviceLinks },
  { label: "The Verdict", href: "/verdict" },
  { label: "Contact", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="glass"
        style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Brand Block (Left Aligned) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/quartermasters-logo-monogram.png"
                alt="Quartermasters Logo"
                className="h-[32px] w-[32px] md:h-[40px] md:w-[40px] rounded-sm object-contain"
              />
              <span
                className="text-lg font-medium tracking-wide leading-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                Quartermasters
              </span>
            </Link>
          </div>

          {/* Right Side (Desktop Nav + Mobile Toggle) */}
          <div className="flex flex-1 items-center justify-end gap-4">

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <Link
                      href={link.href}
                      onClick={playTick}
                      className="inline-flex items-center gap-1 text-sm font-medium transition-colors text-white/50 hover:text-white/90"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </Link>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-2 z-50"
                        >
                          <div
                            className="glass rounded-xl p-2 min-w-[220px]"
                            style={{ border: "1px solid var(--glass-border)" }}
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => { playTick(); setDropdownOpen(false); }}
                                className="block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                                style={{
                                  fontFamily: "var(--font-body)",
                                  color: item.highlight ? "var(--color-gold)" : "var(--text-muted)",
                                  fontWeight: item.highlight ? 600 : 400,
                                }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={playTick}
                    className="text-sm font-medium transition-colors text-white/50 hover:text-white/90"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                )
              )}

              {/* CTA */}
              <ClickSpark sparkColor="#C8872E">
                <Link
                  href="/contact"
                  onClick={playClick}
                  className="btn-glow-line rounded-lg px-5 py-2 text-sm font-semibold hover:bg-opacity-90 transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "var(--color-gold)",
                    color: "var(--color-white)",
                  }}
                >
                  Get Started
                </Link>
              </ClickSpark>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="relative z-10 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "var(--text-primary)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.36, ease }}
              className="fixed inset-0 top-[72px] z-40 flex flex-col p-6 md:hidden overflow-y-auto"
              style={{ background: "rgba(0, 33, 71, 0.97)", backdropFilter: "blur(20px)" }}
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.href}>
                      <button
                        onClick={() => { playTick(); setMobileServicesOpen(!mobileServicesOpen); }}
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-medium transition-colors"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                      >
                        {link.label}
                        <ChevronDown size={18} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 pb-2 flex flex-col gap-1">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => { playTick(); setMobileOpen(false); }}
                                  className="rounded-lg px-4 py-2 text-base transition-colors"
                                  style={{
                                    fontFamily: "var(--font-body)",
                                    color: item.highlight ? "var(--color-gold)" : "var(--text-muted)",
                                    fontWeight: item.highlight ? 600 : 400,
                                  }}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => { playTick(); setMobileOpen(false); }}
                      className="rounded-lg px-4 py-3 text-lg font-medium transition-colors"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                      {link.label}
                    </Link>
                  )
                )}

                <div className="mt-6">
                  <ClickSpark sparkColor="#C8872E">
                    <Link
                      href="/contact"
                      onClick={() => { playClick(); setMobileOpen(false); }}
                      className="btn-glow-line block w-full rounded-lg py-3 text-center text-sm font-semibold"
                      style={{
                        fontFamily: "var(--font-body)",
                        background: "var(--color-gold)",
                        color: "var(--color-white)",
                      }}
                    >
                      Get Started
                    </Link>
                  </ClickSpark>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
