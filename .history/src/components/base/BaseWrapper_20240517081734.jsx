import React from 'react';

function BaseWrapper(props) {
  return (
    <div className={`p-10 h-full ${props.className}`} >
      {props.children}
    </div>
  );
}

export default BaseWrapper;
