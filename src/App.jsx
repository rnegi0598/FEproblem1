import {Route,Routes} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home'
import Result from './pages/Result';

function App() {
 

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
    </Routes>
    <Footer/>
      
    </>
  )
}

export default App
