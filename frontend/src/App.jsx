import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events.jsx'
import Navbar from './components/Navbar'
import CreateEvent from './components/CreateEvent'
import Register from './pages/Register'
import Login from './pages/Login'
import Protected from './components/Protected'
import Dashboard from './components/Dashboard'
import EventDetails from './pages/EventDetails'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={
            <Protected>
              <Dashboard />
            </Protected>
          }
          />
          <Route path="/events" element={<Events />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event-details" element={<EventDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
