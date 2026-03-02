-- Sprint 7: Update leads table for discovery flow data + add updated_at to conversations

-- Add missing columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS visitor_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS business_type TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS scope TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_module TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS persona TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS stage_reached TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS is_high_value BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Add unique constraint on conversation_id for upsert support
ALTER TABLE leads ADD CONSTRAINT leads_conversation_id_unique UNIQUE (conversation_id);

-- Add updated_at to conversations for active session tracking
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Create index for active session queries
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at);
CREATE INDEX IF NOT EXISTS idx_leads_is_high_value ON leads(is_high_value);
CREATE INDEX IF NOT EXISTS idx_leads_service_module ON leads(service_module);
