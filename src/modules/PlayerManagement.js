import React, { useState } from 'react';
import './PlayerManagement.css';

const PlayerManagement = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerSport, setPlayerSport] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playersList, setPlayersList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [game, setGame] = useState('');
  const [points, setPoints] = useState('');
  const [fouls, setFouls] = useState('');

  // Form input handlers
  const handlePlayerNameChange = (e) => setPlayerName(e.target.value);
  const handlePlayerAgeChange = (e) => setPlayerAge(e.target.value);
  const handlePlayerSportChange = (e) => setPlayerSport(e.target.value);
  const handlePlayerPositionChange = (e) => setPlayerPosition(e.target.value);
  const handleGameChange = (e) => setGame(e.target.value);
  const handlePointsChange = (e) => setPoints(e.target.value);
  const handleFoulsChange = (e) => setFouls(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName || !playerAge || !playerSport || !playerPosition) {
      alert('Please fill in all fields');
      return;
    }
    const newPlayer = { name: playerName, age: playerAge, sport: playerSport, position: playerPosition, stats: [] };
    setPlayersList([...playersList, newPlayer]);
    setPlayerName(''); setPlayerAge(''); setPlayerSport(''); setPlayerPosition('');
  };

  const handleMouseEnter = (player) => {
    setSelectedPlayer(player);
  };

  const handleDelete = (index) => {
    const updatedList = playersList.filter((_, i) => i !== index);
    setPlayersList(updatedList);
    setSelectedPlayer(null);
  };

  const handleUpdateStats = (e) => {
    e.preventDefault();
    if (!game || !points || !fouls || !selectedPlayer) {
      alert('Please fill in all fields');
      return;
    }

    const updatedPlayer = { ...selectedPlayer };
    updatedPlayer.stats.push({ game, points, fouls });
    
    const updatedList = playersList.map(player =>
      player.name === selectedPlayer.name ? updatedPlayer : player
    );

    setPlayersList(updatedList);
    setGame(''); setPoints(''); setFouls('');
  };

  return (
    <div className="player-management">
      <h1>Player Management</h1>

      <div className="player-management-boxes">
        {/* Add Player Box */}
        <div className="box add-player-box">
          <h3>Add New Player</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Player Name:</label>
              <input type="text" value={playerName} onChange={handlePlayerNameChange} required />
            </div>
            <div className="form-field">
              <label>Age:</label>
              <input type="number" value={playerAge} onChange={handlePlayerAgeChange} required />
            </div>
            <div className="form-field">
              <label>Sport:</label>
              <input type="text" value={playerSport} onChange={handlePlayerSportChange} required />
            </div>
            <div className="form-field">
              <label>Position:</label>
              <input type="text" value={playerPosition} onChange={handlePlayerPositionChange} required />
            </div>
            <button type="submit" className="submit-btn">Add Player</button>
          </form>
        </div>

        {/* Player List Box */}
        <div className="box player-list-box">
          <h3>Player List</h3>
          <ul className="scrollable-list">
            {playersList.map((player, index) => (
              <li
                key={index}
                className="player-item"
                onMouseEnter={() => handleMouseEnter(player)}
              >
                {player.name}
              </li>
            ))}
          </ul>

          {/* Player Details */}
          {selectedPlayer && (
            <div className="player-details">
              <h4>Player Details</h4>
              <p><strong>Name:</strong> {selectedPlayer.name}</p>
              <p><strong>Age:</strong> {selectedPlayer.age}</p>
              <p><strong>Sport:</strong> {selectedPlayer.sport}</p>
              <p><strong>Position:</strong> {selectedPlayer.position}</p>
              <button onClick={() => handleDelete(playersList.indexOf(selectedPlayer))} className="delete-btn">Delete Player</button>
            </div>
          )}
        </div>

        {/* Update Player Stats Box */}
        {selectedPlayer && (
          <div className="box update-stats-box">
            <h3>Update Player Stats</h3>
            <form onSubmit={handleUpdateStats}>
              <div className="form-field">
                <label>Game:</label>
                <input type="text" value={game} onChange={handleGameChange} required />
              </div>
              <div className="form-field">
                <label>Points:</label>
                <input type="number" value={points} onChange={handlePointsChange} required />
              </div>
              <div className="form-field">
                <label>Fouls:</label>
                <input type="number" value={fouls} onChange={handleFoulsChange} required />
              </div>
              <button type="submit" className="submit-btn">Update Stats</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerManagement;
