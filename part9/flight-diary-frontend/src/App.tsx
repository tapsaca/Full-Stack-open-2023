import { useEffect, useState } from 'react';
import Content from './components/Content';
import diaryService from './services/diary';
import { DiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService
      .getAllEntries()
      .then((data) => {
        setEntries(data);
      })
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>
      <Content entries={entries} />
    </div>
  );
};

export default App