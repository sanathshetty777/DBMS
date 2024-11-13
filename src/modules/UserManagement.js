import React, { useState, useEffect } from 'react';
import './TeamManagement.css';

const TeamManagement = () => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLocation, setTeamLocation] = useState('');
  const [newMember, setNewMember] = useState('');
  const [teamList, setTeamList] = useState(() => {
    const savedTeams = localStorage.getItem('teams');
    return savedTeams ? JSON.parse(savedTeams) : [];
  });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Save team data to localStorage on update
  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teamList));
  }, [teamList]);

  // Form input handlers
  const handleTeamNameChange = (e) => setTeamName(e.target.value);
  const handleTeamLocationChange = (e) => setTeamLocation(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleNewMemberChange = (e) => setNewMember(e.target.value);

  const handleAddMember = () => {
    if (newMember && !teamMembers.includes(newMember)) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (member) => {
    setTeamMembers(teamMembers.filter((m) => m !== member));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName || !teamLocation || teamMembers.length === 0) {
      alert('Please fill in all fields and add at least one member');
      return;
    }
    const newTeam = { name: teamName, members: teamMembers, location: teamLocation };
    setTeamList([...teamList, newTeam]);
    setTeamName('');
    setTeamLocation('');
    setTeamMembers([]);
  };

  const handleMouseEnter = (team) => setSelectedTeam(team);

  const handleDelete = (index) => {
    const updatedList = teamList.filter((_, i) => i !== index);
    setTeamList(updatedList);
    setSelectedTeam(null);
  };

  // Filter teams based on search term
  const filteredTeams = teamList.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="team-management">
      <h1>Team Management</h1>

      <div className="team-management-boxes">
        {/* Add Team Box */}
        <div className="box add-team-box">
          <h3>Add New Team</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Team Name:</label>
              <input type="text" value={teamName} onChange={handleTeamNameChange} required />
            </div>
            <div className="form-field">
              <label>Location:</label>
              <input type="text" value={teamLocation} onChange={handleTeamLocationChange} required />
            </div>
            <div className="form-field">
              <label>Members:</label>
              <div className="members-input">
                <input 
                  type="text" 
                  value={newMember} 
                  onChange={handleNewMemberChange} 
                  placeholder="Enter player name"
                />
                <button type="button" onClick={handleAddMember}>Add Member</button>
              </div>
              <ul className="members-list">
                {teamMembers.map((member, index) => (
                  <li key={index}>
                    {member} 
                    <button type="button" onClick={() => handleRemoveMember(member)} className="remove-btn">Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit" className="submit-btn">Add Team</button>
          </form>
        </div>

        {/* Team List Box */}
        <div className="box team-list-box">
          <h3>Team List</h3>
          <input
            type="text"
            placeholder="Search Teams"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-field"
          />
          <ul className="scrollable-list">
            {filteredTeams.map((team, index) => (
              <li
                key={index}
                className="team-item"
                onMouseEnter={() => handleMouseEnter(team)}
              >
                {team.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Team Details Box */}
        {selectedTeam && (
          <div className="box team-details-box">
            <h3>Team Details</h3>
            <p><strong>Team Name:</strong> {selectedTeam.name}</p>
            <p><strong>Members:</strong> {selectedTeam.members.join(', ')}</p>
            <p><strong>Location:</strong> {selectedTeam.location}</p>
            <button onClick={() => handleDelete(teamList.indexOf(selectedTeam))} className="delete-btn">Delete Team</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
