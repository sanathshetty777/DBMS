// src/components/FitnessTracker.js

import React, { useState } from 'react';
import './FitnessTracker.css';

const FitnessTracker = () => {
  // State for tracking input data
  const [fitnessData, setFitnessData] = useState({
    height: '',
    weight: '',
    sleepDuration: '',
    practiceHours: '',
  });

 
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFitnessData({
      ...fitnessData,
      [name]: value,
    });
  };

  return (
    <div className="fitness-tracker">
      
      
     

      {/* Input Form */}
      <div className="input-form">
        <h2>Update Fitness Data</h2>
        
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={fitnessData.height}
            onChange={handleInputChange}
            placeholder="Enter height in cm"
          />
        </label>
        
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={fitnessData.weight}
            onChange={handleInputChange}
            placeholder="Enter weight in kg"
          />
        </label>

        <label>
          Sleep Duration (hours):
          <input
            type="number"
            name="sleepDuration"
            value={fitnessData.sleepDuration}
            onChange={handleInputChange}
            placeholder="Enter hours slept"
          />
        </label>

        <label>
          Practice Hours:
          <input
            type="number"
            name="practiceHours"
            value={fitnessData.practiceHours}
            onChange={handleInputChange}
            placeholder="Enter practice hours"
          />
        </label>
      </div>

      {/* Display Fitness Data */}
      <div className="fitness-summary">
        <h2>Today's Fitness Summary</h2>
        <p><strong>Height:</strong> {fitnessData.height} cm</p>
        <p><strong>Weight:</strong> {fitnessData.weight} kg</p>
        <p><strong>Sleep Duration:</strong> {fitnessData.sleepDuration} hours</p>
        <p><strong>Practice Hours:</strong> {fitnessData.practiceHours} hours</p>
      </div>
    </div>
  );
};

export default FitnessTracker;
