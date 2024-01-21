import { useState, useEffect } from 'react'

function App() {
  const randomNumber = Math.floor(Math.random() * 21);
  
  const [fetchDataTrigger, setFetchDataTrigger] = useState(true);
  
  const [data, setData] = useState('')

  const [input, setInput] = useState('');
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    if (fetchDataTrigger) {
      fetch(`https://api.datamuse.com/words?ml=${input}`)
        .then(res => res.json())
        .then(apiData => {
          console.log(apiData[randomNumber]);
          setData(apiData[randomNumber]['word']);
        })
        .catch(error => console.error(`Error getting data: ${error}`));
        setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger]);

  return (
    <>
      <h1>React Thesaurus App</h1>
      <div className="card">
        <div><input onChange={handleChange} className='inputText'></input></div>
        <button onClick={() => setFetchDataTrigger(true)}>
          Fetch
        </button>
        <p>
          {data}
        </p>
      </div>
      <div className="card">
        <pre>
          Instructions: Enter a word above and hit the button to fetch a synonym.
        </pre>
      </div>

    </>
  )
}

export default App
