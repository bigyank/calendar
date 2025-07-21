import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('NL'); // Default to The Netherlands
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch list of countries
  useEffect(() => {
    setLoading(true);
    axios.get('https://openholidaysapi.org/Countries?languageIsoCode=en')
      .then(response => {
        console.log('Countries data:', response.data);
        setCountries(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load countries');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log('Countries:', countries);
  }, [countries]);

  // Fetch holidays when the selected country changes
  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      const currentYear = new Date().getFullYear();
      
      axios.get(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&languageIsoCode=en&validFrom=${currentYear}-01-01&validTo=${currentYear}-12-31`)
        .then(response => {
          console.log('Holidays data:', response.data);
          
          // Sort holidays by date
          const sortedHolidays = [...response.data].sort((a, b) => 
            new Date(a.startDate) - new Date(b.startDate)
          );
          
          setHolidays(sortedHolidays);
          setLoading(false);
        })
        .catch(err => {
          setError(`Failed to load holidays for ${selectedCountry}`);
          setLoading(false);
          console.error(err);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    console.log('Processed holidays:', holidays);
  }, [holidays]);

  // Handle country change
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Format date from ISO string to more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get country name from country object
  const getCountryName = (country) => {
    if (country && country.name && Array.isArray(country.name) && country.name.length > 0) {
      return country.name[0].text;
    }
    return 'Unknown Country';
  };

  // Get holiday name from holiday object
  const getHolidayName = (holiday) => {
    if (holiday && holiday.name && Array.isArray(holiday.name) && holiday.name.length > 0) {
      return holiday.name[0].text;
    }
    return 'Unknown Holiday';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>National Holidays Calendar</h1>
      </header>
      
      <main className="App-content">
        <div className="country-selector">
          <label htmlFor="country-select">Select a country: </label>
          <select 
            id="country-select" 
            value={selectedCountry} 
            onChange={handleCountryChange}
            disabled={loading || countries.length === 0}
          >
            {countries.map(country => (
              <option key={country.isoCode} value={country.isoCode}>
                {getCountryName(country)}
              </option>
            ))}
          </select>
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        <div className="holidays-list">
          <h2>Public Holidays {new Date().getFullYear()}</h2>
          {holidays.length === 0 && !loading ? (
            <p>No holidays found for the selected country.</p>
          ) : (
            <ul>
              {holidays.map((holiday, index) => (
                <li key={holiday.id || index} className="holiday-item">
                  <span className="holiday-date">{formatDate(holiday.startDate)}</span>
                  <span className="holiday-name">{getHolidayName(holiday)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
