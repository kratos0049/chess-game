import logo from './logo.svg';
import Board from './Board';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AnalysisBoard from './AnalysisBoard';
import Homepage from './Homepage';
import Database from './Database';

function App() {
  return (
    <BrowserRouter> 
    <div className="App">
    <Routes>
        <Route exact path='/' element={< Homepage />}></Route>
        <Route exact path='/chessboard' element={< Board />}></Route>
        <Route exact path='/database' element={< Database />}></Route>
    </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
