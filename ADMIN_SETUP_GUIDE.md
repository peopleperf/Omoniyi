# Admin Setup Guide - Single Admin Access Only

## Step 1: Create Your Admin User in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Invite User"** (not "Add User")
4. Enter YOUR email address and a secure password
5. Click "Send Invitation"
6. Check your email and confirm the account

## Step 2: Disable Public Signups

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Click on **Email** provider
3. **DISABLE** "Enable Email Signup" 
4. This ensures NO ONE else can register

## Step 3: Run Database Setup

1. Go to **SQL Editor** in Supabase
2. First, run the contents of `supabase-schema.sql`
3. Then, run the contents of `create-knowledge-base-table.sql`
4. Finally, run this modified version of `setup-admin.sql`:

```sql
-- Replace 'your-email@example.com' with YOUR actual email
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'
)
WHERE email = 'your-email@example.com';
```

## Step 4: Update Your Login Credentials

The demo credentials "admin@example.com / password" won't work. 
Use YOUR email and password that you created in Step 1.

## Step 5: Test Your Access

1. Go to http://localhost:3000/admin
2. Login with YOUR credentials
3. You should now have full admin access

## Security Summary

✅ Only YOU can access the admin panel
✅ No one else can register or sign up
✅ The AI chat is publicly accessible (as intended)
✅ Only YOU can manage content through the admin panel

## Important Notes

- The AI chat will work for all visitors (no login required)
- Only the /admin route requires authentication
- Keep your credentials secure - there's no password reset without Supabase access
