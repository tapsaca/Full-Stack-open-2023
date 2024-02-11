import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  switch (props.part.kind) {
    case 'basic':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <div><i>{props.part.description}</i></div>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <div>Project exercises {props.part.groupProjectCount}</div>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <div><i>{props.part.description}</i></div>
          <div>Background material at {props.part.backgroundMaterial}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <div><i>{props.part.description}</i></div>
          <div>Required skills: {props.part.requirements.map((requirement) => requirement).join(', ')}</div>
        </div>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part