import React from 'react';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';

const WordExportComponent = ({ editor }) => {
    const handleExportToWord = () => {
       
        // Convert HTML to Word document
        mammoth.convertHtml({ value: editor.getHTML() })
          .then(({ data }) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            saveAs(blob, 'document.docx');
          })
          .catch((error) => {
            console.error('Error converting HTML to Word:', error);
          });
      };
  return (
    <button onClick={handleExportToWord}>Export to Word</button>
  );
};

export default WordExportComponent;
