
import { Outlet, useNavigate } from 'react-router-dom';
import { SlackOutlined, TranslationOutlined, BuildOutlined, ApiFilled, ContainerOutlined, AndroidOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Quill from 'quill';
const { Header, Content, Sider } = Layout;


// const editorConfiguration = {
//   toolbar: {
//     items: [
//     //   'heading', '|',
//     //   'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
//     //   'indent', 'outdent', '|',
//     //   'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'
//      ],
//     shouldNotGroupWhenFull: true
//   },
//   balloonToolbar: ['bold', 'italic', 'link']
// };
const itemThrees = [
  {
    key: '',
    icon: <AndroidOutlined />,
    title: '智能纠错'
  },
  {
    key: 'text-completion',
    icon: <ApiFilled />,

    title: '文本补全'
  },
  {
    key: 'chapter-generation',
    icon: <ContainerOutlined />,

    title: '篇章生成'
  },
  {
    key: 'text-polishing',
    icon: <BuildOutlined />,

    title: '文本润色'
  },
  {
    key: 'super-dictionary',
    icon: <TranslationOutlined />,

    title: '超级网典'
  },
  {
    key: 'shortcut-key',
    icon: <SlackOutlined />,

    title: '快捷键'
  },



]

function Edit() {
  const navigate = useNavigate()
  
  const [value, setValue] = useState('');
  const onClickMenu = (e) => {
    navigate(e.key, { replace: true })

    setCurrent(e.key);
  }
  return <>
    <Layout>
      <Sider theme='light' width={650} className="shadow-first" style={{ overflow: 'auto', height: '81.3vh', }} >

        {/*      
          <Form
           
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 22,
            }}
            
            layout="vertical"
            style={{
              maxWidth: 600,
            }}
          >
        
           
            <Form.Item label="文档名称">
              <Input />
            </Form.Item>
            <Form.Item label="基础模版类型">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
           
          
            <Form.Item label="文档简介">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button size='large' className='m-l-40 bg-color-second text-color-white' style={{width:'240px'}}>发布</Button>
            
            </Form.Item>
      
        
          </Form> */}
        <div className="editor" id='editor'>
          <ReactQuill theme="snow" value={value} onChange={setValue} />;
        </div>



      </Sider>
      <Content className='flex shadow-first '>

        <Menu
          mode="inline"
          items={itemThrees}
          style={{ height: '100%', borderRight: 'rgb(0,103,255) 0.5px solid', width: '70px' }}
          selectedKeys={['1']}
          inlineCollapsed={true}
          className='m-l-10 flex-c-center-center'
          onClick={onClickMenu}
        >
        </Menu>
        <div className="bg-color-white flex-1 b-rd-6">
          <Outlet></Outlet>
        </div>
      </Content>
    </Layout>


  </>

}
export default Edit;