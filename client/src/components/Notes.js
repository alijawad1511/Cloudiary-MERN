import React,{ useState,useContext,useEffect,useRef } from 'react'
import { NoteContext } from '../contexts/NoteContext'
import { useNavigate } from 'react-router-dom'
import Note from './Note';
import swal from 'sweetalert';
import Loading from './Loading';

const Notes = () => {

    const { notes,getAllNotes,editNote } = useContext(NoteContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('x-auth-token')) {
            getAllNotes();
        } else {
            navigate('/login');
        }
    })

    const modal = useRef(null);
    const closeModal = useRef(null);
    const [note,setNote] = useState({ id: "",editTitle: "",editDesc: "" });

    const updateNote = (currentNote) => {
        modal.current.click();
        setNote({ id: currentNote._id,editTitle: currentNote.title,editDesc: currentNote.description });
    }

    const onChange = (e) => {
        setNote({ ...note,[e.target.name]: e.target.value });
    }

    const handleSave = async (e) => {
        e.preventDefault();
        editNote(note.id,note.editTitle,note.editDesc);
        await closeModal.current.click();
        swal("Good job!","Note updated successfully","success");
    }


    return (
        <>
            <div className='row mt-3'>
                <h4 className='text-center text-danger'>{notes.length === 0 && 'No Notes to display'}</h4>
                {notes.map((note) => {
                    return <Note key={note._id} updateNote={updateNote} note={note} />
                })
                }
            </div>

            {/* Modal */}
            <button type="button" ref={modal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={onChange} name='editTitle' value={note.editTitle} />
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control" onChange={onChange} value={note.editDesc} placeholder="Describe your note here" name="editDesc" style={{ height: "100px" }}></textarea>
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes