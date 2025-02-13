import React, { useEffect, useContext, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import { AuthContext } from './AuthContext'
import commentIcon from '../images/comment-icon.png'
import thumbsupIcon from '../images/thumbsup-icon.png'
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations'

function Forum() {

  const { forumId } = useContext(AuthContext)
  const {username} = useContext(AuthContext)

  const [forumPost, setForumPost] = useState({})
  const [showCommentBox, setShowCommentBox] = useState(false)

  useEffect(() => {
    const fetchDiscussionPostById = async() => {
      const data = await clientDatabaseOperations.getDiscussionPostById(forumId)
      console.log(data)
      setForumPost(data)
    }
    
    fetchDiscussionPostById()
  }, [forumPost])

  const createComment = async() => {
    const input_comment_content = document.getElementById('Forum-textarea-comment').value
    if (input_comment_content === '') {
      alert('Please enter a comment')
      return
    }
    const is_comment_created = await clientDatabaseOperations.createComment(username, input_comment_content, forumId)
    setShowCommentBox(false)
  }

  const findTimeDifference = (input_time) => {
    const current_time = new Date()
    let differenceInSeconds = Math.floor((current_time - input_time) / 1000);
  
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInWeek = secondsInDay * 7;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;

    if (differenceInSeconds < secondsInMinute) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < secondsInHour) {
      return `${Math.floor(differenceInSeconds / secondsInMinute)} minutes ago`;
    } else if (differenceInSeconds < secondsInDay) {
      return `${Math.floor(differenceInSeconds / secondsInHour)} hours ago`;
    } else if (differenceInSeconds < secondsInWeek) {
      return `${Math.floor(differenceInSeconds / secondsInDay)} days ago`;
    } else if (differenceInSeconds < secondsInMonth) {
      return `${Math.floor(differenceInSeconds / secondsInWeek)} weeks ago`;
    } else if (differenceInSeconds < secondsInYear) {
      return `${Math.floor(differenceInSeconds / secondsInMonth)} months ago`;
    } else {
      return `${Math.floor(differenceInSeconds / secondsInYear)} years ago`;
    }
  }

  return(
    <div id='Forum-div-container'>
      <div id='Forum-div-post-container'>
        <p>Posted by {forumPost.Creator} {findTimeDifference(forumPost.Timestamp)}</p>
        <h1>{forumPost.Title}</h1>
        <p>{forumPost.Content}</p>
        <div id='Forum-div-flexbox'>
          <div id='Forum-div-likes'>
            <img id='Forum-img-comment' src={thumbsupIcon} alt='thumbsup-icon'></img>
            <p id='Forum-p-num'>{forumPost.Likes}</p>
          </div>
          <div id='Forum-div-comments'>
            <img id='DiscussionPosts-img-comment' src={commentIcon} alt='comment-icon'></img>
            <p id='DiscussionPosts-p-num'>{forumPost.NumOfComments}</p>
          </div>
        </div>
      </div>
      <div id='Forum-div-buttons-container'>
        <button id='Forum-button-comment' onClick={() => setShowCommentBox(!showCommentBox)}>Comment</button>
      </div>
      {showCommentBox && (
        <div id='Forum-div-comment-box'>
          <textarea id='Forum-textarea-comment'></textarea>
          <button id='Forum-button-post-comment' onClick={createComment}>Post</button>
        </div>
      )}
      <div id='Forum-div-comments-container'>
      {forumPost.Comments && forumPost.Comments.map((comment, index) => (
        <div key={index} id='Forum-div-comment'>
          <div id='Forum-div-comment-header-flexbox'>
            <p id='Forum-p-commenter'>{comment.commenter}</p>
            <p id='Forum-p-comment-timestamp'>{findTimeDifference(comment.timestamp)}</p>
          </div>
          <p id='Forum-p-comment-content'>{comment.comment_content}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Forum