
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Header from './componenets/Header/Header';
import BookingForm from './pages/BookingForm/BookingForm';
import Checkout from './pages/Checkout/Checkout';

function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/detail" element={<Detail/>}/>
    <Route path="/bookingform" element={<BookingForm/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
  </Routes>
  </BrowserRouter>);
}

export default App;
