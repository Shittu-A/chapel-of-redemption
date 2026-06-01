/**
 * Database types for Chapel of Redemption
 * Generated from schema.sql
 */

// Enums
export type TeamCategory = 
  | 'council'
  | 'deacons'
  | 'ushers'
  | 'band'
  | 'choir'
  | 'technical'
  | 'mis'
  | 'brigade';

export type StaffType = 
  | 'current'
  | 'past'
  | 'chaplaincy';

export type ActivityCategory = 
  | 'worship'
  | 'outreach'
  | 'event'
  | 'programme'
  | 'other';

export type AdminRole = 
  | 'super'
  | 'admin';

// Tables
export interface Page {
  id: string;
  slug: string;
  title: string;
  updated_at: string;
  created_at: string;
}

export interface Section {
  id: string;
  page_id: string;
  key: string;
  content: Record<string, unknown>;
  order: number;
  updated_at: string;
  created_at: string;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  category: TeamCategory;
  description: string | null;
  photo_url: string | null;
  order: number;
  updated_at: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  name: string;
  role: string;
  photo_url: string | null;
  bio: string | null;
  order: number;
  updated_at: string;
  created_at: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  type: StaffType;
  photo_url: string | null;
  bio: string | null;
  start_year: number | null;
  end_year: number | null;
  order: number;
  updated_at: string;
  created_at: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string | null;
  youtube_url: string | null;
  youtube_id: string | null;
  thumbnail_url: string | null;
  category: ActivityCategory;
  activity_date: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Newsletter {
  id: string;
  slug: string;
  title: string;
  content: Record<string, unknown>;
  excerpt: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GivingRecord {
  id: string;
  name: string;
  email: string;
  amount: number;
  reference: string;
  channel: string | null;
  purpose: string | null;
  paid_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Admin {
  id: string;
  user_id: string;
  role: AdminRole;
  full_name: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Database type for Supabase client
export interface Database {
  public: {
    Tables: {
      pages: {
        Row: Page;
        Insert: Omit<Page, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Page, 'id' | 'created_at' | 'updated_at'>>;
      };
      sections: {
        Row: Section;
        Insert: Omit<Section, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Section, 'id' | 'created_at' | 'updated_at'>>;
      };
      teams: {
        Row: Team;
        Insert: Omit<Team, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Team, 'id' | 'created_at' | 'updated_at'>>;
      };
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>>;
      };
      staff: {
        Row: Staff;
        Insert: Omit<Staff, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Staff, 'id' | 'created_at' | 'updated_at'>>;
      };
      activities: {
        Row: Activity;
        Insert: Omit<Activity, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Activity, 'id' | 'created_at' | 'updated_at'>>;
      };
      newsletters: {
        Row: Newsletter;
        Insert: Omit<Newsletter, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Newsletter, 'id' | 'created_at' | 'updated_at'>>;
      };
      giving_records: {
        Row: GivingRecord;
        Insert: Omit<GivingRecord, 'id' | 'created_at'>;
        Update: Partial<Omit<GivingRecord, 'id' | 'created_at'>>;
      };
      admins: {
        Row: Admin;
        Insert: Omit<Admin, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Admin, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
