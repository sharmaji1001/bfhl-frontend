import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inputData = JSON.parse(jsonInput);
      const response = await fetch('YOUR_BACKEND_API_URL/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError('Invalid JSON input or server error');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    let filteredData = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(filteredData, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter JSON:
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="10"
            cols="50"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <>
          <h3>Select Data to Display:</h3>
          <div>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest Lowercase Alphabet"
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          <h3>Response:</h3>
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;
