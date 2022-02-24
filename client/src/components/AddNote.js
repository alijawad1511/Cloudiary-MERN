import React, { useContext, useState } from 'react'
import { NoteContext } from '../contexts/NoteContext';
import { useNavigate } from "react-router-dom";

const AddNote = () => {

    let navigate = useNavigate();

    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({ title: "", description: "", tag: "" }); // empty all fields
        navigate('/');
    }


    return (
        <>
            <form className='mt-5 w-50 m-auto p-5 bg-light rounded'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} onChange={onChange} name='title' minLength={3} required/>
                </div>
                <div className="form-floating">
                    <textarea className="form-control" value={note.description} onChange={onChange} placeholder="Describe your note here" name="description" style={{height: "100px"}} minLength={5} required></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} onChange={onChange} name='tag' minLength={3} required/>
                </div>
                <button type="submit" onClick={onSubmit} className="btn btn-primary mt-3">Add Note</button>
            </form>
        </>
    );
}

export default AddNote