-- Founder payment confirmation gate
-- Emails (quotes, invoices, confirmations) require founder approval before sending.

create table if not exists pending_approvals (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id),
  type text not null check (type in ('quote', 'invoice', 'confirmation', 'lead_alert')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  recipient_email text,
  subject text,
  html_body text,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  resolved_at timestamptz,
  resolved_by text -- 'founder' or 'system'
);

-- Index for quick lookup of pending items
create index if not exists idx_pending_approvals_status on pending_approvals(status);
create index if not exists idx_pending_approvals_type on pending_approvals(type);

-- RLS
alter table pending_approvals enable row level security;

create policy "Service role full access on pending_approvals"
  on pending_approvals for all
  using (true)
  with check (true);
