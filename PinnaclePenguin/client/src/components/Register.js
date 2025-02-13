/*
**dpop09**
Register component is navigated from Login component. This page is dedicated to users who do not have a PinnaclePenguin account.
*/
import React, { useEffect, useContext } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import registerIcon from "../images/register-icon.png"
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations'
import { AuthContext } from './AuthContext'

function Register() {

  const { setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    setIsLoggedIn(false)  // **dpop09** if user goes back to the registration page from any other page, login status will automatically be changed to false
  }, [])

  const navigate = useNavigate()
  const navigateToLogin = () => {
    navigate('/') //navigates back to the login page
  }
  const navigateToHome = () => {
    navigate('/Home') //navigate to the home page
  }



  const isEmailFormated = (parmtr_input_email) => {
    const EMAIL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]{1,20}){1,}$/ // **dpop09** email address be in format of (local-part@website.com) and domain length is at most 80 characters
    var domain = parmtr_input_email.split('@')[1]
    return (EMAIL_PATTERN.test(parmtr_input_email) && domain.length <= 80)
  }



  const isRegisterCredentialsUnique = async (parmtr_email, parmtr_username) => {
    var input_register_email = { email: parmtr_email }
    var is_email_unique = !(await clientDatabaseOperations.find("UserProfiles", input_register_email))
    var input_register_username = { username: parmtr_username }
    var is_username_unique = !(await clientDatabaseOperations.find("UserProfiles", input_register_username))
    if (!is_email_unique && is_username_unique){  // **dpop09** username already taken
      return 0
    }
    else if (is_email_unique && !is_username_unique){  // **dpop09** email already taken
      return 1
    }
    else if (!is_email_unique && !is_username_unique){ // **dpop09** both email and username already taken
      return 2
    }
    else {
      return 3
    }
  }



  const createNewUserAccount = async (parmtr_email, parmtr_username, parmtr_password) => {
    var new_user_account = { email: parmtr_email, username: parmtr_username, password: parmtr_password}
    var database_query_result = await clientDatabaseOperations.insert("UserProfiles", new_user_account)
    return database_query_result
  }



  const validateRegisterForm = async (event) => {
    event.preventDefault()  // **dpop09** prevents the default form submission behavior
    var input_email = document.getElementById("Register-email").value
    var input_username = document.getElementById("Register-uname").value
    var input_password = document.getElementById("Register-password").value
    if (input_email === "" || input_username === "" || input_password === "") { // **dpop09** check if any fields are missing
      alert("Submission failure: Fill all field inputs.")
      return
    } 
    var is_email_formated = isEmailFormated(input_email)
    if (!is_email_formated) { // **dpop09** check if the email is formatted correctly
      alert("Submission failure: Email is not formatted correctly.")
      return
    }
    var is_registration_credentials_unqiue = await isRegisterCredentialsUnique(input_email, input_username)
    if (is_registration_credentials_unqiue === 0) {   // **dpop09** check if the email and/or username is already taken
      alert("Registration failure: This email address is already taken.")
      return
    }
    if (is_registration_credentials_unqiue === 1) {
      alert("Registration failure: This username is already taken.")
      return
    }
    if (is_registration_credentials_unqiue === 2) {
      alert("Registration failure: Both email address and username is already taken.")
      return
    }
    var is_new_account_created = await createNewUserAccount(input_email, input_username, input_password)
    if (!is_new_account_created) {  // **dpop09** ensure the new registered account is added to the database
      alert("Registration failure: Server could not create a new account at this moment. Please try another time.")
      return
    }
    setIsLoggedIn(true) // **dpop09** update login status of user to true
    navigateToHome()
  }



  return (
    <div id='Register-div-container'>
      <div id="Register-div-container-left">
        <button id='Register-button-goback' onClick={navigateToLogin}></button>
      </div>
      <div id="Register-div-container-right">
        <div id='Register-div-container-top'>
          <img src={registerIcon} alt='register icon'></img>
          <h1>REGISTER</h1>
        </div>
        <form id='Register-form'>
          <label for="Register-email">EMAIL</label><br></br>
          <input type='text' id='Register-email' name='email' placeholder='Email'></input><br></br>
          <label for="Register-uname">USERNAME</label><br></br>
          <input type='text' id='Register-uname' name='uname' placeholder='Username'></input><br></br>
          <label for='Register-password'>PASSWORD</label><br></br>
          <input type='password' id='Register-password' name='password' placeholder='Password'></input><br></br>
          <button type='submit' id='Register-button' onClick={validateRegisterForm}>REGISTER</button><br></br>
        </form>
      </div>  
    </div>
  )
}

export default Register