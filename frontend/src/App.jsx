import './App.css'
import LandingPage from '../src/pages/landing.jsx'
import { BrowserRouter, Route ,Routes} from 'react-router-dom'

import Navbar from '../src/components/Navbar.jsx'
import WhatIsBudgetBloom from './pages/whatIsBudgetBloom.jsx';
import AuthenticatedRoute from './components/authenticated.jsx';
import Login from './pages/login.jsx';
function App() {




  return (
  

      <BrowserRouter>


    <Navbar />
      <Routes>
        <Route path ="/" element={ <LandingPage />} />
        <Route path="/dashboard"  />

        
        <Route path="/whatIsBudgetBloom" element = {<WhatIsBudgetBloom />} />
        <Route path="/about" />
        <Route path="/contact" />
        <Route path="/login" element ={<Login />} />
        
 <Route path="/register" />
        <Route path="/login" />


      </Routes>
       
      </BrowserRouter>
    
  );
}

  

  

export default App
