import React, { useState } from 'react';
import Calander from './Calander';
import ExperienceForm from './ExperienceForm';
import './App.css';

function App() {
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState('calendar');

  const handleAddExperience = () => {
    setShowExperienceForm(true);
  };

  const handleCancelExperience = () => {
    setShowExperienceForm(false);
  };

  const handleSubmitExperience = (formData) => {
    setExperiences([...experiences, formData]);
    setShowExperienceForm(false);
  };

  const formatDate = (month, year) => {
    return month && year ? `${month} ${year}` : 'Present';
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>React App Demo</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'calendar' ? 'active' : ''} 
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
          <button 
            className={activeTab === 'form' ? 'active' : ''} 
            onClick={() => setActiveTab('form')}
          >
            Experience Form
          </button>
        </div>
      </header>

      <main className="app-content">
        {activeTab === 'calendar' ? (
          <Calander />
        ) : (
          <div className="experience-section">
            <h2>Professional Experience</h2>
            {!showExperienceForm && (
              <button className="add-experience-button" onClick={handleAddExperience}>
                + Add experience
              </button>
            )}

            {showExperienceForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <ExperienceForm 
                    onSubmit={handleSubmitExperience}
                    onCancel={handleCancelExperience}
                  />
                </div>
              </div>
            )}

            {experiences.length > 0 && (
              <div className="experiences-list">
                {experiences.map((exp, index) => (
                  <div key={index} className="experience-card">
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                    <p className="experience-date">
                      {formatDate(exp.startMonth, exp.startYear)} - {exp.isCurrent ? 'Present' : formatDate(exp.endMonth, exp.endYear)}
                      {exp.employmentType && <span> · {exp.employmentType}</span>}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
