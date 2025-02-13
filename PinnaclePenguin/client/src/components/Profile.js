import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations';
import { AuthContext } from './AuthContext';


function Profile() {

  const [user_email, setUser_Email] = useState('')
  const { username } = useContext(AuthContext)
  
  const navigate = useNavigate();
  const navigateToLogin = () => {
      navigate('/') //navigates to the login page
  }
  useEffect(() =>{
      const fetchEmail = async () => {
        const emailResult = await clientDatabaseOperations.findEmail(username)
        setUser_Email(emailResult)
      }
      fetchEmail()
  },[])


  return(
    <div id='Profile-div-container'>
      <div id='Profile-div-container-top'>
        <h1 id='Profile-div-title'> User Profile</h1>
        <div id='Profile-div-content'>
          <p>Username: @{username}</p>
          <p>Email: {user_email}</p>
        </div>
        <button id='Profile-button-logout' onClick={navigateToLogin}>Log out</button>
      </div>
    </div>
  )
}

export default Profile