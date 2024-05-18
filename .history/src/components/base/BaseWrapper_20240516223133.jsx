import React from 'react';

function BaseWrapper({ children }) {
  return (<> <div className="p-10 h-full">
      {children}
    </div>
  </>
   
  );
}

export default BaseWrapper;
