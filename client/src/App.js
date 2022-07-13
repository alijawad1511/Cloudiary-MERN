import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import AddNote from './components/AddNote';
import { NoteProvider } from './contexts/NoteContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import logo from './images/logo.png';


function App() {

  const [alert,setAlert] = useState(null);

  const showAlert = (message,type) => {

    setAlert({ message,type });

    // disapear alert after 1.5s
    setTimeout(() => {
      setAlert(null);
    },3000);

  }

  return (
    <>
      <NoteProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/addnote" element={<AddNote />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteProvider>
    </>
  );
}

export default App;
