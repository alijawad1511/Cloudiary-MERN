import React, { useState,useContext, useEffect, useRef } from 'react';
import { NoteContext } from '../contexts/NoteContext';
import Note from './Note';

const Notes = () => {

    const { notes, getAllNotes, editNote } = useContext(NoteContext);

    useEffect(() => {
        getAllNotes();
    }, [])

    const modal = useRef(null);
    const closeModal = useRef(null);
    const [note, setNote] = useState({ id: "", editTitle: "", editDesc: "", editTag: "" });

    const updateNote = (currentNote) => {
        modal.current.click();
        setNote({id: currentNote._id,editTitle: currentNote.title, editDesc: currentNote.description, editTag: currentNote.tag});
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSave = () => {
        editNote(note.id, note.editTitle, note.editDesc, note.editTag);
        closeModal.current.click();

    }


    return (
        <>
            <h1 className='text-center py-3'>My Notes</h1>
            <div className='row'>
                {notes.map((note) => {
                    return <Note key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>

            {/* Modal */}
            <button type="button" ref={modal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={onChange} name='editTitle' value={note.editTitle} />
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control" onChange={onChange} value={note.editDesc} placeholder="Describe your note here" name="editDesc" style={{ height: "100px" }}></textarea>
                                    <label htmlFor="description">Description</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" onChange={onChange} value={note.editTag} name='editTag' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSave} className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes