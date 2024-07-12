
import { Radio, Input } from 'antd';
import { PlusOutlined, } from '@ant-design/icons'
import { Image, Upload, Card } from 'antd';
import aiFun from '../../api/user/ai';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function Extraction() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [fileList, setFileList] = useState([


    ]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = async({ fileList: newFileList }) => {
        {
            if (newFileList.length === 0) {
                setExtractedText('');
                return;
            }

            const file = newFileList[0].originFileObj;
            const base64String = await getBase64(file);

            // Send request to server
            
            const response = await aiFun.ocr({ imageBase64: base64String });
            setExtractedText(response.data.text); // Assuming response has a 'data' object with 'text' property
           

            setFileList(newFileList);
        };
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    return <div className='p-30'>
        <div className="first-frame m-b-30" style={{ height: '20px' }}>
            <div className="tip-correction " ><strong>信息提取</strong></div>
        </div>
        <div className='flex-c-center-center'>

            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>

        <div className="tip-correction m-t-20" ><strong>提取结果</strong>
            <div className='flex-c-center-center'>
                <Card className='m-t-20 shadow'
                    hoverable

                    style={{
                        width: 370,


                    }}
                // cover={<img alt="example" src="/img/nodata.png" />}
                >

                    {<div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                        : 当然，这非常重要，做项目，还可以，但是有时候还是浪费了不少时间。另外心情非常紧张，应该在前一段时间把核心技术讨论掉，否则后面时间就没了，就过去了。
                    </div>}


                </Card>

            </div>


        </div>
    </div>



}
export default Extraction;