import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const NoteForm = () => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const supabase = createClientComponentClient(); // Create your Supabase client instance

  const onSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      const newNote = {
        title: newNoteTitle,
        content: newNoteContent,
      };

      // Add the new note to the "notes" table in Supabase
      const { data: createdNote, error } = await supabase
        .from('notes')
        .upsert([newNote]);

      if (error) {
        console.error('Error adding a new note:', error);
      } else {
        // Note added successfully
        console.log('New note added:', createdNote);
        // Trigger a callback to handle the new note, if needed
        handleSubmit(createdNote);
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
