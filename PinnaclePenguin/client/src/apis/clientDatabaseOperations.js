/*
**dpop09**
clientDatabaseOperations defines a set of client-side functions for interacting with a server to perform database operations
*/
export const clientDatabaseOperations = {
    find: async function(parmtr_collection_name, parmtr_field_value_object) {
        try {
            const response = await fetch("/find", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parmtr_collection_name, parmtr_field_value_object })
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }, 
    insert: async function(parmtr_collection_name, parmtr_field_value_object) {
        try {
            const response = await fetch("/insert", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parmtr_collection_name, parmtr_field_value_object })
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    insertMany: async function(parmtr_collection_name, parmtr_field_value_object_array) {
        try {
            const response = await fetch("/insertMany", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parmtr_collection_name, parmtr_field_value_object_array })
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    update: async function(parmtr_collection_name, parmtr_target_field_value_object, parmtr_new_field_value_object) {
        try {
            const response = await fetch("/update", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parmtr_collection_name, parmtr_target_field_value_object, parmtr_new_field_value_object })
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    delete: async function(parmtr_collection_name, parmtr_field_value_object) {
        try {
            const response = await fetch("/delete", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parmtr_collection_name, parmtr_field_value_object })
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    deleteAll: async function(parmtr_collection_name) {
        try {
            const response = await fetch("/deleteAll", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parmtr_collection_name })
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    getDiscussionPosts: async function() {
        try {
            const response = await fetch("/get-discussion-posts", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
            if (!response.ok) {
                console.log('FAILURE: Database query was not processed by the server correctly.')
                return
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.db_discussion_posts_array
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    insertPost: async function(input_username, input_title, input_content) {
        try {
            const response = await fetch("/insertPost", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input_username, input_title, input_content })
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    findEmail: async function(input_username) {
        try {
            const response = await fetch("/get-email", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({input_username})
            })
            if (!response.ok) {
                console.log('FAILURE: Database query was not processed by the server correctly.')
                return null
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.email
            }
        } catch (error) {
            console.error(error)
            return null
        }
    },
    getDiscussionPostById: async function(input_id) {
        try {
            const response = await fetch("/get-discussion-post-by-id", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({input_id})
            })
            if (!response.ok) {
                console.log('FAILURE: Database query was not processed by the server correctly.')
                return null
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.db_discussion_post
            }
        } catch (error) {
            console.error(error)
            return null
        }
    },
    createComment: async function(input_username, input_comment_content, input_forum_id) {
        try {
            const response = await fetch("/create-comment", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({input_username, input_comment_content, input_forum_id})
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    insertBookRecommendation: async function(input_username, input_title, input_author, input_summary, input_link, input_image_file) {
        try {
            const form_data = new FormData()
            form_data.append('input_username', input_username)
            form_data.append('input_title', input_title)
            form_data.append('input_author', input_author)
            form_data.append('input_summary', input_summary)
            form_data.append('input_link', input_link)
            form_data.append('input_image_file', input_image_file)
            const response = await fetch("/insert-book-recommendation", {
                method: 'POST',
                mode: 'cors',
                body: form_data
            })
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.')
                return -1
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.code_result
            }
        } catch (error) {
            console.error(error)
            return -1
        }
    },
    getRecommendedBooks: async function() {
        try {
            const response = await fetch("/get-recommended-books", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
            if (!response.ok) {
                console.log('FAILURE: Database query was not processed by the server correctly.')
                return
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.recommended_books_array
            }
        } catch (error) {
            console.error(error)
            return
        }
    },
    rateBook: async function(input_username, input_book_title, input_rating, input_num_ratings, input_avg_rating) {
        try {
            const response = await fetch("/rate-book", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({input_username, input_book_title, input_rating, input_num_ratings, input_avg_rating})
            })
            if (!response.ok) {
                console.log('FAILURE: Database query was not processed by the server correctly.')
                return false
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.bool_result
            }
        } catch (error) {
            console.error(error)
            return false
        }
    },
    getBookOfTheMonth: async function() {
        try {
            const response = await fetch("/get-book-of-the-month", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
            if (!response.ok) {
                console.log('FAILURE: Database query was not processed by the server correctly.')
                return null
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                var result = await response.json()
                return result.book_of_the_month
            }
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

