import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import BusRoute from './pages/BusRoute'
import Cart from './pages/Cart'
import Login from './pages/Login'
import About from './pages/About'
import BookTicket from './pages/BookTicket'
import Bookings from './pages/Bookings'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'
// import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
     {/* <ToastContainer /> */}
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path ='/' element={<Home />}/>
        <Route path ='/collection' element={<Collection />}/>
        <Route path ='/about' element={<About />}/>
        <Route path ='/contact' element={<Contact />}/>
        <Route path ='/busroute/:routeId' element={<BusRoute />}/>
        <Route path ='/cart' element={<Cart />}/>
        <Route path ='/login' element={<Login />}/>
        <Route path ='/book-ticket' element={<BookTicket />}/>
        <Route path ='/bookings' element={<Bookings />}/>
        <Route path ='/profile' element={<Profile />}/>


        <Route path="/booking/success" element={<Bookings />} />


        <Route path ='/verify' element={<Verify />}/>
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App