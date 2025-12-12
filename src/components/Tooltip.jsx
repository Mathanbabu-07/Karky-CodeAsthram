import React from 'react';
import './Tooltip.css';

const Tooltip = ({ text, visible, position }) => {
  // We'll use a class to control visibility for smoother CSS transitions
  const tooltipClass = `custom-tooltip ${visible ? 'visible' : ''}`;

  const style = {
    top: position.top,
    left: position.left,
  };

  return (
    <div className={tooltipClass} style={style}>
      {text}
    </div>
  );
};

export default Tooltip;