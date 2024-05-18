import React from 'react';

function BaseWrapper({ children }) {
  return ( <div className={`p-10 h-full ${className}`} {...props}>
      {children}
    </div>
 
   
  );
}

export default BaseWrapper;
