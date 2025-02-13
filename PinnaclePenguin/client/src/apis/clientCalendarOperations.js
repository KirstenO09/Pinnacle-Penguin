
export const clientCalendarOperations = {

    
    insertEvent: async function(input_title, input_username, startDateTime, endDateTime, input_meetingID, input_meetingpassword) {
        try {

            const response = await fetch("/insertEvent", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input_title, input_username, startDateTime, endDateTime, input_meetingID, input_meetingpassword })
            });
            if (!response.ok) {
                console.log('FAILURE: Database query did not send to the server.');
                var result = await response.json();
                return { success: false, error: "Server error." };
            } else {
                console.log("SUCCESS: Database query was processed by the server.");
                return { success: true, event: result ? result.insert_event : null };
            }
        } catch (error) {
            console.error("Error adding event:", error);
            return { success: false, error: error.message };
        }
    },
  
    
    getCalendarEvent: async function() {
        try {
            const response = await fetch("/get-event", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                console.error("FAILURE: Database query did not send to the server.");
                return null;
            }
            
            console.log('SUCCESS: Database query was processed by the server.');
            const result = await response.json();
            
            if (!result || !result.calendar_events_array) {
                console.error("Invalid server response for get-event.");
                return null;
            }
            return result.calendar_events_array
            
        } catch (error) {
            console.error("Error fetching event:", error);
            return null;
        }
    },
    
    deleteEvent: async function(input_field_value_object) {
        try {
            const response = await fetch("/deleteEvent", {
                method: 'DELETE',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( input_field_value_object )
            });
            if (!response.ok) {
                console.log("FAILURE: Database query did not send to the server.");
                return false;
            } else {
                console.log('SUCCESS: Database query was processed by the server.')
                const result = await response.json();
                    return result.bool_result;
            }
            
        } catch (error) {
            console.error("Error deleting event:", error);
            return false;
        }
    }
}