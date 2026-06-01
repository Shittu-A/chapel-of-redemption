-- ============================================================
-- Chapel of Redemption ABU Samaru Zaria - Supabase Database Schema
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: pages
-- Page content management (home hero, about text, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for pages
CREATE INDEX idx_pages_slug ON pages(slug);

-- ============================================================
-- TABLE: sections
-- Individual content sections within pages (JSONB content for Tiptap)
-- ============================================================
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    key VARCHAR(255) NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    "order" INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page_id, key)
);

-- Indexes for sections
CREATE INDEX idx_sections_page_id ON sections(page_id);
CREATE INDEX idx_sections_page_key ON sections(page_id, key);
CREATE INDEX idx_sections_order ON sections(page_id, "order");

-- ============================================================
-- TABLE: teams
-- Ministry teams (council, deacons, ushers, band, choir, technical, mis, brigade)
-- ============================================================
CREATE TYPE team_category AS ENUM (
    'council',
    'deacons',
    'ushers',
    'band',
    'choir',
    'technical',
    'mis',
    'brigade'
);

CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category team_category NOT NULL,
    description TEXT,
    photo_url TEXT,
    "order" INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for teams
CREATE INDEX idx_teams_slug ON teams(slug);
CREATE INDEX idx_teams_category ON teams(category);
CREATE INDEX idx_teams_order ON teams("order");

-- ============================================================
-- TABLE: team_members
-- Individual members of each ministry team
-- ============================================================
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    photo_url TEXT,
    bio TEXT,
    "order" INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for team_members
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_order ON team_members(team_id, "order");

-- ============================================================
-- TABLE: staff
-- Staff directory (current, past, chaplaincy)
-- ============================================================
CREATE TYPE staff_type AS ENUM (
    'current',
    'past',
    'chaplaincy'
);

CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    type staff_type NOT NULL,
    photo_url TEXT,
    bio TEXT,
    start_year INTEGER,
    end_year INTEGER,
    "order" INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for staff
CREATE INDEX idx_staff_type ON staff(type);
CREATE INDEX idx_staff_order ON staff("order");
CREATE INDEX idx_staff_type_order ON staff(type, "order");

-- ============================================================
-- TABLE: activities
-- Video activities with YouTube integration
-- ============================================================
CREATE TYPE activity_category AS ENUM (
    'worship',
    'outreach',
    'event',
    'programme',
    'other'
);

CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    youtube_url TEXT,
    youtube_id VARCHAR(255),
    thumbnail_url TEXT,
    category activity_category NOT NULL DEFAULT 'other',
    activity_date DATE,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for activities
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_date ON activities(activity_date);
CREATE INDEX idx_activities_published ON activities(is_published, created_at DESC);
CREATE INDEX idx_activities_published_date ON activities(is_published, activity_date DESC);

-- ============================================================
-- TABLE: newsletters
-- Newsletter issues with JSONB content for Tiptap
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    excerpt TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for newsletters
CREATE INDEX idx_newsletters_slug ON newsletters(slug);
CREATE INDEX idx_newsletters_published ON newsletters(is_published, published_at DESC);

-- ============================================================
-- TABLE: giving_records
-- Payment records from Paystack integration
-- ============================================================
CREATE TABLE IF NOT EXISTS giving_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    reference VARCHAR(255) UNIQUE NOT NULL,
    channel VARCHAR(100),
    purpose VARCHAR(255),
    paid_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for giving_records
CREATE INDEX idx_giving_records_email ON giving_records(email);
CREATE INDEX idx_giving_records_reference ON giving_records(reference);
CREATE INDEX idx_giving_records_paid_at ON giving_records(paid_at DESC);

-- ============================================================
-- TABLE: admins
-- Admin users linked to Supabase Auth
-- ============================================================
CREATE TYPE admin_role AS ENUM (
    'super',
    'admin'
);

CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role admin_role NOT NULL DEFAULT 'admin',
    full_name VARCHAR(255),
    created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Indexes for admins
