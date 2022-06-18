import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from './Projects';
import Features from './Features';
import Todolist from './Todolist';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects/>}/>
          <Route path="/feature/:id" element={<Features/>} />
          <Route path="/todolist/:featureIds/:projectIds" element={<Todolist/>} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
