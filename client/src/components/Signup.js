import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Signup = () => {

  let navigate = useNavigate();
  const [user,setUser] = useState({ name: "",email: "",password: "" });


  const submitForm = async (e) => {
    e.preventDefault();

    const { name,email,password } = user;

    // Fetch API
    const response = await fetch(`http://localhost:5000/api/users/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name,email,password })
    });

    const json = await response.json();
    if (json.success) {
      await swal({
        title: "Good job!",
        text: "You have been registered successfully",
        icon: "success",
        button: "Login Now!",
      });
      navigate('/login');
    } else {
      swal("OOPS!",`${json.error}`,"error");
    }

  }

  const onChange = (e) => {
    setUser({ ...user,[e.target.name]: e.target.value });
  }

  return (
    <>
      <form onSubmit={submitForm} className='mt-5 w-50 m-auto p-5 bg-light rounded'>
        <h2 className='text-center text-primary mb-5'>Registration</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} name="password" />
        </div>
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </>
  )
}

export default Signup