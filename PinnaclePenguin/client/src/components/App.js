/* 
**dpop09**
App component is the root component. This will contain all of the routes to the other pages of the website
*/

import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import { AuthProvider } from './AuthContext'
import NavBar from './NavBar'
import AboutUs from './AboutUs'
import Profile from './Profile'
import DiscussionPosts from './DiscussionPosts'
import Post from './Post'
import Forum from './Forum'
import Calendar from './Calendar'
import Recommend from './Recommend'

function App() {

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/DiscussionPosts" element={<DiscussionPosts />} />
          <Route path="/Post" element={<Post />} />
          <Route path='/Forum' element={<Forum />} />
          <Route path='/Calendar' element={<Calendar />} />
          <Route path='/Recommend' element={<Recommend />} />
      </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App