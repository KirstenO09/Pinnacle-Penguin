import React, { useEffect, useState, useContext } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import { AuthContext } from './AuthContext'
import commentIcon from '../images/comment-icon.png'
import thumbsupIcon from '../images/thumbsup-icon.png'
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations'

function DiscussionPosts() {

  const { forumId, setForumId } = useContext(AuthContext)

  const [forumPosts, setForumPosts] = useState([])

  const navigate = useNavigate()
  const navigateToForum = (parmtr_forum_id) => {
    setForumId(parmtr_forum_id)
    navigate('/Forum')
  }

  useEffect(() => {
    const fetchDiscussionPosts = async() => {
      const data = await clientDatabaseOperations.getDiscussionPosts()
      setForumPosts(data)
    }

    fetchDiscussionPosts()
  }, [])

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
    <div id="DiscussionPosts-div-container">
      <div id='DiscussionPosts-div-container-top'>
        <h1>Discussion Forums</h1>
      </div>
      <div id='DiscussionPosts-div-forums'>
        {forumPosts.length !== 0 ? (
          forumPosts.map((forum, index) => (
          <div id='DiscussionPosts-div-single-forum' key={index} onClick={() => navigateToForum(forum.ForumID)}>
            <p id='DiscussionPosts-p-creator-time'>Posted by {forum.Creator} {findTimeDifference(forum.Timestamp)}</p>
            <p id='DiscussionPosts-p-title'>{forum.Title}</p>
            <p id='DiscussionPosts-p-description'>{forum.Content}</p>
            <div id='DiscussionPosts-div-forum-bottom'>
              <div id='DiscussionPosts-div-bottom-flexbox'>
                <img id='DiscussionPosts-img-comment' src={thumbsupIcon} alt='thumbsup-icon'></img>
                <p id='DiscussionPosts-p-num'>{forum.Likes}</p>
              </div>
              <div id='DiscussionPosts-div-bottom-flexbox'>
                <img id='DiscussionPosts-img-comment' src={commentIcon} alt='comment-icon'></img>
                <p id='DiscussionPosts-p-num'>{forum.NumOfComments}</p>
              </div>
            </div>     
        </div>
          ))
        ) : <p>Empty</p>}
      </div>
    </div>
  )
}

export default DiscussionPosts