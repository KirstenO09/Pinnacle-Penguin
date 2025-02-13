import React, { useEffect, useState, useContext } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../styling/styling.css'
import { AuthContext } from './AuthContext'
import { clientDatabaseOperations } from '../apis/clientDatabaseOperations'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Recommend() {
    const {username} = useContext(AuthContext)

    const [selectedImageFile, setSelectedImageFile] = useState(null)

    const [recommendedBooks, setRecommendedBooks] = useState([])

    useEffect(() => {
        const fetchRecommendedBooks = async () => {
            const recommended_books = await clientDatabaseOperations.getRecommendedBooks()
            setRecommendedBooks(recommended_books)
        }
        fetchRecommendedBooks()
    }, [])

    const handleImageFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const validTypes = ['image/png', 'image/jpeg']
            if (validTypes.includes(file.type)) {
                setSelectedImageFile(file)
            } else {
                alert('Only PNG or JPEG files are allowed.')
                event.target.value = null
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = document.getElementById("Recommend-input-title").value
        const author = document.getElementById("Recommend-input-author").value
        const summary = document.getElementById("Recommend-input-summary").value
        const link = document.getElementById("Recommend-input-link").value

        if (title === "" || author === "" || summary === "" || link === "" || selectedImageFile === null) {
            alert("Fill in all fields.")
            return
        }
        const is_book_recommended = await clientDatabaseOperations.insertBookRecommendation(username, title, author, summary, link, selectedImageFile)
        if (is_book_recommended === -1) {
            alert("Your book recommendation couldn't be processed at this time. Try again later.")
            return
        }
        else if (is_book_recommended === 1) {
            alert('The book image must be at most 3 MB in size.')
            return
        }
    }

    const handleRateBook = async (event, book_title, num_of_ratings, average_ratings) => {
        event.preventDefault();
        const rating = document.getElementById(`Recommend-input-${book_title}`).value
        if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
            alert("Please enter a valid rating between 1 and 5.");
            return;
        }
        const is_book_rated = await clientDatabaseOperations.rateBook(username, book_title, rating, num_of_ratings, average_ratings)
        if (!is_book_rated) {
            alert("Your book rating couldn't be processed at this time. Try again later.")
            return
        }
    }

  return(
    <div id='Recommend-div-container'>
        <div id='Recommend-div-container-top'>
            <h1>Recommend a Book</h1>
        </div>
        <h1>Make an Entry</h1>
        <form>
            <input type="text" id="Recommend-input-title" placeholder="Title"></input>
            <br></br>
            <input type="text" id="Recommend-input-author" placeholder="Author"></input>
            <br></br>
            <input type="text" id="Recommend-input-summary" placeholder="Summary"></input>
            <br></br>
            <input type="text" id="Recommend-input-link" placeholder="Link"></input>
            <br></br>
            <input id='Recommend-input-file' onChange={handleImageFileChange} type='file' accept='.png, .jpeg, .jpg'/>
            <br></br>
            <Button id='Recommend-button-submit' type="submit" onClick={handleSubmit}>Submit</Button>
        </form>
        <div>
            <h1>Current Entries</h1>
            <div>
                {recommendedBooks && recommendedBooks.length > 0 ? (
                    recommendedBooks.map((book, index) => (
                        <Card key={index}>
                            <Card.Img variant="top" id='Recommend-card-image' src={book.ImageData ? `data:image/jpeg;base64,${book.ImageData}` : null} />
                            <Card.Body>
                                <Card.Title>{book.Title}</Card.Title>
                                <Card.Text>Author: {book.Author}</Card.Text>
                                <Card.Text>Summary: {book.Summary}</Card.Text>
                                <Card.Text>Order Link: <a href={book.Link}>Click Here</a></Card.Text>
                                <Card.Text>
                                    Rate out of 5: 
                                    <Form onSubmit={(e) => handleRateBook(e, book.Title, book.NumOfRatings, book.AverageRating)}>
                                        <Form.Control id={`Recommend-input-${book.Title}`} type="text" placeholder="Rate" />
                                        <Button type="submit">Rate</Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No books recommended yet.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Recommend