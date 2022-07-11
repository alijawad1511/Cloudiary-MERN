import React,{ createContext,useState } from 'react';

export const NoteContext = createContext();

// Holding Information of Notes
export const NoteProvider = (props) => {

    const HOST = 'http://localhost:5000';

    const initialNotes = [];
    const [notes,setNotes] = useState(initialNotes);

    // Fetch All Notes from MongoDB
    const getAllNotes = async () => {

        // API Call
        const response = await fetch(`${HOST}/api/notes/usernotes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        });

        const json = await response.json();
        setNotes(json)
    }

    // Add Note Function
    const addNote = async ({ title,description }) => {

        // API Call
        const response = await fetch(`${HOST}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            },
            body: JSON.stringify({ title,description })
        });

        const note = await response.json();

        setNotes(notes.concat(note));
        // alert('Note Added');
    }

    // Edit Note Function
    const editNote = async (id,title,description) => {

        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            },
            body: JSON.stringify({ title,description })
        });

        await response.json();

        // Edit in Client View (Frontend)
        let updatedNotes = JSON.parse(JSON.stringify(notes))//Copying 'notes' into 'newNotes'

        for (let i = 0; i < updatedNotes.length; i++) {
            const element = updatedNotes[i];

            if (element._id === id) {
                updatedNotes[i].title = title;
                updatedNotes[i].description = description;
                break;
            }
        }

        setNotes(updatedNotes);

    }

    // Delete a Note
    const deleteNote = async (id) => {

        // Delete Note API Call
        const response = await fetch(`${HOST}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        });

        const json = await response.json();

        // Re-Render Frontend
        const newNotes = notes.filter((json) => { return json._id !== id });
        setNotes(newNotes);
    }


    return (
        // Wrap All the Components to which you have to pass Information/Props
        <NoteContext.Provider value={{ notes,setNotes,getAllNotes,addNote,editNote,deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}