# Deployment Guide

## Prerequisites

1. A Vercel account (or other hosting platform)
2. A Supabase project
3. A Paystack account (for payments)
4. Domain name (optional but recommended)

## Step 1: Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Run the schema from `supabase/schema.sql`
4. Enable Storage and create a bucket called `uploads`
5. Set up storage policies (see schema file for examples)

### Initial Admin Setup

1. Go to Authentication → Users in Supabase
2. Create a new user with email and password
3. Go to the Table Editor → `admins` table
4. Insert a new row with:
   - `user_id`: The UUID of the user you just created
   - `email`: The user's email
   - `role`: `super_admin`

## Step 2: Set Up Paystack

1. Create a Paystack account at [paystack.com](https://paystack.com)
2. Get your API keys from the Dashboard
3. For test mode, use the test keys
4. For production, activate your account and use live keys

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Configure the project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables (see below)
5. Deploy!

### Option B: Deploy via CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

## Environment Variables

Add these to your Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 4: Configure Domain (Optional)

1. Buy a domain from a registrar (e.g., Namecheap, GoDaddy)
2. In Vercel, go to Project Settings → Domains
3. Add your custom domain
4. Configure DNS records as instructed by Vercel

## Step 5: Post-Deployment Checklist

- [ ] Test the homepage loads correctly
- [ ] Test all navigation links
- [ ] Test admin login
- [ ] Test Paystack payment flow (use test mode)
- [ ] Test YouTube video embeds
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test newsletter subscription
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt is correct

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Check that all dependencies are installed: `npm install`
2. Verify TypeScript types: `npx tsc --noEmit`
3. Check for environment variables missing

### Supabase Connection Issues

1. Verify Supabase URL and keys are correct
2. Check that RLS policies are properly configured
3. Ensure the database tables exist

### Paystack Issues

1. Use test keys for development
2. Verify the callback URLs are correct
3. Check that amounts are in kobo (multiply Naira by 100)

## Maintenance

### Regular Tasks

- Monitor Supabase usage and upgrade if needed
- Check Paystack transaction logs
- Update dependencies regularly: `npm update`
- Review and moderate user-generated content

### Backup

Supabase automatically backs up your database. For additional safety:
1. Export data periodically from Supabase Dashboard
2. Store backups in a secure location

## Support

For technical support:
- Next.js docs: https://nextjs.org/docs
- Supabase docs: https://supabase.com/docs
- Paystack docs: https://paystack.com/docs
