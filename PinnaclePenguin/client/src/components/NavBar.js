/*
**dpop09**
NavBar componennt that is consistent for all pages of the website
*/

import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import { AuthContext } from './AuthContext';

function NavBar() {

    const { isLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/Home') //navigates to the create home page
    }
    const navigateToProfile = () => {
        navigate('/Profile') //navigates to the profile page
    }
    const navigateToAbout = () => {
        navigate('/AboutUs') //navigates to the about us page
    }
    const navigateToDiscussionPosts = () => {
        navigate('/DiscussionPosts')
    }
    const navigateToPost = () => {
        navigate('/Post')
    }
    const navigateToCalendar = () => {
        navigate('/Calendar')
    }
    const navigateToRecommend = () => {
        navigate('/Recommend')
    }
  
    return (
        <div id="NavBar-nav">
            <h4>PinnaclePenguin</h4>
            {isLoggedIn ? (     // **dpop** user must be logged in to see the navbar contents
                <ul>
                    <li><p onClick={navigateToHome}>Home</p></li>
                    <li><p onClick={navigateToDiscussionPosts}>Discussion</p></li>
                    <li><p onClick={navigateToPost}>Post</p></li>
                    <li><p onClick={navigateToProfile}>Profile</p></li>
                    <li><p onClick={navigateToAbout}>About Us</p></li>
                    <li><p onClick={navigateToCalendar}>Calendar</p></li>
                    <li><p onClick={navigateToRecommend}>Recommend</p></li>
                </ul>
            ) : null}
        </div>
      );
}

export default NavBar