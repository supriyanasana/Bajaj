import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/bfhl', JSON.parse(jsonData));
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting the data:', error);
    }
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div>
      <h1>AP21110010862</h1>
      <form onSubmit={handleSubmit}>
        <label>
          JSON Input:
          <textarea value={jsonData} onChange={(e) => setJsonData(e.target.value)} rows="4" cols="50" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <div>
            <label>
              <input type="checkbox" value="alphabets" onChange={handleOptionChange} />
              Alphabets
            </label>
            <label>
              <input type="checkbox" value="numbers" onChange={handleOptionChange} />
              Numbers
            </label>
            <label>
              <input type="checkbox" value="highest_alphabet" onChange={handleOptionChange} />
              Highest Alphabet
            </label>
          </div>
          <div>
            {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
            {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
            {selectedOptions.includes('highest_alphabet') && <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
