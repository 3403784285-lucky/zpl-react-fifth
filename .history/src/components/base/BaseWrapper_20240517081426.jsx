import React from 'react';

function ChildComponent(props) {
  return (
    <div className={`child-component ${props.className}`} >
      {children}
    </div>
  );
}

export default ChildComponent;
