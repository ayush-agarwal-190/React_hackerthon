import React, { useState } from 'react';
import jsonData from './data.json';

function App() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMedalType, setSelectedMedalType] = useState('');

  const handleDisciplineChange = (event) => {
    setSelectedDiscipline(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleMedalTypeChange = (event) => {
    setSelectedMedalType(event.target.value);
  };

  const filteredData = jsonData.filter(
    (data) =>
      (selectedDiscipline === '' ||
        data.discipline_title === selectedDiscipline) &&
      (selectedCountry === '' || data.country_name === selectedCountry) &&
      (selectedMedalType === '' || data.medal_type === selectedMedalType)
  );

  return (
    <div>
      <h1>Olymipc Geeks</h1>
      <div>
        <label>
          Select Discipline Title:
          <input
            type="text"
            value={selectedDiscipline}
            onChange={handleDisciplineChange}
          />
        </label>
        <label>
          Select Country Name:
          <input
            type="text"
            value={selectedCountry}
            onChange={handleCountryChange}
          />
        </label>
        <label>
          Select Medal Type:
          <input
            type="text"
            value={selectedMedalType}
            onChange={handleMedalTypeChange}
          />
        </label>
        {filteredData.length > 0 ? (
          <div>
            <h2>Filtered Results:</h2>
            <ul>
              {filteredData.map((data, index) => (
                <li key={index}>
                  <h3>Discipline Title: {data.discipline_title}</h3>
                  <p>Country Name: {data.country_name}</p>
                  <p>Medal Type: {data.medal_type}</p>
                  <p>Athlete Full Name: {data.athlete_full_name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No data found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}

export default App;
