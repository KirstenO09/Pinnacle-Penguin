/*
**dpop09**
Login component will display first when user enters the website
*/
import React, { useEffect, useContext} from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import userIcon from '../images/user-icon.png'
import '../styling/styling.css'
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations'
import { AuthContext } from './AuthContext'

function Login() {

  const { setIsLoggedIn } = useContext(AuthContext)
  const { setUsername } = useContext(AuthContext)

  useEffect(() => {
    setIsLoggedIn(false)  // **dpop09** if user goes back to the login page from any other page, login status will automatically be changed to false
    setUsername('')
  }, [])

  const navigate = useNavigate()
  const navigateToRegister = () => {
    navigate('/Register') //navigates to the register page
  }
  const navigateToHome = () => {
    navigate('/Home') //navigates to the home page
  }



  const isUserCredentialsValid = async (parmtr_username, parmtr_password) => {
    var input_user_credentials = { username: parmtr_username, password: parmtr_password }
    var database_query_result = await clientDatabaseOperations.find("UserProfiles", input_user_credentials)
    return database_query_result
  }



  const validateLoginForm = async (event) => {
    event.preventDefault()  // **dpop09** prevents the default form submission behavior
    var input_username = document.getElementById("Login-uname").value
    var input_password = document.getElementById("Login-password").value
    if (input_username === "" || input_password === "") { // **dpop09** check if any fields are missing
      alert("Submission failure: Fill all field inputs.")
      return
    } 
    var isLoginValid = await isUserCredentialsValid(input_username, input_password)
    if (!isLoginValid) {  // **dpop09** check if there is a user account with the input login
      alert("Invalid username or password.")
      return
    } 
    setIsLoggedIn(true) // **dpop09** update login status of user to true
    setUsername(input_username)
    navigateToHome()  // **danp09** ideally the home page
  }



  return (
    <div id='Login-div-container'>
      <div id='Login-div-container-top'>
        <img src={userIcon} alt='user icon'></img>
        <h1>SIGN IN</h1>
      </div>
      <form id='Login-form'>
        <label for="Login-uname">USERNAME</label><br></br>
        <input type='text' id='Login-uname' name='uname' placeholder='Username'></input><br></br>
        <label for='Login-password'>PASSWORD</label><br></br>
        <input type='password' id='Login-password' name='password' placeholder='Password'></input><br></br>
        <button type='submit' id='Login-signin-button' onClick={validateLoginForm}>SIGN IN</button><br></br>
        <div id='Login-div-container-bottom'>
          <p>Don't have an account?</p>
          <p id='Login-register-link' onClick={navigateToRegister}>Register</p>
        </div>
      </form>
    </div>
  )
}

export default Login