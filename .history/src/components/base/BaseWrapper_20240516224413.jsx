import React from 'react';

function ChildComponent({ className, children }) {
  return (
    <div className={`child-component ${className}`} >
      {children}
    </div>
  );
}

export default ChildComponent;
