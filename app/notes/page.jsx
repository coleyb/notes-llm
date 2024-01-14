import Notes from '@components/Notes';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function () {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: notes } = await supabase.from("notes").select();

  return (
    <Notes notes={notes} />
  )
}
