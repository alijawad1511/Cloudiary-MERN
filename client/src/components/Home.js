import React from 'react';
import Notes from './Notes'

const Home = () => {
  return (
    <>
      <div className="card mt-3">
        <div className="card-body">
          <h4 className='m-0'>My Notes</h4>
        </div>
      </div>
      <Notes />
    </>
  )
}

export default Home