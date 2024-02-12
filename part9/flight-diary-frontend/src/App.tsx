import { useEffect, useState } from 'react';
import Content from './components/Content';
import diaryService from './services/diary';
import { DiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
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
    const addedEntry = await diaryService.createEntry({ date, weather, visibility, comment });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
    setEntries(entries.concat(addedEntry));
  };

  return (
    <div>
      <h1>Flight Diary</h1>
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