import React from 'react';
import {AppstoreFilled,BellOutlined,EnvironmentFilled,ExceptionOutlined,FolderAddOutlined,QuestionCircleFilled,CodeSandboxOutlined,CoffeeOutlined, FireOutlined}  from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const { Header, Content, Sider } = Layout;
function getItem(key, icon,label) {
  return {
    key,
    icon,
    label,
  }
}
const itemOnes = [
  getItem('1',<AppstoreFilled/>,'首页推荐'),
  getItem('2',<BellOutlined/>,'最近文件'),
  getItem('3',<EnvironmentFilled/>,'我的收藏'),
  getItem('4',<ExceptionOutlined/>,'我的文件夹'),
  getItem('5',<FolderAddOutlined/>,'素材库'),
  getItem('6',<QuestionCircleFilled/>,'回收站')

 

]
const itemTwos = [
  getItem('7',< FireOutlined/>,'会员中心'),
  getItem('8',<CodeSandboxOutlined/>,'会员工具'),
  getItem('9s',<CoffeeOutlined/>,'会员福利')

]
const items=[
  {
    type: 'group',
    label: '概览',
    children: itemOnes,
  }, 
  {
    type: 'group',
    label: '会员',
    children:itemTwos,
  },
]



const Index = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <Layout >
      <Header className='p-16'  style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between',backgroundColor:'white' }} >
      
       <img src="/img/logo.png" style={{width:'150px',height:'30px'}}/>
       <img src="/img/test1.jpg" style={{width:'50px',height:'30px',borderRadius:'50%'}}/>

        
        
      </Header>
      <Layout>
        <Sider theme='light' width={200} style={{ overflow: 'auto', height: '91.5vh',  }}>
        <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={['1']}
          >
           
           
           
          
         
          </Menu>
          
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>

          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: '会员中心' }]} />
  
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'initial',
              borderRadius: borderRadiusLG,
            }}
          >
            <Layout>
              <Sider theme='light' width={350} style={{ overflow: 'auto', height: '75vh', }} >
      
     
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            disabled={componentDisabled}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
              <Checkbox>Checkbox</Checkbox>
            </Form.Item>
            <Form.Item label="Radio">
              <Radio.Group>
                <Radio value="apple"> Apple </Radio>
                <Radio value="pear"> Pear </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <Form.Item label="Select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [
                      {
                        title: 'Bamboo',
                        value: 'bamboo',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Cascader">
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker />
            </Form.Item>
            <Form.Item label="RangePicker">
              <RangePicker />
            </Form.Item>
            <Form.Item label="InputNumber">
              <InputNumber />
            </Form.Item>
            <Form.Item label="TextArea">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload action="/upload.do" listType="picture-card">
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
              </Upload>
            </Form.Item>
            <Form.Item label="Button">
              <Button>Button</Button>
            </Form.Item>
            <Form.Item label="Slider">
              <Slider />
            </Form.Item>
            <Form.Item label="ColorPicker">
              <ColorPicker />
            </Form.Item>
          </Form>
              </Sider>
              <Content>
                <CKEditor
                                    editor={ ClassicEditor }
                                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                                    onReady={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event ) => {
                                        console.log( event );
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />

              </Content>
            </Layout>
        
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default  Index;