import React from 'react';
import mammoth from 'mammoth';
import { Button } from 'antd';
class WordExport extends React.Component {
    exportToWord = () => {

        const { editor } = this.props;
        const htmlString = editor.getHTML();
    const arrayBuffer = new TextEncoder().encode(htmlString).buffer;
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer})
            .then((result) => {
                const blob = new Blob([result.value], { type: 'application/msword' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                console.log("报错+1")
                a.download = '/exported-document.docx';
                console.log("报错+2")

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

