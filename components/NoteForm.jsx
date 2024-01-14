import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const NoteForm = () => {
  const router = useRouter();
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const supabase = createClientComponentClient();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newNote = {
        title: newNoteTitle,
        content: newNoteContent,
        created_at: new Date(),
      };

      // Add the new note to the "notes" table in Supabase
      const { data: createdNote, error } = await supabase
        .from('notes')
        .upsert([newNote]);

      if (error) {
        console.error('Error adding a new note:', error);
      } else {
        // Note added successfully
        router.push('/notes')
        console.log('New note added:', createdNote);
        
      }

      // Clear the form fields
      setNewNoteTitle('');
      setNewNoteContent('');
    } catch (error) {
      console.error('Error adding a new note:', error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 mb-4 bg-white border rounded shadow">
      {/* Title input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {/* Content textarea */}
      <div className="mb-4">
        <textarea
          placeholder="Note"
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          className="w-full h-40 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-300"
        >
          Add Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
