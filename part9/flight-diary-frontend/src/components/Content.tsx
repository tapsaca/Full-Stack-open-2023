import Entry from './Entry';
import { DiaryEntry } from '../types';

interface ContentProps {
  entries: DiaryEntry[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Content;