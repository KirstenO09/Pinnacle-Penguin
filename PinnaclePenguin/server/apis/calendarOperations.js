const { MongoClient, ServerApiVersion } = require("mongodb")
require('dotenv').config()


const URI = process.env.MONGODB_API_KEY 
const DATABASE_NAME = "PinnaclePenguinDatabase"
const client = new MongoClient(URI, {
    serverApi:  {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const calendarOperations = {
    connect: async function() {     
        try {
            await client.connect()
            return client.db(DATABASE_NAME)
        } catch(error) {
            console.log(error)
        }
    },
    insertEvent: async function(input_field_value_object) {
        try {
            const db = await calendarOperations.connect()
            const collection = db.collection("CalendarEvents")
            const insert_result = await collection.insertOne(input_field_value_object)
            return insert_result.insertedId != null
        } catch(error) {
            console.error(error)
            return false
        }
    },

    getCalendarEvent: async function() {
        try {
            const db = await calendarOperations.connect()
            const collection = db.collection("CalendarEvents")
            const find_result = await collection.find({}).toArray()
            if(find_result.length === 0) {
                console.log("The calendar events collection is empty.")
                return []
            }
            return find_result
        }catch(error) {
            console.error(error)
            return []
        }
    },

    deleteEvent: async function(input_field_value_object) {
        try {
    
            const db = await calendarOperations.connect()
            const collection = db.collection("CalendarEvents")
            const delete_result = await collection.deleteOne(input_field_value_object);
            return delete_result.deletedCount > 0
            
        }
        catch(error) {
            console.error("Error deleting event from database:",error)
            return false
        }
    }

};
module.exports = calendarOperations