import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styling/styling.css'
import {clientCalendarOperations} from "../apis/clientCalendarOperations";
import {AuthContext} from "./AuthContext";



  const EventCalendar = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const localizer = momentLocalizer(moment);
    const { username } = useContext(AuthContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventStart_date, setNewEventStart_date] = useState('');
    const [newEventStart_time, setNewEventStart_time] = useState('');
    const [newEventEnd_date, setNewEventEnd_date] = useState('');
    const [newEventEnd_time, setNewEventEnd_time] = useState('');
    const [newEventMeetingID, setNewEventMeetingID] = useState('');
    const [newEventPassword, setNewEventPassword] = useState('');

    //useEffect hook to fetch events
    useEffect(() => {
      console.log("EventCalendar component mounted. Fetching events...");
      const fetchEvents = async () => {
        try {
            const data = await clientCalendarOperations.getCalendarEvent();
            if (!data) {
                console.log('Failed to fetch events: Data is undefined');
                return;
            }
            console.log("Fetched events:", data);
            const calendar_events_array = data.map(event => {
              const startTimestamp = event.Start;
              const endTimestamp = event.End;

              if (startTimestamp && endTimestamp) {
              return {
                  ...event,
                  start: startTimestamp, 
                  end: endTimestamp 
              };
              } else {
                console.log('Invalid timestamp', event)
                return null;
              }
            }).filter(event => event !== null);

            console.log("Updated events:", calendar_events_array || []);
            setMyEvents(calendar_events_array || []);
          } catch (error) {
              console.log('Failed to fetch events:', error);
          }
    };
    fetchEvents();
    
}, [])
  
// Function to insert Events
    const insertEvent = async () => {
      const title = newEventTitle;
      const meeting_ID = newEventMeetingID;
      const meeting_password = newEventPassword;
      const startDateTime = new Date(`${newEventStart_date}T${newEventStart_time}`);
      const endDateTime = new Date(`${newEventEnd_date}T${newEventEnd_time}`);

      const isoStartDateTime = startDateTime.toISOString();
      const isoEndDateTime = endDateTime.toISOString();

      if (title && startDateTime && endDateTime) {
        try{


            const result = await clientCalendarOperations.insertEvent(
              title, 
              username, 
              isoStartDateTime,
              isoEndDateTime,
              meeting_ID,
              meeting_password
            );
          
          if (result) {
              const newEvent = {
                  Creator: username,
                  Start: isoStartDateTime, 
                  End: isoEndDateTime, 
                  Title: title,
                  _id: result.id,
                  MeetingID: meeting_ID,
                  Password: meeting_password
              };
              setMyEvents(prevEvents => [...prevEvents, newEvent]);
              closeDialog();
          } else {
              console.log('Failed to insert event:', result);
          }
        } catch (error) {
          console.log('Failed to insert event:', error);
        }
      }
  };
//fuction to Delete Events
  const deleteEvent = async (selectedEvent) => {
    const { Start, End } = selectedEvent;
    const input_field_value_object = {  Start, End};
    console.log('Sending request with input_field_value_object:', input_field_value_object);

    try {
      const result = await clientCalendarOperations.deleteEvent(input_field_value_object);
        const updatedEvents = myEvents.filter(event => event.start !== Start || event.end !== End);
        setMyEvents(updatedEvents);
        setSelectedEvent(null);
        console.log("Event deleted successfully. Updated events:", updatedEvents);
    } catch (error) {
      console.log('Failed to delete event:',error);
    }
  };

    //dialog functions
    const openDialog = () => {
        setDialogOpen(true);
    };
    //dialog functions
    const handleSaveButtonClick = () => {
      insertEvent();
    }
    //dialog functions
    const closeDialog = () => {
        setDialogOpen(false);
        setNewEventTitle('');
        setNewEventStart_date('');
        setNewEventStart_time('');
        setNewEventEnd_date('');
        setNewEventEnd_time('');
        setNewEventMeetingID('');
        setNewEventPassword(''); 
    };
    //dialog functions
    const handleEventClick = event => {
      console.log("Selected event:", event);
      setSelectedEvent(event);
    };
  

    const eventContent = ({ event }) => (
      <div>
          <p className='event-title'>{event.Title}</p>
          <p className='event-time'>{moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}</p>
      </div>
  );

    return (
        <div className="EventCalendar-div-container">
          <div className='header-container'>
            <h1>Event Calendar</h1>
          </div>
          <div className='calendar-container'>
            <button onClick={openDialog} className='create-event-button'>Create Event</button>
            <Calendar
                localizer={localizer}
                events={myEvents} 
                views={["month"]}
                startAccessor="Start"
                endAccessor="End"
                selectable={false} 
                onDoubleClickEvent={() => {}} 
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                toolbarAccessor={() => null}
                onSelectEvent={handleEventClick}
                components={{ event: eventContent }}
            />
          </div>
          {selectedEvent && (
            <div className="popover">
              <h2>Event Details</h2>
              <p>Title: {selectedEvent.Title}</p>
              <p>Creator: {selectedEvent.Creator}</p>
              <p>Start Time: {moment(selectedEvent.Start).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p>End Time: {moment(selectedEvent.End).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p>Meeting ID: {selectedEvent.MeetingID}</p>
              <p>Password: {selectedEvent.Password}</p>
              <button className="delete-button" onClick={() => deleteEvent(selectedEvent)}>Delete</button>
              <button className="cancel-button" onClick={() => setSelectedEvent(null)}>Cancel</button>
            </div>
          )}

            {dialogOpen && (
                <div className="dialog">
                    <h2>Add Event</h2>
                    <input type="text" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} placeholder="Title" required />
                    <div>
                        <input type="date" value={newEventStart_date} onChange={(e) => setNewEventStart_date(e.target.value)} required />
                        <input type="time" value={newEventStart_time} onChange={(e) => setNewEventStart_time(e.target.value)} required />
                    </div>
                    <div>
                        <input type="date" value={newEventEnd_date} onChange={(e) => setNewEventEnd_date(e.target.value)} required />
                        <input type="time" value={newEventEnd_time} onChange={(e) => setNewEventEnd_time(e.target.value)} required />
                    </div>
                    <div>
                        <input type="text" value={newEventMeetingID} onChange={(e) => setNewEventMeetingID(e.target.value)} placeholder="Meeting ID" />
                    </div>
                    <div>
                        <input type="password" value={newEventPassword} onChange={(e) => setNewEventPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <div>
                        <button onClick={handleSaveButtonClick} className='save'>Save</button>
                        <button onClick={closeDialog} className='cancel'>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
  }
  
export default EventCalendar;
