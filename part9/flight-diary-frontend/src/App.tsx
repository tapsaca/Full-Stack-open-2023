import axios from 'axios';
import { useEffect, useState } from 'react';
import Content from './components/Content';
import ErrorMessage from './components/ErrorMessage';
import diaryService from './services/diary';
import { DiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    diaryService
      .getAllEntries()
      .then((data) => {
        setEntries(data);
      })
  }, []);

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const addedEntry = await diaryService.createEntry({ date, weather, visibility, comment });
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      setErrorMessage('');
      setEntries(entries.concat(addedEntry));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setErrorMessage(`${error.response?.data}`);
      } else {
        setErrorMessage('Something went wrong.');
      }
    }
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <ErrorMessage message={errorMessage} />
      <form onSubmit={addEntry}>
        <div>
          Date <input value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          Visibility <input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
        </div>
        <div>
          Weather <input value={weather} onChange={(event) => setWeather(event.target.value)} />
        </div>
        <div>
          Comment <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>Add</button>
      </form>
      <Content entries={entries} />
    </div>
  );
};

export default App