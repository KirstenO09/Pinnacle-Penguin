import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations'
import bookOfMonth from '../images/HGbook.jpg'
import book1 from '../images/book1.jpeg'
import book2 from '../images/book2.jpeg'
import book3 from '../images/book3.jpeg'
import book4 from '../images/book4.jpeg'
import book5 from '../images/book5.jpeg'
import book6 from '../images/book6.jpeg'
import book7 from '../images/book7.jpeg'
import book8 from '../images/book8.jpeg'
import book9 from '../images/book9.jpg'
import next from '../images/next.png'
import back from '../images/back.png'


function Home() {

  const [bookOfTheMonth, setBookOfTheMonth] = useState(null)

  useEffect(() => {
    const getBookOfTheMonth = async () => {
      const data = await clientDatabaseOperations.getBookOfTheMonth();
      setBookOfTheMonth(data);
    }
    getBookOfTheMonth();
    const scrollContainer = document.querySelector('.slider');
    const nextArrow = document.getElementById('next-img');
    const backArrow = document.getElementById('back-img');
    const bookWidth = 300;

    nextArrow.addEventListener('click', () => {
      scrollContainer.scrollLeft += bookWidth;
    });

    backArrow.addEventListener('click', () => {
      scrollContainer.scrollLeft -= bookWidth;
    });

     // Cleanup event listeners when the component unmounts
     return () => {
      nextArrow.removeEventListener('click', () => {
        scrollContainer.scrollLeft += bookWidth;
      });

      backArrow.removeEventListener('click', () => {
        scrollContainer.scrollLeft -= bookWidth;
      });
    };
   
  }, []); // Empty dependency array ensures the effect runs once after mounting

  return(
    <div id='Home-div-container'>
      <div id='Home-div-title'>
        <h1>Welcome!</h1>
      </div>
      <h1 id='Home-h1-Most-Recommended-title'>Most Recommended Book</h1>
      {bookOfTheMonth === null ? (
        <div>
          <p>No books have been added yet.</p>
        </div>
      ) : (
        <section id='Book-of-the-Month' className="book-of-month-container">
          <div className="content-container">
            <div className="image-container">
              <img id="book-of-month-img" src={bookOfTheMonth.ImageData ? `data:image/jpeg;base64,${bookOfTheMonth.ImageData}` : null} alt="HGbook" height="500" width="400" />
            </div>
          </div>
          <div className="article">
            <h3 style={{ color: 'black' }}>Title: {bookOfTheMonth.Title}</h3> 
            <h4 style={{ color: 'black' }}>Author: {bookOfTheMonth.Author}</h4> 
            <p style={{ color: 'black' }}>Community Rating: {bookOfTheMonth.AverageRating}/5</p>
            <a href={bookOfTheMonth.Link}>Purchase Here</a>
            <p style={{ color: 'black' }}>Summary:</p>
            <p style={{ color: 'black' }}>
              {bookOfTheMonth.Summary}
            </p>
          </div>
        </section>
      )}

      <section id='Home-info' className="home-info-container">
        <div className="discussion-info-container">
        <h2 style={{ color: 'black' }}>Discuss!</h2>
        <p style={{ color: 'black' }}>
          Join our vibrant book community to engage in meaningful discussions you can rate & review, 
          share your thoughts, and exchange opinions with fellow avid readers.</p>
        </div>
        <div className="post-info-container">
        <h2 style={{ color: 'black' }}>Post!</h2>
        <p style={{ color: 'black' }}>
          Post your favorite books on our platform, sharing what captivated you about each book and 
          connecting with fellow enthusiasts over shared passions.</p>
        </div>
        <div className="eventcal-info-container">
        <h2 style={{ color: 'black' }}>Event Calendar!</h2>
        <p style={{ color: 'black' }}>
          Explore our dynamic event calendar, where you can add and join book discussions on specific days, 
          fostering a shared reading experience with like-minded individuals.</p>
        </div>
      </section>

      <section id='slider-header' className="slider-header"><h1>Popular Books!</h1></section>
      <section id='slider-content' className="slider-info-container">
      <div className="slider-wrap">
      <img id="back-img" src={back} alt="back arrow" height="30" width="30"/>
      <div className="slider">
        <div>
          <span><img id="book1-img" src={book1} alt="The Maze Runner" /></span>
          <span><img id="book2-img" src={book2} alt="To Kill  MockingBird"  /></span>
          <span><img id="book3-img" src={book3} alt="Divergent" /></span>
        </div>
        <div>
          <span><img id="book4-img" src={book4} alt="The Great Gatsby" /></span>
          <span><img id="book5-img" src={book5} alt="The Hate U Give" /></span>
          <span><img id="book6-img" src={book6} alt="Harry Potter" /></span>
        </div>
        <div>
          <span><img id="book7-img" src={book7} alt="The Alchemist" /></span>
          <span><img id="book8-img" src={book8} alt="A Thousand Pieces Of You" /></span>
          <span><img id="book9-img" src={book9} alt="Dune" /></span>
        </div>
      </div>
      <img id="next-img" src={next} alt="next arrow" height="30" width="30"/>
      </div>
      </section>
    </div>
  )
}

export default Home