import React from 'react';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';

const WordExportComponent = ({ editor }) => {
  const handleExportToWord = async () => {
    // Convert HTML content to Word document
    const { data } = await mammoth.convertHtml(editor.getHTML());
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    // Save the document
    saveAs(blob, 'document.docx');
  };

  return (
    <button onClick={handleExportToWord}>Export to Word</button>
  );
};

export default WordExportComponent;
