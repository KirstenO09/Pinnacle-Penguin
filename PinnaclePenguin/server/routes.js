const express = require('express')
const router = express.Router()
const dbOperations = require('./apis/databaseOperations')
const calendarOperations = require('./apis/calendarOperations')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const BYTES_IN_A_MEGABYTE = 1048576

router.post('/find', async (req,res) => {
    try {
        const {parmtr_collection_name, parmtr_field_value_object} = req.body
        var bool_result = await dbOperations.find(parmtr_collection_name, parmtr_field_value_object)
        res.status(200).send({bool_result})
    } catch(error) {
        res.status(400).send(error.message)
    }
})
router.post('/insert', async (req,res) => {
    try {
        const {parmtr_collection_name, parmtr_field_value_object} = req.body
        var bool_result = await dbOperations.insert(parmtr_collection_name, parmtr_field_value_object)
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error_message)
    }
})
router.post('/insertMany', async (req,res) => {
    try {
        const {parmtr_collection_name, parmtr_field_value_object_array} = req.body
        var bool_result = await dbOperations.insertMany(parmtr_collection_name, parmtr_field_value_object_array)
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error_message)
    }
})
router.post('/update', async (req,res) => {
    try {
        const {parmtr_collection_name, parmtr_target_field_value_object, parmtr_new_field_value_object} = req.body
        var bool_result = await dbOperations.update(parmtr_collection_name, parmtr_target_field_value_object, parmtr_new_field_value_object)
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error_message)
    }
})
router.post('/delete', async (req,res) => {
    try {
        const {parmtr_collection_name, parmtr_field_value_object} = req.body
        var bool_result = await dbOperations.delete(parmtr_collection_name, parmtr_field_value_object)
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error_message)
    }
})
router.post('/deleteAll', async (req,res) => {
    try {
        const {parmtr_collection_name} = req.body
        var bool_result = await dbOperations.deleteAll(parmtr_collection_name)
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error_message)
    }
})
router.post('/get-discussion-posts', async (req,res) => {
    try {
        var db_discussion_posts_array = await dbOperations.getDiscussionPosts() // **dpop09** grab all public chatbots from database
        res.status(200).send({db_discussion_posts_array})
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/insertPost', async (req,res) => {
    try {
        const {input_username, input_title, input_content} = req.body
        const input_field_value_object = {
            Creator: input_username,
            Timestamp: Date.now(),
            Title: input_title,
            Content: input_content,
            NumOfComments: 0,
            Likes: 0,
            ForumID: uuidv4(),
            NumOfComments: 0,
            Comments: []
        }
        var bool_result = await dbOperations.insert("DiscussionPosts", input_field_value_object)
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error_message)
    }
});


router.post('/insertEvent',async(req, res) => {
    try{
        const {input_title,input_username, startDateTime, endDateTime, input_meetingID, input_meetingpassword}= req.body;

        // Parse ISO strings to Date objects
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);
        
        // Convert to Unix timestamp
        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();

        const input_field_value_object = {

            Creator: input_username,
            Title: input_title,
            Start: startTimestamp,
            End: endTimestamp,
            MeetingID: input_meetingID,
            Password: input_meetingpassword
        };
        const bool_result = await calendarOperations.insertEvent(input_field_value_object)
        res.status(200).send({bool_result});
    }catch(error){
        res.status(400).send(error)
    }
});

router.post('/get-event',async(req, res) => {
    try{
        const calendar_events_array = await calendarOperations.getCalendarEvent()
        res.status(200).send({calendar_events_array})
    } catch(error){
        res.status(400).send(error)
    }
    
});


router.delete('/deleteEvent',async(req, res) => {
    try{
        const input_field_value_object = req.body
        const bool_result = await calendarOperations.deleteEvent(input_field_value_object)
        if (bool_result) {
            res.status(200).send({ message: 'Event deleted successfully' });
        } else {
            res.status(400).send({ message: 'Failed to delete event' });
        }
    } catch (error) {
        console.log("Error deleting event: ", error);
        res.status(500).send("Internal Server Error");
    }
});

//get user email
router.post('/get-email',async(req, res) => {
    try{
        const { input_username }= req.body
        const input_field_value_object = { 
            username: input_username
        }
        const email = await dbOperations.findEmail(input_field_value_object)
        res.status(200).send({email});

    }catch(error){
        res.status(400).send(error)
    }
});
router.post('/get-discussion-post-by-id', async (req,res) => {
    try {
        const {input_id} = req.body
        const input_field_value_object = {
            ForumID: input_id
        }
        var db_discussion_post = await dbOperations.getDiscussionPostById(input_field_value_object) // **dpop09** grab all public chatbots from database
        res.status(200).send({db_discussion_post})
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/create-comment', async (req,res) => {
    try {
        const {input_username, input_comment_content, input_forum_id} = req.body
        var bool_result = await dbOperations.createComment(input_username, input_comment_content, input_forum_id)
        var update_NumOfComments = await dbOperations.update("DiscussionPosts", {ForumID: input_forum_id}, {$inc: {NumOfComments: 1}})
    
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/insert-book-recommendation', upload.fields([{name: 'input_image_file', maxCount: 1}]), async (req, res) => {
    try {
        let code_result = 0;
        let imageData = null;
        const {
            input_username: input_username,
            input_title: input_title,
            input_author: input_author,
            input_summary: input_summary,
            input_link: input_link,
        } = req.body
        const input_image_file = req.files['input_image_file'] ? req.files['input_image_file'][0] : null;
        if (input_image_file) {
            if (['image/jpeg', 'image/png'].includes(input_image_file.mimetype)) {
                if (input_image_file.size <= 3 * BYTES_IN_A_MEGABYTE) { // 3 MB size limit for images
                    // Read the image file and encode its content
                    const imageBuffer = await fs.promises.readFile(input_image_file.path);
                    imageData = imageBuffer.toString('base64'); // Convert to Base64
                } else {
                    bool_result = 1
                }
            } else {
                bool_result = 2
            }
        }
        var input_field_value_object = {
            Creator: input_username,
            Title: input_title,
            Author: input_author,
            Summary: input_summary,
            Link: input_link,
            Ratings: [],
            NumOfRatings: 0,
            AverageRating: 0,
            ImageData: imageData
        }
        if (code_result === 0) {
            let is_inserted = await dbOperations.insertBookRecommendation(input_field_value_object)
            if (!is_inserted) {
                code_result = 3
            }
        }
        res.status(200).send({code_result})
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/get-recommended-books', async (req,res) => {
    try {
        var recommended_books_array = await dbOperations.getRecommendedBooks() // **dpop09** grab all recommended books from database
        res.status(200).send({recommended_books_array})
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/rate-book', async (req,res) => {
    try {
        const {input_username, input_book_title, input_rating, input_num_ratings, input_avg_rating} = req.body
        var bool_result = await dbOperations.rateBook(input_username, input_book_title, input_rating)
        var bool_result_1 = await dbOperations.updateNumOfRatings(input_book_title)
        var bool_result_2 = await dbOperations.updateAverageRating(input_book_title, input_rating, input_num_ratings, input_avg_rating)
        res.status(200).send({bool_result})
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/get-book-of-the-month', async (req,res) => {
    try {
        var book_of_the_month = await dbOperations.getBookOfTheMonth()
        res.status(200).send({book_of_the_month})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router