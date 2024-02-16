import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
  gender: string;
}

const GenderIcon = ({ gender }: Props) => {
  if (gender === 'female') {
    return <FemaleIcon />;
  } else if (gender === 'male') {
    return <MaleIcon />;
  }
  return null;
};

export default GenderIcon;