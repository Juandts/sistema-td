import { supabase } from '../../lib/supabaseClient';

export async function GET() {
  try {
    await supabase.auth.signOut();

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return new Response('Error during logout', { status: 500 });
  }
}
