import React, { useContext, useState } from 'react'
import { NoteContext } from '../contexts/NoteContext';

const AddNote = () => {

    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({ title: "", description: "", tag: "" })
    }


    return (
        <>
            <form className='mt-5 w-50 m-auto p-5 bg-light rounded'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} name='title'/>
                </div>
                <div className="form-floating">
                    <textarea className="form-control" onChange={onChange} placeholder="Describe your note here" name="description" style={{height: "100px"}}></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} name='tag'/>
                </div>
                <button type="submit" onClick={onSubmit} className="btn btn-primary mt-3">Add Note</button>
            </form>
        </>
    );
}

export default AddNote