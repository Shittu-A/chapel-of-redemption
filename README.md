# Chapel of Redemption Website

A modern, responsive website for Chapel of Redemption, Ahmadu Bello University, Samaru, Zaria.

## Features

### Public Pages
- **Home**: Hero section, service times, featured video, quick links
- **About**: Church history, mission & vision, core values
- **Missions**: Overview and individual team pages (Council, Deacons, Ushers, Band, Choir, Technical, MIS, Brigade)
- **Chad Missions**: Mission work in Chad
- **Schools**: Sunday School and Bible Study Institute
- **Activities**: YouTube video gallery with categories (Worship, Outreach, Events, Programmes)
- **Staff**: Current staff, chaplaincy, and past members
- **Newsletter**: Archive and single issue pages
- **Giving**: Secure online giving with Paystack integration + bank transfer details

### Admin Dashboard
- **Authentication**: Secure login with Supabase Auth
- **Content Management**: Tiptap rich text editor for page content
- **Teams CRUD**: Manage teams and team members
- **Activities CRUD**: Add/edit YouTube videos with categories
- **Newsletter CRUD**: Create and publish newsletter issues
- **User Management**: Super admin can manage admin users
- **Settings**: Configure church info and payment settings

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage)
- **Payment**: Paystack
- **Editor**: Tiptap

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Paystack account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chapel-of-redemption
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

4. Set up Supabase:
- Run the SQL schema from `supabase/schema.sql`
- Configure storage buckets for images
- Set up Row Level Security (RLS) policies

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Admin Access

1. Create a user in Supabase Auth
2. Add the user to the `admins` table with role `admin` or `super_admin`
3. Access the admin panel at `/admin/login`

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Environment Variables for Production

Make sure to set all required environment variables in your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── robots.ts
│   └── sitemap.ts
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── admin/            # Admin-specific components
│   └── *.tsx             # Page components
├── lib/                   # Utilities
│   ├── utils.ts
│   ├── supabase/         # Supabase clients
│   ├── paystack.ts       # Paystack utilities
│   └── youtube.ts        # YouTube utilities
├── public/               # Static assets
├── supabase/             # Supabase schema
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT License - see LICENSE file for details.

## Contact

For questions or support, please contact the Chapel of Redemption administration.
