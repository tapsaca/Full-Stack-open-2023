import { CoursePart } from '../types';

const Part = ({ part } : { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <div><i>{part.description}</i></div>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <div>Project exercises {part.groupProjectCount}</div>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <div><i>{part.description}</i></div>
          <div>Background material at {part.backgroundMaterial}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <div><i>{part.description}</i></div>
          <div>Required skills: {part.requirements.map((requirement) => requirement).join(', ')}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part