import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

const Login = () => {

    const [credentials,setCredentials] = useState({ email: "",password: "" });
    let navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({ ...credentials,[e.target.name]: e.target.value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email,password: credentials.password })
        });

        const json = await response.json();
        // console.log(json);
        if (json.success) {
            // Save auth-token in LocalStorage and redirect
            localStorage.setItem('x-auth-token',json.token);
            navigate('/');
            swal("Welcome Back!","","success");

        } else {
            swal("Error!",`${json.error}`,"error");
        }
    }

    return (
        <>
            <form onSubmit={submitForm} className='mt-5 w-50 m-auto p-5 bg-light rounded'>
                <h2 className='text-center text-primary mb-5'>User Login</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
        </>
    )
}

export default Login