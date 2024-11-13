import React, { useState, useEffect } from 'react';
import './ScheduleManagement.css';

const ScheduleManagement = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventSport, setEventSport] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTeams, setEventTeams] = useState('');  // New state for teams
  const [scheduleList, setScheduleList] = useState(() => {
    const savedSchedule = localStorage.getItem('schedule');
    return savedSchedule ? JSON.parse(savedSchedule) : [];
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Save schedule to localStorage on update
  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(scheduleList));
  }, [scheduleList]);

  // Form input handlers
  const handleEventTitleChange = (e) => setEventTitle(e.target.value);
  const handleEventSportChange = (e) => setEventSport(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleEventTimeChange = (e) => setEventTime(e.target.value);
  const handleEventLocationChange = (e) => setEventLocation(e.target.value);
  const handleEventTeamsChange = (e) => setEventTeams(e.target.value);  // New handler for teams
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle || !eventSport || !eventDate || !eventTime || !eventLocation || !eventTeams) {
      alert('Please fill in all fields');
      return;
    }
    const newEvent = { title: eventTitle, sport: eventSport, date: eventDate, time: eventTime, location: eventLocation, teams: eventTeams };
    setScheduleList([...scheduleList, newEvent]);
    setEventTitle('');
    setEventSport('');
    setEventDate('');
    setEventTime('');
    setEventLocation('');
    setEventTeams('');  // Clear teams field after submitting
  };

  const handleMouseEnter = (event) => setSelectedEvent(event);

  const handleDelete = (index) => {
    const updatedList = scheduleList.filter((_, i) => i !== index);
    setScheduleList(updatedList);
    setSelectedEvent(null);
  };

  // Filter events based on search term
  const filteredEvents = scheduleList.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="schedule-management">

     <h1 class="schedule-management-heading">Schedule Management</h1>


      <div className="schedule-management-boxes">
        {/* Add Event Box */}
        <div className="box add-event-box">
          <h3>Add New Event</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Event Title:</label>
              <input type="text" value={eventTitle} onChange={handleEventTitleChange} required />
            </div>
            <div className="form-field">
              <label>Sport:</label>
              <input type="text" value={eventSport} onChange={handleEventSportChange} required />
            </div>
            <div className="form-field">
              <label>Date:</label>
              <input type="date" value={eventDate} onChange={handleEventDateChange} required />
            </div>
            <div className="form-field">
              <label>Time:</label>
              <input type="time" value={eventTime} onChange={handleEventTimeChange} required />
            </div>
            <div className="form-field">
              <label>Location:</label>
              <input type="text" value={eventLocation} onChange={handleEventLocationChange} required />
            </div>
            <div className="form-field">
              <label>Teams (comma separated):</label>
              <input type="text" value={eventTeams} onChange={handleEventTeamsChange} required />
              <small>Enter teams separated by commas (e.g., Team A, Team B)</small>
            </div>
            <button type="submit" className="submit-btn">Add Event</button>
          </form>
        </div>

        {/* Event List Box */}
        <div className="box event-list-box">
          <h3>Event List</h3>
          <input
            type="text"
            placeholder="Search Events"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-field"
          />
          <ul className="scrollable-list">
            {filteredEvents.map((event, index) => (
              <li
                key={index}
                className="event-item"
                onMouseEnter={() => handleMouseEnter(event)}
              >
                {event.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Event Details Box */}
        {selectedEvent && (
          <div className="box event-details-box">
            <h3>Event Details</h3>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Sport:</strong> {selectedEvent.sport}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Teams:</strong> {selectedEvent.teams}</p> {/* Display teams */}
            <button onClick={() => handleDelete(scheduleList.indexOf(selectedEvent))} className="delete-btn">Delete Event</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleManagement;
