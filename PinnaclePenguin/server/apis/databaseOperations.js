const { MongoClient, ServerApiVersion } = require("mongodb")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const URI = process.env.MONGODB_API_KEY // **dpop09** grab api key from .env file
const DATABASE_NAME = "PinnaclePenguinDatabase"

const client = new MongoClient(URI, {   // **dpop09** MongoClient is the object that references the connection to project database
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const dbOperations = {  // **dpop09** object literal to store and access all of the database functions
    connect: async function() {     // **dpop09** helper function to ensure connection to project database in MongoDB remote server
        try {
            await client.connect()
            return client.db(DATABASE_NAME)
        } catch(error) {
            console.log(error)
        }
    },
    find: async function(parmtr_collection_name, parmtr_field_value_object) {   // **dpop09** searches in collection for {field:value} object then returns it
        try {
            const db = await dbOperations.connect()
            const collection = db.collection(parmtr_collection_name)
            const find_result = await collection.find(parmtr_field_value_object).toArray()
            return find_result.length > 0   // **dpop09** return a boolean value indicating the success of the database operation
        } catch (error) {
            console.log(error)
            return false
        }
    },
    insert: async function(parmtr_collection_name, parmtr_field_value_object) { // **dpop09** inserts into collection a {field:value} object
        try {
            const db = await dbOperations.connect()
            const collection = db.collection(parmtr_collection_name)
            const insert_result = await collection.insertOne(parmtr_field_value_object)
            return insert_result.insertedId != null // **dpop09** return a boolean value indicating the success of the database operation
        } catch(error) {
            console.log(error)
            return false
        }
    },
    insertMany: async function(parmtr_collection_name, parmtr_field_value_object_array) {   // **dpop** inserts more than one {field:value} objects into collection
        try {
            const db = await dbOperations.connect()
            const collection = db.collection(parmtr_collection_name)
            const insertMany_result = await collection.insertMany(parmtr_field_value_object_array)
            return insertMany_result.insertedCount > 0  // **dpop09** return a boolean value indicating the success of the database operation
        } catch (error) {
            console.log(error)
            return false
        }
    },
    update: async function(parmtr_collection_name, parmtr_old_field_value_object, parmtr_new_field_value_object) { // **dpop** updates a {field:value} object in collection with a new {field:value} object
        try {
            const db = await dbOperations.connect()
            const collection = db.collection(parmtr_collection_name)
            const update_result = await collection.updateOne(parmtr_old_field_value_object, parmtr_new_field_value_object)
            return update_result.modifiedCount > 0  // **dpop09** return a boolean value indicating the success of the database operation
        } catch(error) {
            console.log(error)
            return false
        }
    },
    delete: async function(parmtr_collection_name, parmtr_target_field_value_object) { // **dpop** deletes a {field:value} object from collection
        try {
            const db = await dbOperations.connect()
            const collection = db.collection(parmtr_collection_name)
            const delete_result = await collection.deleteOne(parmtr_target_field_value_object)
            return delete_result.deletedCount > 0   // **dpop09** return a boolean value indicating the success of the database operation
        } catch(error) {
            console.log(error)
            return false
        }
    },
    deleteAll: async function(parmtr_collection_name) { // **dpop** deletes everything from collection
        try {
            const db = await dbOperations.connect()
            const collection = db.collection(parmtr_collection_name)
            const deleteAll_result = await collection.deleteMany({})
            return deleteAll_result.deletedCount > 0    // **dpop09** return a boolean value indicating the success of the database operation
        } catch(error) {
            console.log(error)
            return false
        }
    },
    getDiscussionPosts: async function () {
        try {
            const db = await dbOperations.connect()
            const collection = db.collection("DiscussionPosts")
            const find_result = await collection.find({}).toArray() // **dpop09** find all instances of public chatbots
            if (find_result.length === 0) {   // **dpop09** return an empty array if there are no public chatbots in collection
                console.log("The discussion forum posts collection is empty.")
                return []
            }
            return find_result
        } catch (error) {
            console.error(error)
            return []
        }
    },
    findEmail: async function (input_field_value_object) {
        try {
            const db = await dbOperations.connect()
            const collection = db.collection("UserProfiles")
            const find_result = await collection.find(input_field_value_object).toArray() 
            if (find_result.length < 1 ) {   
                console.log("There is no corresponding email with this username.")
                return null
            }
            return find_result[0].email
        } catch (error) {
            console.error(error)
            return []
        }
    },
    getDiscussionPostById: async function (parmtr_field_value_object) {
        try {
            const db = await dbOperations.connect()
            const collection = db.collection("DiscussionPosts")
            const find_result = await collection.find(parmtr_field_value_object).toArray()
            if (find_result.length < 1 ) {
                console.log("There is no corresponding discussion post with this ID.")
                return null
            }
            return find_result[0]
        } catch (error) {
            console.error(error)
            return null
        }
    },
    createComment: async function (input_username, input_comment_content, input_forum_id) {
        try {
            const input_field_value_object = {
                commenter: input_username,
                comment_content: input_comment_content,
                timestamp: Date.now()
            }
            const db = await dbOperations.connect()
            const collection = db.collection("DiscussionPosts")
            const updateResult = await collection.updateOne({ForumID: input_forum_id}, {$push: {Comments: input_field_value_object}});
            return updateResult.modifiedCount > 0;
        } catch (error) {
            console.error(error)
            return false
        }
    },
    insertBookRecommendation: async function(input_field_value_object) {
        try {
            const db = await dbOperations.connect()
            const collection = db.collection("BookRecommendations")
            const insert_result = await collection.insertOne(input_field_value_object)
            return insert_result.insertedId != null
        } catch(error) {
            console.error(error)
            return false
        }
    },
    getRecommendedBooks: async function () {
        try {
            const db = await dbOperations.connect()
            const collection = db.collection("BookRecommendations")
            const find_result = await collection.find({}).toArray() 
            if (find_result.length === 0) {
                return []
            }
            return find_result
        } catch (error) {
            console.error(error)
            return []
        }
    },
    rateBook: async function(input_username, input_book_title, input_rating) {
        try {
            const ratingObject = {
                username: input_username,
                rating: input_rating
            };
            const db = await dbOperations.connect();
            const collection = db.collection("BookRecommendations");
            const updateResult = await collection.updateOne(
                { Title: input_book_title },
                { $push: { Ratings: ratingObject } }
            );
            return updateResult.modifiedCount > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    updateNumOfRatings: async function(input_book_title) {
        try {
            const db = await dbOperations.connect();
            const collection = db.collection("BookRecommendations");
            const updateResult = await collection.updateOne(
                { Title: input_book_title },
                { $inc: { NumOfRatings: 1 } }  // Increment NumOfRatings by 1
            );
            return updateResult.modifiedCount > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    },    
    updateAverageRating: async function(input_book_title, input_rating, input_num_ratings, input_avg_rating) {
        try {
            console.log(`input_book_title: ${input_book_title}, input_rating: ${input_rating}, input_num_ratings: ${input_num_ratings}, input_avg_rating: ${input_avg_rating}`);
            const new_average_rating = (((input_avg_rating * input_num_ratings) + input_rating) / (input_num_ratings + 1));
            console.log(`new_average_rating: ${new_average_rating}`);
            const db = await dbOperations.connect();
            const collection = db.collection("BookRecommendations");
            const updateResult = await collection.updateOne(
                { Title: input_book_title },
                { $set: { AverageRating: new_average_rating } }
            );
            return updateResult.modifiedCount > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    getBookOfTheMonth: async function () {
        try {
            const db = await dbOperations.connect();
            const collection = db.collection("BookRecommendations");
    
            // Find the book with the highest AverageRating
            const find_result = await collection.find()
                .sort({AverageRating: -1}) // Sort by AverageRating in descending order
                .limit(1) // Limit to the highest rated book
                .toArray();
    
            if (find_result.length === 0) {
                return null; // Return null if no books found
            }
            return find_result[0]; // Return the book with the highest AverageRating
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}

module.exports = dbOperations   // **dpop09** export object literal for outside use