import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations'
import { AuthContext } from './AuthContext'

function Post() {

  const { username } = useContext(AuthContext)
  const navigate = useNavigate()

  const navigateToDiscussionPosts = () => {
    navigate('/DiscussionPosts')
  }

  const createPost = async (input_title, input_content) => {
    const bool_result = await clientDatabaseOperations.insertPost(username, input_title, input_content)
    return bool_result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const input_title = document.getElementById("Post-input-title").value
    const input_content = document.getElementById("Post-input-content").value
    if (input_content === "" || input_title === "") {
      alert("Fill in all fields.")
      return
    }
    const is_post_created = await createPost(input_title, input_content)
    if (!is_post_created) {
      alert("Your post couldn't be processed at this time. Try again later.")
      return
    }
    navigateToDiscussionPosts()
  }

  return(
    <div id="Post-div-container">
      <div id='Post-div-container-top'>
        <h1>Create Post</h1>
      </div>
      <form id='Post-form'>
        <label for='Post-input-title' id='Post-label'>Post</label><br></br>
        <input type='text' id='Post-input-title'></input><br></br>
        <label for='Post-input-content' id='Post-label'>Content</label><br></br>
        <input type='text' id='Post-input-content'></input><br></br>
        <button id='Post-button-submit' type='click' onClick={handleSubmit}>Submit Post</button>
      </form>
    </div>
  )
}

export default Post