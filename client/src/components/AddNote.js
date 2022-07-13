import React,{ useContext,useState } from 'react'
import { NoteContext } from '../contexts/NoteContext';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const AddNote = () => {

    let navigate = useNavigate();

    const { addNote } = useContext(NoteContext);
    const [note,setNote] = useState({ title: "",description: "" });

    const onChange = (e) => {
        setNote({ ...note,[e.target.name]: e.target.value });
    }

    const submitForm = (e) => {
        e.preventDefault();
        addNote(note);
        swal({
            title: "Good job!",
            text: "Your new note has been added successfully",
            icon: "success",
            button: "OK",
        });
        setNote({ title: "",description: "" }); // empty all fields
        navigate('/');
        // showAlert('Note added...','success');
    }


    return (
        <>
            <form onSubmit={submitForm} className='mt-5 w-50 m-auto p-5 bg-light rounded'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} onChange={onChange} name='title' minLength={3} required />
                </div>
                <div className="form-floating">
                    <textarea className="form-control" value={note.description} onChange={onChange} placeholder="Describe your note here" name="description" style={{ height: "100px" }} minLength={5} required></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Note</button>
            </form>
        </>
    );
}

export default AddNote