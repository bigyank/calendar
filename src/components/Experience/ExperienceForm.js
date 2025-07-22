import React, { useState, useEffect } from 'react';
import './ExperienceForm.css';

function ExperienceForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    employmentType: '',
    company: '',
    isCurrent: false,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Employment type options
  const employmentTypes = [
    'Full-time',
    'Part-time',
    'Self-employed',
    'Freelance',
    'Contract',
    'Internship',
    'Apprenticeship',
    'Seasonal'
  ];
  
  // Generate month options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Generate year options (current year down to 50 years ago)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear validation error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.startMonth) {
      newErrors.startMonth = 'Start month is required';
    }
    
    if (!formData.startYear) {
      newErrors.startYear = 'Start year is required';
    }
    
    if (!formData.isCurrent) {
      if (!formData.endMonth) {
        newErrors.endMonth = 'End month is required';
      }
      
      if (!formData.endYear) {
        newErrors.endYear = 'End year is required';
      }
      
      // Check if end date is after start date
      if (formData.startYear && formData.endYear) {
        const startDate = new Date(formData.startYear, months.indexOf(formData.startMonth));
        const endDate = new Date(formData.endYear, months.indexOf(formData.endMonth));
        
        if (endDate < startDate) {
          newErrors.endDate = 'End date must be after start date';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="experience-form-container">
      <div className="experience-form-header">
        <h2>Add experience</h2>
        <button 
          type="button" 
          className="close-button" 
          onClick={onCancel}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      
      <div className="notification-banner">
        <div className="notification-content">
          <div>
            <p className="notification-title">Notify network</p>
            <p className="notification-description">
              Turn on to notify your network of key profile changes (such as new job) and work
              anniversaries. Updates can take up to 2 hours.
            </p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-required-note">* Indicates required</div>
        
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Retail Sales Manager"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="employmentType">Employment type</label>
          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option value="">Please select</option>
            {employmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="company">Company or organization*</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Ex: Microsoft"
            className={errors.company ? 'error' : ''}
          />
          {errors.company && <p className="error-message">{errors.company}</p>}
        </div>
        
        <div className="form-group checkbox-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="isCurrent"
              checked={formData.isCurrent}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            <span>I am currently working in this role</span>
          </label>
        </div>
        
        <div className="form-group">
          <label>Start date*</label>
          <div className="date-inputs">
            <select
              name="startMonth"
              value={formData.startMonth}
              onChange={handleChange}
              className={errors.startMonth ? 'error' : ''}
            >
              <option value="">Month</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            
            <select
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              className={errors.startYear ? 'error' : ''}
            >
              <option value="">Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {(errors.startMonth || errors.startYear) && (
            <p className="error-message">Please enter a start date</p>
          )}
        </div>
        
        <div className="form-group">
          <label>End date{formData.isCurrent ? '' : '*'}</label>
          <div className="date-inputs">
            <select
              name="endMonth"
              value={formData.endMonth}
              onChange={handleChange}
              disabled={formData.isCurrent}
              className={errors.endMonth ? 'error' : ''}
            >
              <option value="">Month</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            
            <select
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              disabled={formData.isCurrent}
              className={errors.endYear ? 'error' : ''}
            >
              <option value="">Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {errors.endDate && <p className="error-message">{errors.endDate}</p>}
          {(errors.endMonth || errors.endYear) && !errors.endDate && (
            <p className="error-message">Please enter an end date</p>
          )}
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExperienceForm; 