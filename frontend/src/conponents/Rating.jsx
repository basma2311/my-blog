// import { FaStar } from "react-icons/fa6";


// const Stars = ({rating, setRating}) => {
//   const handleClick = (newRating) => {
//       setRating(newRating)
//   }
//   const [hoveredRating, setHoveredRating] = useState(0);

//   return (
//       <>
//       {
          
//           [1,2,3,4,5].map((oneStar, i) => {
//               return (
          
//                   <FaStar span key={i}
//                   onClick={()=> handleClick(oneStar)}
//                   style={{cursor: 'pointer', color: oneStar <= rating ? 'gold' : '#EEEDEB'}}/>
                  
//               )
//           })
//       }
//       </>
//   );
// };

// export default Stars;

import  { useState } from 'react';
import { FaStar } from "react-icons/fa6";

const Stars = ({ rating, setRating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (hoveredStar) => {
    setHoveredRating(hoveredStar);
  };

  const handleClick = (selectedStar) => {
    setRating(selectedStar);
  };

  return (
    <>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <FaStar
          key={index}
          onMouseEnter={() => handleMouseEnter(star)}
          onClick={() => handleClick(star)}
          style={{
            cursor: 'pointer',
            color: (hoveredRating >= star || rating >= star) ? 'gold' : '#EEEDEB'
            
          }}
        />
      ))}
    </>
  );
};

export default Stars;