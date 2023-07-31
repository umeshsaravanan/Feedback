import React from 'react';

const Bar = ({ value }) => {
  const barStyle = {
    width: `${(value / 5) * 100}%`,
    height: '20px',
    backgroundColor: 'blue',
  };

  return (
    <div style={{ width: '100%', height: '20px', border: '1px solid black' }}>
      <div style={barStyle}></div>
    </div>
  );
};

export default Bar;
