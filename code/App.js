import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await axios.get(
        'https://official-joke-api.appspot.com/jokes/random'
      );
      setJoke(response.data);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const handleShowPunchline = () => {
    setJoke({ ...joke, showPunchline: true });
  };

  return (
    <div className="app">
      <h1>Random Jokes App</h1>
      {joke ? (
        <div className="joke">
          <p>{joke.setup}</p>
          {joke.showPunchline && <p className="punchline">{joke.punchline}</p>}
          {!joke.showPunchline && (
            <button onClick={handleShowPunchline}>Get Answer</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={fetchJoke}>Fetch Another Joke</button>
    </div>
  );
};

export default App;
