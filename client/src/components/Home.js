import React from 'react';
import Notes from './Notes';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="card mt-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h4 className='m-0'>My Notes</h4>
          <Link className='btn' style={{ backgroundColor: '#126ab3',color: '#fff' }} to="/addnote"><i class="fa-solid fa-notes-medical me-2"></i>Add Note</Link>
        </div>
      </div>
      <Notes />
    </>
  )
}

export default Home