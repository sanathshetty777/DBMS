import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';  // Import Admin Dashboard
import PlayerDashboard from './PlayerDashboard'; // Import Player Dashboard
import Register from './Register'; // Import Register component
import './App.css';
import PlayerManagement from './modules/PlayerManagement';
import ScheduleManagement from './modules/ScheduleManagement';
import TeamManagement from './modules/TeamManagement';
import ReportsManagement from './modules/Reports';
import PlayerStats from './modules2/PlayerStats';
import ScheduleView from './modules2/ScheduleView';
import FitnessTracker from './modules2/FitnessTracker';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admindashboard" element={<AdminDashboard />} />
                    <Route path="/playerdashboard" element={<PlayerDashboard />} />
                    <Route path="/playermanagement" element={<PlayerManagement/>}/>
                    <Route path="/schedulemanagement" element={<ScheduleManagement/>}/> 
                    <Route path="/teammanagement" element={<TeamManagement/>}/>
                    <Route path="/reportsmanagement" element={<ReportsManagement/>}/>
                    <Route path="/playerstats" element={<PlayerStats/>}/>
                    <Route path="/scheduleview" element={<ScheduleView/>}/>
                    <Route path="/fitnesstracker" element={<FitnessTracker/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
