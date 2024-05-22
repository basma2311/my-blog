import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index < rating ? 'gold' : '#ddd'} 
    style={{fontSize:'0.7rem'}}
    />
  ));

  return <div>{stars}</div>;
};

export default StarRating;
