
import { Radio, Input } from 'antd';
import { PlusOutlined, } from '@ant-design/icons'
import { Image, Upload,Card } from 'antd';
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

    const [fileList, setFileList] = useState([


    ]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
        <div className="first-frame flex  m-b-30" style={{ justifyContent: 'space-between', height: '20px' }}>
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
        <div className="tip-correction m-t-20 m-b-0" ><strong>提取结果</strong><div className='flex-c-center-center'></div>
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

    </div></div>
        

}
export default Extraction;