
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './Pages/Header/Header';
import Home from './Pages/Home/Home';
import SinagleProduct from './Pages/SinagleProduct/SinagleProduct';
import Cart from './Pages/Cart/Cart';
function App() {
  return (
  <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:id' element={<SinagleProduct/>}/>
      <Route path='/cart' element={<Cart/>}/>

    </Routes>
  </Router>
  );
}

export default App;
