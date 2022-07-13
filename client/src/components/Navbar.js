import React,{ useEffect } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';


const Navbar = () => {

    let location = useLocation();
    const navigate = useNavigate();

    // useEffect() return location object whenever location/URL of a Page is changed
    useEffect(() => {

    },[location])

    const handleLogout = () => {
        localStorage.removeItem('x-auth-token');
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} style={{ height: "40px" }} alt="Logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/addnote' ? 'active' : ''}`} to="/addnote">Add Note</Link>
                            </li>
                        </ul>
                        {
                            localStorage.getItem('x-auth-token') ? <button onClick={handleLogout} className='btn btn-danger '><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</button> : <div>
                                <Link className='btn btn-secondary me-3' to='/login'>Login</Link>
                                <Link className='btn btn-primary' to='/signup'>Sign Up</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar