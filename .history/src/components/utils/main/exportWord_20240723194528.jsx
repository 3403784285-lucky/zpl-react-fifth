import React from 'react';
import mammoth from 'mammoth';

class WordExport extends React.Component {
  exportToWord = () => {
    const { content } = this.props;
    mammoth.convertToHtml(content)
      .then((result) => {
        const blob = new Blob([result.value], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported-document.docx';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('导出失败', error);
      });
  }

  render() {
    return (
      <div>
      
        <Button type='primary' onClick={this.exportToWord}>导出至Word</Button>
      </div>
    );
  }
}

export default WordExport;

