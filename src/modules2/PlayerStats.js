// src/PlayerStats.js

import React from 'react';
import './PlayerStats.css'; // Import stylesheet for styling

const PlayerStats = () => {
  return (
    <div className="player-stats">
      <h1 className="stats-title">Player Stats and Performance</h1>

      <div className="stats-content">
        <div className="stats-card">
          <h3>Total Matches Played</h3>
          <p>--</p>
        </div>
        <div className="stats-card">
          <h3>Wins</h3>
          <p>--</p>
        </div>
        <div className="stats-card">
          <h3>Losses</h3>
          <p>--</p>
        </div>
        <div className="stats-card">
          <h3>Goals Scored</h3>
          <p>--</p>
        </div>
        <div className="stats-card">
          <h3>Runs Scored</h3>
          <p>--</p>
        </div>
        <div className="stats-card">
          <h3>Average Rating</h3>
          <p>--</p>
        </div>
       
      </div>
    </div>
  );
};

export default PlayerStats;
