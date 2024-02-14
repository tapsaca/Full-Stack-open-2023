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
          Date <input type='date' value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <fieldset>
            <legend>Visibility:</legend>
            <input type='radio' name='visibility' id='great' onChange={() => setVisibility('great')} />
            <label htmlFor='great'>Great</label>
            <input type='radio' name='visibility' id='good' onChange={() => setVisibility('good')} />
            <label htmlFor='good'>Good</label>
            <input type='radio' name='visibility' id='ok' onChange={() => setVisibility('ok')} />
            <label htmlFor='ok'>Ok</label>
            <input type='radio' name='visibility' id='poor' onChange={() => setVisibility('poor')} />
            <label htmlFor='poor'>Poor</label>
          </fieldset>
        </div>
        <div>
        <fieldset>
            <legend>Weather:</legend>
            <input type='radio' name='weather' id='sunny' onChange={() => setWeather('sunny')} />
            <label htmlFor='sunny'>Sunny</label>
            <input type='radio' name='weather' id='rainy' onChange={() => setWeather('rainy')} />
            <label htmlFor='rainy'>Rainy</label>
            <input type='radio' name='weather' id='cloudy' onChange={() => setWeather('cloudy')} />
            <label htmlFor='cloudy'>Cloudy</label>
            <input type='radio' name='weather' id='stormy' onChange={() => setWeather('stormy')} />
            <label htmlFor='stormy'>Stormy</label>
            <input type='radio' name='weather' id='windy' onChange={() => setWeather('windy')} />
            <label htmlFor='windy'>Windy</label>
          </fieldset>
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