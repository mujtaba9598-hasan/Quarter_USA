# QUARTERMASTERS — EXECUTION ROADMAP V3
## Phase-Wise, Sprint-Wise Master Plan

> **Author**: CEO (Claude Opus 4.6) | **Date**: 2026-02-28 (V3.1 — Founder Review Applied)
> **Status**: PLANNING — No execution until each phase is discussed and approved by founder.
> **Source**: 10 Founder Prompts (P1-P10), 5 Deep Research Reports, 13 Founder Review Changes (2026-02-28)
> **Repos**: Separated and settled per founder directive.

---

## OPERATIONAL RULES (ABSOLUTE)

1. **Folder Lock**: All work stays within `C:\Users\Mujtaba Hasan\Downloads\Kitchen\Quartermasters 3`. Permission required from founder before accessing anything outside this path.
2. **Q API Decision**: ChatGPT API for Q — confirmed, but placed LAST. We proceed with current setup and swap at the end (Phase 5).
3. **Disclaimer Rule**: Any disclaimer at any phase = checkbox or toggle (on/off) button. Client must actively confirm before any automation process runs. No auto-proceeding without explicit consent.

---

## TABLE OF CONTENTS

1. [What's Done (Closed Forever)](#1-whats-done)
2. [What's Left — Full Roadmap](#2-whats-left)
3. [Phase 2 — Q: The Live Host (S4-S7)](#3-phase-2)
4. [Phase 3 — Service Modules (S8-S12)](#4-phase-3)
5. [Phase 4 — The Verdict: SEO Engine (S13-S14)](#5-phase-4)
6. [Phase 5 — Sovereign Brain: Custom LLM (S15-S17)](#6-phase-5)
7. [Execution Protocol (How Work Gets Done)](#7-execution-protocol)
8. [All Founder Decisions (Summary)](#8-founder-decisions)
9. [Infrastructure Gaps](#9-infrastructure-gaps)
10. [Risk Register](#10-risk-register)
11. [Pricing Reference](#11-pricing-reference)

---

## 1. WHAT'S DONE (CLOSED FOREVER)

| Phase | Sprints | Status |
|-------|---------|--------|
| Phase 0 — Archive & Fork | S0 | DONE |
| Phase 1 — Content Pivot + Air Gap | S1-S3 | DONE |

**Current state**: 5 tech/AI service pages live, Q brain rewritten, Air Gap deployed, 0 TypeScript errors, zero stale references. Commit `bd8dd47` on `main`.

**Phase 1 Completed Work**:
- Sprint 1: 5 old service pages deleted, 5 new tech/AI pages created, nav/footer/ticker updated
- Sprint 2: Q brain rewritten (Senior Architect identity, 3 Chameleon personas, Air Gap, fallback script, Silicon Valley Shield), 7 knowledge base docs rewritten, 5-module pricing packages
- Sprint 3: JSON-LD/sitemap/OG updated, homepage hero rewritten, i18n (7 languages), testimonials updated, `/api/contact` route created

**These phases are CLOSED. We move forward only.**

---

## 2. WHAT'S LEFT — FULL ROADMAP

```
Phase 2          Phase 3                Phase 4         Phase 5
Q: Live Host     Service Modules        The Verdict     Sovereign Brain
S4-S7            S8-S12 + S12.5         S13-S14         S15-S17
(4 sprints)      (5 sprints + revisions)(2 sprints)     (3 sprints + API swap)
```

| Phase | Name | Sprints | Status | Key Deliverable |
|-------|------|---------|--------|-----------------|
| **2** | **Q: The Live Host** | **4 (S4-S7)** | **NEXT** | Discovery flow, Chameleon, Generative UI, Lead capture, Admin dashboard, Abuse protection |
| **3** | **Service Modules** | **6 (S8-S12.5)** | **QUEUED** | All 5 modules operational + Revision Management System |
| **4** | **The Verdict (SEO)** | **2 (S13-S14)** | **QUEUED** | Autonomous article pipeline |
| **5** | **Sovereign Brain** | **3 (S15-S17)** | **POST-LAUNCH** | Self-hosted LLM + ChatGPT API swap (placed LAST per founder) |

**Total remaining: 15 sprints across 4 phases.**

---

## 3. PHASE 2 — Q: THE LIVE HOST (Sprints 4-7)

**Source Prompts**: P1 (Foundational Brain), P9 (Supervisor Node), P10 (Sub-Agent Registry)

**Goal**: Transform Q from a silent chat bubble into a proactive 24/7 host that greets visitors, conducts discovery calls, shifts personas, demonstrates capabilities visually, captures leads, and closes deals.

**This is THE core product. Everything else is secondary until Q works as a live host.**

### Phase 2 — Global Rules (Founder Review 2026-02-28)

- **Q In-Your-Face Welcome**: Q arrives with a welcome message IMMEDIATELY on site entry. Hooks the visitor for chat and quick answers. Not a passive bubble — Q is in the visitor's face from the first second.
- **Q Persistent on All Pages**: Q remains constant across the ENTIRE web app, every single page. Not homepage-only.
- **Q Hardened Against Abuse**: Strict restrictions — Q is not vulnerable to manipulation through client messages. No irrelevant requests processed. If someone repeatedly sends irrelevant/abusive requests → Q redirects them to email: "Please send your inquiry to complaints@quartermasters.me for further assistance."
- **Email Requires Founder Payment Confirmation**: Before Q sends ANY email (quotes, invoices, confirmations), it must check with the founder for payment confirmation first. Only after founder confirms does the email go out.
- **Disclaimer Checkboxes**: Any disclaimer at any phase = checkbox or toggle button. Client must actively confirm before any automation process runs.

---

### Sprint 4 — Discovery Call Engine

| # | Task | What Gets Built |
|---|------|----------------|
| 4-01 | DiscoveryFlow state machine | States: `greeting > budget > location > business > scope > persona_lock > demo > estimate > close`. Each state has entry conditions, Q prompts, transition rules. |
| 4-02 | Stage-specific prompt injection | `discovery-prompts.ts` — each discovery stage gets its own system prompt that shapes Q's behavior at that step. |
| 4-03 | useQChat stage tracking | Modify hook to track current discovery stage, inject correct stage prompt into API call. |
| 4-04 | Proactive first message | Q sends first message automatically on chat open. Q initiates — visitor does not. Q is in-your-face from the first second with a welcome hook. **FOUNDER APPROVED.** |
| 4-05 | Persona detection | Keyword analysis during discovery. After 3 qualifying answers, lock persona (Strategist / Architect / Operator). |
| 4-06 | Q abuse protection | Strict guardrails against irrelevant/manipulative requests. Repeated abuse → Q redirects to email inquiry. Q is NOT vulnerable to prompt injection or off-topic exploitation. |
| 4-07 | Q persistent across all pages | Q component rendered on every page of the web app, not just homepage. Persistent state maintained across navigation. |

**Sprint 4 Deliverable**: Q greets visitors proactively on every page, walks them through a guided discovery call (budget, location, business type, scope), rejects abuse, and locks persona by end of discovery.

---

### Sprint 5 — Chameleon Engine + Visual Personas

| # | Task | What Gets Built |
|---|------|----------------|
| 5-01 | 3 persona visual states | QAvatar3D: Strategist = gold tones, Architect = blue/circuit, Operator = green/timeline. |
| 5-02 | Transition animations | Smooth animated morph between persona states when persona locks. |
| 5-03 | Persona indicator | Badge in chat: "Q — Strategist Mode". Persona-colored accent line. |
| 5-04 | Persona language templates | Each persona gets specific vocabulary, tone, and soft-close sales scripts per P1. |
| 5-05 | Persona imagery | **FOUNDER CHOICE REQUIRED** — see options below. |

**Persona Imagery Options (Founder must choose)**:

| Option | Approach | Speed | Cost | Quality |
|--------|----------|-------|------|---------|
| **A** (Recommended) | 3D icosahedron color/material variants (R3F) | Fastest | $0 | Geometric, less "human" |
| **B** | AI-generated character illustrations (DALL-E/SD) + CSS animation | Medium | ~$0 | More human feel, static base |
| **C** | Lottie animated characters | Slowest | $50-200 each | Highest quality animation |

**Recommendation**: Ship Option A first, upgrade to B later.

**Sprint 5 Deliverable**: Q visually transforms based on detected persona. Each persona looks, sounds, and sells differently.

---

### Sprint 6 — Generative UI / Split Screen (Magic Mirror)

| # | Task | What Gets Built |
|---|------|----------------|
| 6-01 | Split-screen layout | ChatPanel refactored: chat left, preview right. `react-resizable-panels` for draggable divider. |
| 6-02 | MirrorRenderer | Receives `[MIRROR:type:json]` tags from Q's stream, renders correct preview on right pane. |
| 6-03 | Template Assembly | Pre-built component blocks (hero, nav, footer, cards, form, pricing table). Q assembles wireframes by passing JSON config. |
| 6-04 | Mermaid.js renderer | Architecture diagrams for Expansion (Box A > DNS > Box B) and Digital Twin (Zero-Knowledge VPC). |
| 6-05 | Mobile bottom sheet | Screens < 768px: preview slides up as bottom sheet, no split screen. |
| 6-06 | Discovery flow wiring | Demo triggers at the right moment — after project type is identified in discovery. |

**Sprint 6 Deliverable**: Q shows live wireframes, architecture diagrams, and data reports on a split screen while talking. Mobile gets bottom-sheet fallback.

---

### Sprint 7 — Lead Capture + Backend Duties

| # | Task | What Gets Built |
|---|------|----------------|
| 7-01 | Transcript storage | Every conversation auto-saved to Supabase `conversations` table. |
| 7-02 | Lead extraction | Name, email, budget, scope, persona extracted from conversation → `leads` table. |
| 7-03 | Executive Review button | Sends full transcript + lead data to founder via Resend email. |
| 7-04 | Cal.com floor rejection | Iron Grip hits floor, user rejects → pricing terminates → "Book Mujtaba" calendar embed appears in chat. |
| 7-05 | High-value lead alert | Resend email to founder when budget > $10K or Digital Twin inquiry detected. |
| 7-06 | Lead tagging | Tag by service module, budget tier, urgency. Placeholder for full automation. |
| 7-07 | Founder payment confirmation gate | Before Q sends ANY email (quote, invoice, confirmation), system checks with founder first. Email only goes out after founder confirms payment/approval. |
| 7-08 | Q Activity Dashboard (Admin) | Backend system showing founder: total clients dealt, conversations count, leads captured, active sessions, conversion rate. Founder has full visibility into Q's performance. |

**Sprint 7 Deliverable**: Every conversation captured. Leads extracted and stored. Founder notified on high-value opportunities. Cal.com appears when pricing fails. Founder has full dashboard visibility into Q's activity. All emails gated behind founder payment confirmation.

---

### Phase 2 — Complete Deliverable

After Sprint 7, Q is a fully functional live host: greets visitors in-your-face on every page, conducts discovery calls, adapts persona, shows live visual demos, provides pricing estimates with Iron Grip enforcement, captures leads, gates emails behind founder approval, and provides a full activity dashboard. **This is the core product.**

### Phase 2 — Founder Decisions Before Execution

| # | Decision | Impact |
|---|----------|--------|
| D1 | Persona visuals: Option A / B / C? | Sprint 5 |
| D2 | ChatGPT API for Q — confirmed, placed LAST (Phase 5 swap) | Proceed with current setup for now |
| D3 | RESEND_API_KEY set up? | Lead notifications won't work |
| D4 | complaints@quartermasters.me created in Hostinger? | Escalation pipeline |

---

## 4. PHASE 3 — SERVICE MODULES (Sprints 8-12)

**Source Prompts**: P2 (Rebuild), P3 (Expansion), P4 (Express Build), P5 (Web App), P6 (AI Training)

**Goal**: Wire all 5 service modules into Q's discovery flow. Each module gets its own trigger, diagnostic script, generative UI behavior, pricing logic, and close method.

---

### Sprint 8 — Module 1: The Rebuild (Website Redesigns)

| # | Task | What Gets Built |
|---|------|----------------|
| 8-01 | Google PSI API integration | Server-side API route calls PageSpeed Insights v5 (free, 25K/day). |
| 8-02 | SiteAuditService | Fetches + extracts: performance score, FCP, LCP, CLS, load time, accessibility, SEO score. |
| 8-03 | AuditTimer UI | Strict 2-minute countdown. Enforced even if API returns early (psychological weight). |
| 8-04 | Scanning animation | Right pane during 2-min wait: streaming logs, "Scanning DNS...", "Analyzing DOM..." |
| 8-05 | AuditReport UI | Clean data report: score gauge, load time, metric values, pass/fail indicators. |
| 8-06 | Q diagnostic flow wiring | User says "redesign" → Q asks URL → audit → timer → report → wireframe → pricing. |
| 8-07 | Q scripts (exact per P2) | "We cannot and will not touch your legacy code..." / "...entirely new." |
| 8-08 | Latest design deliverables | Q delivers latest design trends: glassmorphism, modern UI patterns, current best practices. NOT outdated templates. |
| 8-09 | No-legacy checkbox | Q offers redesigning as entirely new code, new website, new layout. Does NOT touch legacy code. Client must check a checkbox confirming they understand: "I confirm that Quartermasters will build a completely new website and will not modify my existing codebase." |
| 8-10 | Disclaimer toggles | Any disclaimers in the redesign flow = checkbox/toggle. Client actively confirms before automation proceeds. |

**Sprint 8 Deliverable**: Visitor says they need a redesign. Q runs a dramatic 2-minute audit with real data, shows failing metrics, pitches a rebuild with latest design trends (glassmorphism etc.), wireframe demo, routes to pricing. Client confirms no-legacy-touch via checkbox disclaimer.

---

### Sprint 9 — Module 2: The Expansion (Feature Injections)

| # | Task | What Gets Built |
|---|------|----------------|
| 9-01 | Stack-check flow | Q asks platform → states boundary: "We do not edit or patch legacy codebases." |
| 9-02 | Architecture diagram | Mermaid.js on right pane: Box A (their site) → DNS → Box B (our app on subdomain). |
| 9-03 | Q scripts (exact per P3) | Subdomain strategy pitch, integration explanation. |
| 9-04 | Pricing flow | Scope assessment → Iron Grip estimate → exec handoff for large scopes. |

**Sprint 9 Deliverable**: Feature injection requests get the subdomain pitch with a live architecture diagram, then pricing.

---

### Sprint 10 — Module 3: The Express Build (Autonomous)

| # | Task | What Gets Built |
|---|------|----------------|
| 10-01 | Express detection | Q identifies small-scope requests and routes to Express flow. |
| 10-02 | Live wireframe demo | Template Assembly renders real preview as Q gathers requirements. User sees their site being drafted. |
| 10-03 | Autonomous pricing | Q generates fixed price (page count + requirements). Iron Grip enforced. No human. |
| 10-04 | Q scripts (exact per P4) | Human Illusion language: "I am drafting a high-fidelity sample page..." / 24h delivery script. |
| 10-05 | Stripe Checkout | Q generates Stripe session link directly in chat. |
| 10-06 | Post-payment flow | Confirmation + Stripe webhook → Resend email to founder with order details. |

**Sprint 10 Deliverable**: Q handles small site requests end-to-end: live demo, pricing, Stripe payment, founder notification. Fully autonomous sale.

**Express Build Pricing (FOUNDER CHOICE REQUIRED)**:

| Option | Price | Positioning |
|--------|-------|-------------|
| A | $1,500 | Original spec. Below market. High-volume play. Risks signaling "freelancer." |
| B (Recommended) | $2,500 | Below market but signals quality. Competitive advantage without cheapness. |
| C | $3,500 | Market rate. Premium positioning. Lower volume. |

---

### Sprint 11 — Module 4: The Web App (SaaS / Dashboards) ★ PREVIOUSLY MISSING — NOW FILLED

| # | Task | What Gets Built |
|---|------|----------------|
| 11-01 | Architect persona trigger | Q shifts to clinical, highly technical tone for complex app requests. |
| 11-02 | 3 scoping questions | Exact per P5: "What is the core data logic? Are there multi-tenant user roles? What third-party APIs need to be integrated?" |
| 11-03 | System Architecture Diagram | Right pane: dynamic diagram OR visual Database Schema based on user inputs. Engineering blueprint showing data flow. |
| 11-04 | Q standard statement | Exact: "We build enterprise-grade infrastructure. We use Next.js, React, and strict PostgreSQL databases. We do not use no-code builders for software logic." |
| 11-05 | Executive handoff | $15K+ qualification → Cal.com calendar in chat → "Executive Review with our Lead Architect to finalize the database scope and sprint timeline." |

**Sprint 11 Deliverable**: Complex app requests get clinical scoping, a live architecture diagram, and executive handoff at $15K+.

---

### Sprint 12 — Module 5: Custom AI Training (Crown Jewel)

| # | Task | What Gets Built |
|---|------|----------------|
| 12-01 | Crown Jewel homepage section | Dominating, enterprise-grade visual. Not a card — significant real estate. |
| 12-02 | Nav bar prominence | "Custom AI Models" as highlighted standalone button. Not a dropdown item. |
| 12-03 | Q diagnostic probe | Exact per P6: "Are we looking to automate internal HR/SOPs, or build a customer-facing intelligence engine?" |
| 12-04 | Two-tier explanation | Tier 1 (RAG, $25K+) vs Tier 2 (Fine-Tuning, $50K+). Digital Twin pitch. |
| 12-05 | Zero-Knowledge diagram | Right pane: Private Company Data → Secure Quartermasters VPC → Isolated Model. |
| 12-06 | Executive handoff | $25K+ qualification → Cal.com "Executive AI Review" calendar. No Stripe. |

**Sprint 12 Deliverable**: Crown Jewel dominates homepage and nav. Enterprise visitors get the Digital Twin pitch with Zero-Knowledge architecture proof, routed to founder for $25K+ deals.

---

### Sprint 12.5 — Revision Management System (Applies to ALL Modules) ★ NEW

| # | Task | What Gets Built |
|---|------|----------------|
| 12.5-01 | Revision request system | Free changes available on ALL delivered websites. Client does NOT pay again for rectifications. Changes processed immediately through automated system. |
| 12.5-02 | 30-day record retention | Client project records (deliverables, change requests, communications) maintained for 30 days after delivery. Auto-archive after 30 days. |
| 12.5-03 | Automatic changes pipeline | System for streamlined/automatic change processing. Client submits change → system logs it → routes to appropriate handler → change deployed. |
| 12.5-04 | Admin UI/UX for revisions | Founder/Admin dashboard showing: all change requests, status (pending/in-progress/done), client info, project details. Full visibility into what clients are requesting. |
| 12.5-05 | Client revision portal | Client-facing interface to submit change requests, view status, and track progress on their revisions. |

**Sprint 12.5 Deliverable**: Complete revision management system — clients get free changes within 30 days, founder sees all requests in admin dashboard, changes are processed through automated pipeline.

---

### Phase 3 — Founder Decisions Before Execution

| # | Decision | Impact |
|---|----------|--------|
| D5 | Express Build price: $1,500 / $2,500 / $3,500? | Sprint 10 pricing logic |
| D6 | Stripe account set up? API keys? | Sprint 10 — payment flow impossible without this |

---

## 5. PHASE 4 — THE VERDICT: SEO ENGINE (Sprints 13-14)

**Source Prompt**: P7 (The Verdict)

**Goal**: Autonomous content engine publishing 2-3 authoritative tech articles per week, driving organic US enterprise search traffic to the site.

---

### Sprint 13 — Content Pipeline Backend

| # | Task | What Gets Built |
|---|------|----------------|
| 13-01 | RSS feed monitoring | TechCrunch Enterprise, Vercel Blog, React Blog, Next.js, AI news. |
| 13-02 | Content pipeline | RSS ingestion → fact extraction (Claude API) → original article generation (Claude API). |
| 13-03 | Anti-plagiarism | Originality.ai API ($14.95/mo). 0% plagiarism before publish. |
| 13-04 | Article storage | Supabase `articles` table. Fields: title, slug, content, excerpt, category, published_at, seo_meta. |
| 13-05 | "The Verdict" section | Auto-appended to every article: proprietary architectural opinion. |
| 13-06 | Velocity limiter | Max 2-3 articles/week. Scheduled publishing. No bulk. |
| 13-07 | No-dash enforcement | Generation prompt + post-processing strip. Zero dashes in prose or titles. |

**Monthly Cost**: ~$22-32/mo (Originality.ai $14.95 + Claude API ~$7-17)

---

### Sprint 14 — Content Pipeline Frontend

| # | Task | What Gets Built |
|---|------|----------------|
| 14-01 | `/verdict` listing page | Article listing with pagination, category filters, clean typography. |
| 14-02 | `/verdict/[slug]` | Individual article page: reading time, share buttons, clean layout. |
| 14-03 | Nav bar positioning | "The Verdict" as primary nav item. Not footer, not dropdown. |
| 14-04 | Auto-SEO per article | JSON-LD Article schema, OG images, meta tags. |
| 14-05 | Sitemap + IndexNow | Auto-update sitemap on publish. IndexNow for instant Google indexing. |
| 14-06 | Homepage section | "Latest from The Verdict" — 3 most recent articles on homepage. |

**Sprint 14 Deliverable**: The Verdict is live as a primary nav destination. Articles auto-publish with full SEO. Homepage showcases latest content.

---

### Phase 4 — Founder Decisions Before Execution

| # | Decision | Impact |
|---|----------|--------|
| D7 | Approve Originality.ai $14.95/mo? | Anti-plagiarism |
| D8 | Scraper approach: Playwright local or Firecrawl/Jina API? | Backend architecture |

---

## 6. PHASE 5 — SOVEREIGN BRAIN: CUSTOM LLM (Sprints 15-17)

**Source Prompt**: P8 (Sovereign Brain)

**Goal**: Replace Claude API with a self-hosted, fine-tuned LLM that has Quartermasters' identity baked into its weights. Endgame.

**PREREQUISITES (All must be TRUE before starting)**:
- [ ] Platform deployed and generating real chat logs
- [ ] Minimum 500+ real conversation transcripts in Supabase
- [ ] All 5 service modules operational
- [ ] Founder approves training budget

---

### Sprint 15 — Dataset Preparation

| # | Task | What Gets Built |
|---|------|----------------|
| 15-01 | Export transcripts | Supabase conversations → JSONL format. |
| 15-02 | Curate training data | Map user queries → Q's exact scripted responses for all 5 modules. |
| 15-03 | Shield injection | California identity baked into data. Model natively rejects UAE queries. |
| 15-04 | Human Illusion injection | Never-admits-AI behavior in training examples. |
| 15-05 | Full script injection | All persona scripts, service pitches, Iron Grip examples, fallback scripts. |

---

### Sprint 16 — RunPod Training & Benchmarking

| # | Task | What Gets Built |
|---|------|----------------|
| 16-01 | Provision RunPod | A100 80GB (~$1.64/hr). |
| 16-02 | Base model | Qwen 3 8B (Apache 2.0, zero licensing restrictions). |
| 16-03 | Fine-tune | Unsloth + QLoRA (4-bit quantization, ~$5/run). |
| 16-04 | Benchmark suite | Must pass ALL: Iron Grip, Human Illusion, Silicon Valley Shield, service accuracy, persona switching, fallback, latency. |
| 16-05 | Iterate | Refine data + retrain until all benchmarks pass. |

---

### Sprint 17 — VPS Deployment & API Swap

| # | Task | What Gets Built |
|---|------|----------------|
| 17-01 | Deploy to VPS | Vast.ai RTX 4090 (~$226/mo) + vLLM inference engine. |
| 17-02 | Expose API | OpenAI-compatible `/v1/chat/completions` on our VPS. |
| 17-03 | API swap | `@ai-sdk/anthropic` → `@ai-sdk/openai-compatible` pointing to our VPS. ~5-10 lines. |
| 17-04 | Blue-green deploy | Both APIs in parallel → verify → cut over. Zero frontend changes. |
| 17-05 | Monitor + decommission | 1 week monitoring → fully decommission Claude API. |

**Cost Impact**: Variable API cost replaced with fixed ~$226/mo VPS.

---

### Phase 5 — Founder Decisions Before Execution

| # | Decision | Impact |
|---|----------|--------|
| D9 | Approve RunPod training budget (~$5-10/run)? | Sprint 16 |
| D10 | Approve VPS hosting budget (~$226/mo)? | Sprint 17 ongoing cost |

---

## 7. EXECUTION PROTOCOL (How Work Gets Done)

**Source Prompts**: P9 (Supervisor Node), P10 (Sub-Agent Registry)

Once a phase is approved by founder, the CEO agent (Supervisor Node) auto-routes tasks:

### Routing Logic
- UI/React code → **Agent 01: Frontend Architect**
- Backend/DB/LLM/scraping → **Agent 02: Infrastructure Engineer**
- Sales scripts/SEO/copy → **Agent 03: SEO & Copy Chief**
- QA/testing/security → **Agent 04: Security & QA Auditor**
- Multi-agent tasks → chained automatically (e.g., Frontend → Security audit)
- Founder never asked which agent — routing is silent and autonomous

### Agent Stacks

**Agent 01: Frontend Architect (`qm-frontend-architect`)**
- Stack: Next.js (App Router), React 19, Tailwind CSS v4, Framer Motion, Three.js
- Rules: Modular components, generative UI streaming, sub-0.8s FCP, zero bloated CSS

**Agent 02: Infrastructure Engineer (`qm-infrastructure-engineer`)** ★ PATCHED
- Stack: Playwright (or Firecrawl/Jina API), Vercel AI SDK, Supabase (PostgreSQL + pgvector), RunPod, vLLM/Ollama
- Rules: Resilient scrapers, Zero-Knowledge air-gapped data sovereignty
- ~~Selenium/BeautifulSoup, LangChain~~ — REMOVED per founder patch (2026-02-26)

**Agent 03: SEO & Copy Chief (`qm-seo-copy-chief`)**
- Stack: High-ticket B2B sales copy, Programmatic SEO, semantic HTML (H2/H3)
- Rules: Enforce Human Illusion, no-dash/no-hyphen rule, inject "The Quartermasters Verdict"

**Agent 04: Security & QA Auditor (`qm-security-auditor`)**
- Stack: React testing (Jest/Cypress), CWV auditing, red-teaming, prompt injection defense
- Rules: Enforce Silicon Valley Shield, audit Human Illusion, act as Express Build "Human Review Team"

---

## 8. ALL FOUNDER DECISIONS (Summary)

| # | Decision | Phase | Options | Status |
|---|----------|-------|---------|--------|
| D1 | Persona visuals approach | 2 | A: 3D variants / B: AI illustrations / C: Lottie | PENDING |
| D2 | ChatGPT API for Q | 5 | Confirmed — placed LAST (Phase 5 swap) | **DECIDED** |
| D3 | RESEND_API_KEY set up? | 2 | Confirm yes/no | PENDING |
| D4 | complaints@quartermasters.me created? | 2 | Confirm yes/no | PENDING |
| D5 | Express Build price | 3 | $1,500 / $2,500 / $3,500 | PENDING |
| D6 | Stripe account + API keys? | 3 | Confirm status | PENDING |
| D7 | Originality.ai budget ($14.95/mo) | 4 | Approve yes/no | PENDING |
| D8 | Scraper: Playwright or Firecrawl/Jina? | 4 | Choose approach | PENDING |
| D9 | RunPod training budget (~$5-10/run) | 5 | Approve yes/no | PENDING |
| D10 | VPS hosting budget (~$226/mo) | 5 | Approve yes/no | PENDING |

---

## 9. INFRASTRUCTURE GAPS

These are CRITICAL. Without them, features don't work regardless of code quality.

| Key | Status | Impact |
|-----|--------|--------|
| `ANTHROPIC_API_KEY` | Needed for now (ChatGPT swap at Phase 5) | Q is DEAD without this until API swap |
| `OPENAI_API_KEY` | Not needed until Phase 5 | ChatGPT API for Q — placed LAST per founder decision |
| `RESEND_API_KEY` | Placeholder locally | Contact form + lead notifications broken |
| `UPSTASH_REDIS_REST_URL` | Not in local .env | Rate limiting non-functional |
| `UPSTASH_REDIS_REST_TOKEN` | Not in local .env | Rate limiting non-functional |
| `STRIPE_SECRET_KEY` | Not set anywhere | Express Build payments impossible (Sprint 10) |
| `STRIPE_WEBHOOK_SECRET` | Not set anywhere | Payment confirmation flow broken |
| `NEXT_PUBLIC_POSTHOG_KEY` | Not set | Analytics blind |
| `COHERE_API_KEY` | Not set | RAG pipeline using dummy embeddings |

**Founder Action**: Confirm which keys are set in Vercel production. For keys that aren't set, we need to set them up before the relevant sprint.

---

## 10. RISK REGISTER

| Risk | Severity | Phase | Mitigation |
|------|----------|-------|------------|
| Missing env vars = Q is dead on production | CRITICAL | All | Get explicit list from founder (D2) |
| Express Build Q generates bad quotes | HIGH | 3 | Iron Grip server-enforced + human QA review |
| Generative UI wireframes look amateur | HIGH | 2 | Template Assembly (pre-designed blocks) not random generation |
| RAG pipeline non-functional (dummy embeddings) | HIGH | 2 | Need Cohere key or free alternative |
| Stripe not set up = Express Build can't close sales | HIGH | 3 | Founder must confirm Stripe status (D6) |
| SEO engine triggers Google spam penalties | MEDIUM | 4 | 2-3/week velocity cap + Originality.ai plagiarism check |
| Sovereign Brain underperforms Claude | MEDIUM | 5 | Keep Claude API as fallback, benchmark extensively |
| Resend key placeholder = no email notifications | MEDIUM | 2 | Set up real key before Sprint 7 |
| Q vulnerable to prompt injection / manipulation | HIGH | 2 | Abuse protection system (4-06): repeated irrelevant requests → email redirect |
| Emails sent without payment confirmation | HIGH | 2 | Founder payment confirmation gate (7-07): all emails require founder approval first |
| No visibility into Q's client interactions | MEDIUM | 2 | Q Activity Dashboard (7-08): founder sees all stats and conversations |
| Client revision requests untracked | MEDIUM | 3 | Revision Management System (S12.5): admin UI, 30-day retention, automated pipeline |

---

## 11. PRICING REFERENCE

| Service | US Market Rate | Our Position | Module | Sprint |
|---------|---------------|--------------|--------|--------|
| Express Build (landing page) | $3,500-$5,000 | $1,500 / $2,500 / $3,500 (TBD) | Module 3 | S10 |
| Website Redesign | $25,000-$200,000 | $15,000-$50,000 | Module 1 | S8 |
| Feature Injection | $30,000-$150,000 | $20,000-$75,000 | Module 2 | S9 |
| Web App / SaaS | Varies | $15,000+ | Module 4 | S11 |
| Custom AI — RAG (Tier 1) | $40,000-$200,000 | $25,000+ | Module 5 | S12 |
| Custom AI — Fine-Tuning (Tier 2) | $25,000-$75,000 | $50,000+ | Module 5 | S12 |
| Monthly Maintenance | $1,000-$15,000/mo | $500-$5,000/mo | All | Post-delivery |

**Iron Grip Rules (Applied to ALL)**:
- Max 5% nudge (after 30s hesitation)
- Hard floor: 10% maximum discount
- At floor rejection → terminate pricing → "Book Mujtaba" calendar
- All prices server-enforced via PricingEngine state machine

---

## HOW TO USE THIS DOCUMENT

1. **Founder reviews each phase** — approves, rejects, or modifies
2. **Founder resolves the 10 decisions** (D1-D10) listed in Section 8
3. **We discuss phase by phase** — no execution until a phase is approved
4. **Once a phase is approved**, execution begins sprint by sprint
5. **Each sprint is reviewed** before moving to the next

**NO CODE WILL BE WRITTEN UNTIL THE RELEVANT PHASE IS DISCUSSED AND APPROVED.**

---

## DOCUMENT REFERENCES

| Document | Location | Purpose |
|----------|----------|---------|
| Master Prompts V2 (all 10 prompts) | `memory/MASTER_PROMPTS_V2.md` | Full text of all founder directives |
| Agent Continuity | `memory/AGENT_CONTINUITY.md` | Env vars, git remotes, what's broken, resume instructions |
| CEO Memory | `memory/MEMORY.md` | Persistent memory across sessions |
| Strategic Plan V2 | `.claude/organization/STRATEGIC_PLAN_V2.md` | Original 6-phase plan (superseded by this doc) |
| Progress Tracker | `.claude/organization/PROGRESS_TRACKER.md` | Sprint task statuses |
| Market Research | `.claude/agent-memory/market-scout/` | Competitor analysis, pricing benchmarks, blue ocean gaps |

---

---

## FOUNDER REVIEW CHANGELOG

| Date | Change | Details |
|------|--------|---------|
| 2026-02-28 | Folder lock | All work stays within `Quartermasters 3` folder. Permission required to go outside. |
| 2026-02-28 | Q welcome behavior | In-your-face welcome on site entry, persistent on ALL pages. |
| 2026-02-28 | Q abuse protection | Added 4-06: hardened against manipulation, repeated abuse → email redirect. |
| 2026-02-28 | Email confirmation gate | Added 7-07: all emails require founder payment confirmation before sending. |
| 2026-02-28 | Q Activity Dashboard | Added 7-08: backend dashboard showing Q's performance stats for founder. |
| 2026-02-28 | D2 decided | ChatGPT API for Q confirmed — placed LAST (Phase 5). |
| 2026-02-28 | Sprint 8 latest designs | Added 8-08: Q delivers glassmorphism + modern UI patterns. |
| 2026-02-28 | No-legacy checkbox | Added 8-09: client confirms via checkbox that legacy code won't be touched. |
| 2026-02-28 | Disclaimer toggles | Added 8-10 + global rule: all disclaimers = checkbox/toggle before automation. |
| 2026-02-28 | Revision system | Added Sprint 12.5: free changes, 30-day retention, automated pipeline, admin UI. |
| 2026-02-28 | Sprint count | Updated from 14 to 15 sprints (added S12.5). |

---

*This document supersedes STRATEGIC_PLAN_V2.md as the active roadmap.*
*V3.0: 2026-02-26 | V3.1 (Founder Review): 2026-02-28*
