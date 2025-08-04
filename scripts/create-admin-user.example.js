const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  // IMPORTANT: Change these values before running the script
  const email = 'your-email@example.com'; // Change to your admin email
  const password = 'your-secure-password'; // Change to a secure password
  
  console.log('Creating admin user...');
  
  try {
    // Create user using the service role key
    const { data: user, error: signUpError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true // Auto-confirm the email
    });

    if (signUpError) {
      console.error('Error creating user:', signUpError);
      return;
    }

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('User ID:', user.user?.id);
    console.log('\nYou can now log in to the admin panel at /admin');
    console.log('Remember to change the password after first login!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Uncomment the line below to run the script
// createAdminUser();
