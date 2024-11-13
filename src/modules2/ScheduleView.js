import React, { useState, useEffect } from 'react';
import './ScheduleView.css'; // Reuse CSS for styling consistency

const ScheduleView = () => {
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    // Load schedule from localStorage
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      setScheduleList(JSON.parse(savedSchedule));
    }
  }, []);

  return (
    <div className="schedule-view">
      <h1 className="schedule-view-heading">Schedule</h1>
      <div className="schedule-view-container">
        <div className="schedule-box">
          <h3>Event Schedule</h3>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Sport</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Teams</th>
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((event, index) => (
                <tr key={index}>
                  <td>{event.title}</td>
                  <td>{event.sport}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td>{event.teams}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
