import React from 'react';

const Car = ({ car }) => {
  return (
    <div>
      {car.name} : {car.registrationNumber}
    </div>
  );
};

export default Car;
