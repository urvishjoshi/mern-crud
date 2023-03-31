import Layout from './Components/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guest from './Components/Guest';
import { createContext } from 'react';

export const GlobalContext = createContext()

const globals = {
  auth: (arg) => JSON.parse(localStorage.getItem(arg)),
  setAuth: (arg, data) => localStorage.setItem(arg, JSON.stringify(data)),
  flushAuth: (arg) => localStorage.removeItem(arg),
}

function App() { 
  return (
    <GlobalContext.Provider value={ { ...globals } }>
      <Router>
          <Routes>
            <Route exact path="/" element={<Guest/> }/>
            <Route exact path="/feed" element={ <Layout GlobalContext={GlobalContext}/> }/>
          </Routes>
      </Router>
    </GlobalContext.Provider>
  ); 
}

export default App;
