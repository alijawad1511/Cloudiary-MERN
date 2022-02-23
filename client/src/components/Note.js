import React, { useContext } from 'react';
import { NoteContext } from '../contexts/NoteContext';

const Note = ({ note, updateNote }) => {

    const { deleteNote } = useContext(NoteContext);

    return (
        <>
            <div className='col-md-4'>
                <div className="card mb-3 bg-light">
                    <i className="fa-regular fa-trash-can" onClick={()=>{deleteNote(note._id)}} style={{color: 'red', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}}></i>
                    <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}} style={{color: 'blue', position: 'absolute', top: '10px', right: '30px', cursor: 'pointer'}}></i>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        {/* <a href="#" className="btn btn-primary">Edit</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Note