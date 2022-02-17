import React, { createContext, useState } from 'react';

export const NoteContext = createContext();

// Holding Information of Notes
export const NoteProvider = (props) => {

    const HOST = 'http://localhost:5000';

    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);


    // Fetch All Notes from MongoDB
    const getAllNotes = async () => {

        // API Call
        const response = await fetch(`${HOST}/api/notes/usernotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTcwNmUwZjU2OThmYWY1OGRmYWFmIn0sImlhdCI6MTY0NDg1NjMwOH0.4Zi5cW_6IlVPlFlNjmHFqu95W8vylZseoDonTZ8db5c'
            }
        });

        const json = await response.json();
        setNotes(json)
    }

    // Add Note Function
    const addNote = async ({title,description,tag}) => {

        // API Call
        const response = await fetch(`${HOST}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTcwNmUwZjU2OThmYWY1OGRmYWFmIn0sImlhdCI6MTY0NDg1NjMwOH0.4Zi5cW_6IlVPlFlNjmHFqu95W8vylZseoDonTZ8db5c'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();

        setNotes(notes.concat(json));
        // alert('Note Added');
    }

    // Edit Note Function
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTcwNmUwZjU2OThmYWY1OGRmYWFmIn0sImlhdCI6MTY0NDg1NjMwOH0.4Zi5cW_6IlVPlFlNjmHFqu95W8vylZseoDonTZ8db5c'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();

    }

    // Delete a Note
    const deleteNote = async (id) => {
        
        // Delete Note API Call
        const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTcwNmUwZjU2OThmYWY1OGRmYWFmIn0sImlhdCI6MTY0NDg1NjMwOH0.4Zi5cW_6IlVPlFlNjmHFqu95W8vylZseoDonTZ8db5c'
            }
        });

        const json = await response.json();
 
        // Re-Render Frontend
        const newNotes = notes.filter((json) => { return json._id !== id });
        setNotes(newNotes);
    }


    return (
        // Wrap All the Components to which you have to pass Information/Props
        <NoteContext.Provider value={{ notes, setNotes, getAllNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}