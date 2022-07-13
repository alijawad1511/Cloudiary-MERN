import React from 'react'

const About = () => {
  return (
    <div className="card mt-3">
      <div className="card-header">
        <h4>About Cloudiary</h4>
      </div>
      <div className="card-body">
        <strong>Cloudiary</strong> is an Application which can be used to store your personal notes on the cloud. Now you don't need to keep a diary with you to mention you daily work. We live in a busy world. We can't remember our every important work in mind due to budy routine. But don't worry, CLoudiary will help you. You can add your notes for your important work and can read your notes anytime for remembering about your important work.
      </div>
      <div className="card-footer">
        <div><h5 className='fw-bold'>Credits</h5></div>
        <p className='mb-2'>Syed Ali Jawad</p>
        <div className="d-flex align-items-center">
          <i class="fa-brands fa-github me-2"></i>
          <i class="fa-brands fa-linkedin me-2"></i>
          <i class="fa-brands fa-twitter-square me-2"></i>
        </div>
      </div>
    </div>
  )
}

export default About