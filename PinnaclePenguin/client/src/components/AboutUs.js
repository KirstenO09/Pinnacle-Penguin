import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'

function AboutUs() {


  return(
    <div id='AboutUs-div-container'>
<header>
<h1>About Us</h1>
</header>
<section>

<h2>Our Mission</h2>
<p>
Pinnacle Penguin is dedicated to book lovers and meant to allow them the ability to connect with like-minded individuals. This online community allows readers from all around the world to share their love for books through discussions, recommendations, and reviews. The purpose of this website is to create a platform where you book enthusiasts can discover new books to read while also providing a space that readers can engage in meaningful discussions about their favorite books. 
</p>

<h2>Meet the Team</h2>
<p><strong>Farah Mansoor</strong></p>
<p><strong>Dan Pop</strong></p>
<p><strong>Kirsten Osborne</strong></p>
<p><strong>Dahja Taylor</strong></p>
<p><strong>Akiaya Hill</strong></p>
</section>

    <footer>
        <p>Feel free to contact us at: <a href="mailto:PinnaclePenguinTeam@gmail.com">PinnaclePenguinTeam@gmail.com</a></p>
    </footer>
    </div>
  )
}

export default AboutUs