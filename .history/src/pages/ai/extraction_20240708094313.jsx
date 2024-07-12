
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

    return <div className='p-30'>
    
    </div>

}
export default Extraction;