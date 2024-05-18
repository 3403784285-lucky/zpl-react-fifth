import React from 'react';

function BaseWrapper({ children }) {
  return (<div> <div className="p-10 h-full">
      {children}
    </div>
  </div>
   
  );
}

export default BaseWrapper;
