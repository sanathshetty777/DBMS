import React, { useState } from 'react';
import './ReportsManagement.css';

const ReportsManagement = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  // Sample data for teams and games (replace with real data from your system)
  const teams = ['Warriors', 'Lions', 'Eagles']; // Example team names
  const games = [
    { team: 'Warriors', date: '2024-01-05', result: 'win', playerStats: { player1: { points: 15 }, player2: { points: 10 } } },
    { team: 'Warriors', date: '2024-02-10', result: 'loss', playerStats: { player1: { points: 12 }, player2: { points: 8 } } },
    // Add more games as needed
  ];

  // Handle form submission for report generation
  const handleGenerateReport = () => {
    if (!selectedTeam || !startDate || !endDate) {
      alert('Please select a team and date range.');
      return;
    }

    // Filter games for the selected team and within the specified date range
    const filteredGames = games.filter(game => 
      game.team === selectedTeam &&
      new Date(game.date) >= new Date(startDate) &&
      new Date(game.date) <= new Date(endDate)
    );

    if (filteredGames.length === 0) {
      setReportData(null);
      alert('No games found for the selected team and date range.');
      return;
    }

    // Calculate performance stats
    let wins = 0;
    let losses = 0;
    let totalPlayerStats = {};

    filteredGames.forEach(game => {
      if (game.result === 'win') {
        wins++;
      } else {
        losses++;
      }

      Object.keys(game.playerStats).forEach(player => {
        if (!totalPlayerStats[player]) {
          totalPlayerStats[player] = { points: 0 };
        }
        totalPlayerStats[player].points += game.playerStats[player].points;
      });
    });

    setReportData({
      team: selectedTeam,
      dateRange: `${startDate} to ${endDate}`,
      wins,
      losses,
      playerStats: totalPlayerStats,
    });
  };

  return (
    <div className="reports-management">
      <h1>Reports Management</h1>

      <div className="report-form">
        <h3>Generate Team Performance Report</h3>
        <div className="form-field">
          <label>Team:</label>
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            <option value="">Select a Team</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>{team}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>Date Range:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          to
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={handleGenerateReport} className="submit-btn">Generate Report</button>
      </div>

      {reportData && (
        <div className="report-details">
          <h3>Report for {reportData.team}</h3>
          <p><strong>Date Range:</strong> {reportData.dateRange}</p>
          <p><strong>Wins:</strong> {reportData.wins}</p>
          <p><strong>Losses:</strong> {reportData.losses}</p>

          <h4>Player Stats</h4>
          <ul>
            {Object.keys(reportData.playerStats).map((player, index) => (
              <li key={index}>
                <strong>{player}:</strong> {reportData.playerStats[player].points} points
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportsManagement;
