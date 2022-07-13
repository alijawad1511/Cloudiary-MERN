import React,{ useContext } from 'react';
import { NoteContext } from '../contexts/NoteContext';
import swal from 'sweetalert';



const Note = ({ note,updateNote,showAlert }) => {

    const { deleteNote } = useContext(NoteContext);

    const handleDeletion = (id) => {
        swal({
            title: "Are you sure?",
            text: "Do you really want to delete your note?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteNote(id);
                    swal("Your note has been deleted!",{
                        icon: "success",
                    });
                }
            });
    }

    return (
        <>
            <div className='col-md-4'>
                <div className="card mb-3 bg-light note">
                    <i className="fa-regular fa-trash-can" onClick={() => handleDeletion(note._id)} style={{ color: 'red',position: 'absolute',top: '10px',right: '10px',cursor: 'pointer' }}></i>
                    <i className="fa-regular fa-pen-to-square" onClick={() => { updateNote(note) }} style={{ color: 'blue',position: 'absolute',top: '10px',right: '30px',cursor: 'pointer' }}></i>
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