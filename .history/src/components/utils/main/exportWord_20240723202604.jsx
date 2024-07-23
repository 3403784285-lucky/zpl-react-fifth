// WordExportComponent.jsx
import React from 'react';
import { saveAs } from 'file-saver';
import htmlToDocx from 'html-docx-js';

const WordExportComponent = ({ htmlContent }) => {
  const handleExportToWord = () => {
    // Convert HTML content to Word document
    const docx = htmlToDocx(htmlContent);

    // Save the document
    const blob = new Blob([docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, 'document.docx');
  };

  return (
    <button onClick={handleExportToWord}>Export to Word</button>
  );
};

export default WordExportComponent;