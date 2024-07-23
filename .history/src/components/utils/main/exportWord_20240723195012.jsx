import React from 'react';
import mammoth from 'mammoth';
import { Button } from 'antd';
class WordExport extends React.Component {
  exportToWord = () => {

    const { editor } = this.props;
    mammoth.convertToHtml(editor.getHTML())
      .then((result) => {
        const blob = new Blob([result.value], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${storage.getItem("documentName")}.docx`;
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

