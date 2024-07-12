
import { Radio,Input} from 'antd';   
import {KubernetesOutlined,KeyOutlined} from '@ant-design/icons'
import { Image, Upload } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  
function Extraction(){
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
     <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
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

}
export default Extraction;