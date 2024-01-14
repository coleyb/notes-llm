'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Notes({ notes }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel('notes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'notes',
    }, () => {
      router.refresh();
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, router]);

  return (
    <div>
      <Link href="/notes/form" className="block max-w-sm p-4 mb-4 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Add Note
     </Link>
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <a key={note.id} href="#" className="block max-w-sm p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{note.notes}</p>
          </a>
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
}
