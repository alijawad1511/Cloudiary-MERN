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


function App() {
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
            </Routes>
          </div>
        </Router>
      </NoteProvider>
    </>
  );
}

export default App;
