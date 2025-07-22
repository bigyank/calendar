import React, { useState } from 'react';
import ExperienceForm from '../../components/Experience/ExperienceForm';

function ExperiencePage() {
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experiences, setExperiences] = useState([]);

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
    <div className="page-container">
      <h1 className="page-title">Professional Experience</h1>
      
      <div className="experience-section">
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
    </div>
  );
}

export default ExperiencePage; 