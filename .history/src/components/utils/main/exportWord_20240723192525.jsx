import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import mammoth from 'mammoth';
import fileFun from '../../../api/user/file';
import { useStorage } from 'web-localstorage-plus';

const ExportToWordButton = ({ editor, documentId }) => {
    const storage=useStorage()
    const [documentName, setDocumentName] = useState('');

    useEffect(() => {
        const fetchDocumentName = async (documentId) => {
        
            
                    setDocumentName(response.data.name);
               
        };

        fetchDocumentName(documentId);
    }, [documentId]);

    const handleExportToWord = () => {
        const htmlContent = editor.getHTML(); // 获取编辑器的 HTML 内容

        // 使用 mammoth 将 HTML 转换为 Word 文档
        mammoth.convertToBlob(htmlContent)
            .then(blob => {
                // 下载生成的 Word 文档
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = `${documentName}.docx`; // 设置下载文件名
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            })
            .catch(error => {
                console.error('Error exporting to Word:', error);
            });
    };

    return (
        <Button type="primary" onClick={handleExportToWord}>
            导出为 Word 文档
        </Button>
    );
};
export default ExportToWordButton