CREATE INDEX idx_admins_user_id ON admins(user_id);
CREATE INDEX idx_admins_role ON admins(role);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE giving_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICY: pages
-- Public: SELECT all
-- Admins: Full CRUD access
-- ============================================================

CREATE POLICY "Pages are viewable by everyone"
    ON pages FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert pages"
    ON pages FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can update pages"
    ON pages FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can delete pages"
    ON pages FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: sections
-- ============================================================

CREATE POLICY "Sections are viewable by everyone"
    ON sections FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert sections"
    ON sections FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can update sections"
    ON sections FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can delete sections"
    ON sections FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: teams
-- ============================================================

CREATE POLICY "Teams are viewable by everyone"
    ON teams FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert teams"
    ON teams FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can update teams"
    ON teams FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can delete teams"
    ON teams FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: team_members
-- ============================================================

CREATE POLICY "Team members are viewable by everyone"
    ON team_members FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert team members"
    ON team_members FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can update team members"
    ON team_members FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can delete team members"
    ON team_members FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: staff
-- ============================================================

CREATE POLICY "Staff are viewable by everyone"
    ON staff FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert staff"
    ON staff FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can update staff"
    ON staff FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can delete staff"
    ON staff FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: activities
-- Public: SELECT only published activities
-- ============================================================

CREATE POLICY "Published activities are viewable by everyone"
    ON activities FOR SELECT
    USING (is_published = true);

CREATE POLICY "Only admins can insert activities"
    ON activities FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can update activities"
    ON activities FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can delete activities"
    ON activities FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: newsletters
-- Public: SELECT only published newsletters
-- ============================================================

CREATE POLICY "Published newsletters are viewable by everyone"
    ON newsletters FOR SELECT
    USING (is_published = true);

CREATE POLICY "Only admins can insert newsletters"
    ON newsletters FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can update newsletters"
    ON newsletters FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can delete newsletters"
    ON newsletters FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: giving_records
-- Public: No access
-- Admins: Full SELECT access
-- ============================================================

CREATE POLICY "Only admins can view giving records"
    ON giving_records FOR SELECT
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );

-- ============================================================
-- RLS POLICY: admins
-- Only super admins can manage other admins
-- ============================================================

CREATE POLICY "Only super admins can view admins"
    ON admins FOR SELECT
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid() 
            AND admins.role = 'super'
        )
    );

CREATE POLICY "Only super admins can insert admins"
    ON admins FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid() 
            AND admins.role = 'super'
        )
    );

CREATE POLICY "Only super admins can update admins"
    ON admins FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid() 
            AND admins.role = 'super'
        )
    );

CREATE POLICY "Only super admins can delete admins"
    ON admins FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid() 
            AND admins.role = 'super'
        )
    );

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletters_updated_at BEFORE UPDATE ON newsletters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- INITIAL DATA
-- ============================================================

INSERT INTO pages (slug, title) VALUES
    ('home', 'Home'),
    ('about', 'About'),
    ('missions', 'Missions'),
    ('activities', 'Activities'),
    ('chad-missions', 'Chad Missions'),
    ('schools', 'Schools'),
    ('staff', 'Staff'),
    ('newsletter', 'Newsletter'),
    ('giving', 'Giving')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO teams (slug, name, category, description, "order") VALUES
    ('council', 'Church Council', 'council', 'The leadership council of Chapel of Redemption', 1),
    ('deacons', 'Team of Deacons', 'deacons', 'Dedicated deacons serving the chapel community', 2),
    ('ushers', 'Team of Ushers', 'ushers', 'Welcome team and service coordinators', 3),
    ('band', 'Chapel Band', 'band', 'Musicians leading worship and praise', 4),
    ('choir', 'Choir', 'choir', 'Voices of worship and celebration', 5),
    ('technical', 'Technical Team', 'technical', 'Sound, lighting, and multimedia support', 6),
    ('mis', 'MIS Team', 'mis', 'Media and Information Systems team', 7),
    ('brigade', 'Boys & Girls Brigade', 'brigade', 'Youth organization and character building', 8)
ON CONFLICT (slug) DO NOTHING;
