import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../contexts/NoteContext';
import Note from './Note';

const Notes = () => {

    const { notes, getAllNotes } = useContext(NoteContext);

    useEffect(() => {
        getAllNotes();       
    },[])

    return (
        <>
            <h1 className='text-center py-3'>My Notes</h1>
            <div className='row'>
                {notes.map((note) => {
                    return <Note key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes