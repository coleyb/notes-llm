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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link href="/notes/form" className=" m-4 col-span-1 md:col-span-2 lg:col-span-3 p-4 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Add Note
      </Link>
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="m-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="p-4 text-2xl font-bold text-gray-900 dark:text-white">{note.title}</h5>
            <p className="p-4 font-normal text-gray-700 dark:text-gray-400">{note.content}</p>
            <p className="p-4 text-sm text-gray-500 dark:text-gray-300">Created: {new Date(note.created_at).toLocaleDateString()}</p>
            <p className={`p-4 text-sm ${note.completed ? 'text-green-600' : 'text-red-600'} dark:text-gray-300`}>{note.completed ? 'Completed' : 'Not Completed'}</p>
            <p className="p-4 text-sm text-gray-500 dark:text-gray-300">Priority: {note.priority}</p>
            <p className="p-4 text-sm text-gray-500 dark:text-gray-300">User ID: {note.user_id}</p>
          </div>
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
}
