-- Sprint 12.5: Revision Management System
-- Free changes within 30 days of delivery. Auto-archive after 30 days.

CREATE TABLE IF NOT EXISTS change_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    client_email TEXT NOT NULL,
    client_name TEXT,

    -- Request details
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'urgent')),

    -- Status workflow: submitted → in_progress → completed | rejected
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_progress', 'completed', 'rejected')),

    -- Tracking
    assigned_to TEXT,
    resolution_notes TEXT,

    -- 30-day retention
    delivered_at TIMESTAMPTZ,  -- When the original project was delivered
    expires_at TIMESTAMPTZ,    -- 30 days after delivery (auto-archive cutoff)
    is_archived BOOLEAN DEFAULT false,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- Index for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_change_requests_status ON change_requests(status);
CREATE INDEX IF NOT EXISTS idx_change_requests_client ON change_requests(client_email);
CREATE INDEX IF NOT EXISTS idx_change_requests_project ON change_requests(project_id);
CREATE INDEX IF NOT EXISTS idx_change_requests_expires ON change_requests(expires_at) WHERE is_archived = false;

-- Projects table (lightweight — tracks delivered projects for revision eligibility)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_email TEXT NOT NULL,
    client_name TEXT,
    service TEXT NOT NULL,
    title TEXT NOT NULL,
    delivered_at TIMESTAMPTZ,
    revision_window_ends TIMESTAMPTZ, -- 30 days after delivered_at
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'delivered', 'archived')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_email);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
