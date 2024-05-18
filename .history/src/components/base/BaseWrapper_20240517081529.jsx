import React from 'react';

function BaseWrapper(props) {
  return (
    <div className={`child-component ${props.className}`} >
      {props.children}
    </div>
  );
}

export default BaseWrapper;
