
import { Outlet, useNavigate } from 'react-router-dom';

import { SlackOutlined, TranslationOutlined, BuildOutlined, ApiFilled, ContainerOutlined, AndroidOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
const { Header, Content, Sider } = Layout;

import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { ExportPdf } from '@ckeditor/ckeditor5-export-pdf';
import { ExportWord } from '@ckeditor/ckeditor5-export-word';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Font } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from '@ckeditor/ckeditor5-special-characters';
import { Style } from '@ckeditor/ckeditor5-style';
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
} from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { WordCount } from '@ckeditor/ckeditor5-word-count';

// 工具栏功能项配置
const editorConfig = {
  plugins: [
    SimpleUploadAdapter,
    BlockQuote,
    Bold,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    Indent,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    TableToolbar,
    Alignment,
    AutoImage,
    AutoLink,
    CloudServices,
    Code,
    CodeBlock,
    Essentials,
    ExportPdf,
    ExportWord,
    FindAndReplace,
    Font,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    ImageInsert,
    ImageResize,
    ImageUpload,
    IndentBlock,
    GeneralHtmlSupport,
    LinkImage,
    ListProperties,
    TodoList,
    Mention,
    PageBreak,
    PasteFromOffice,
    PictureEditing,
    RemoveFormat,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Style,
    Strikethrough,
    Subscript,
    Superscript,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TextTransformation,
    Underline,
    WordCount,
  ],
  toolbar: {
    items: [
      'undo',
      'redo',
      'heading',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      'bold',
      'underline',
      'italic',
      {
        label: 'Formatting',
        icon: '',
        items: [
          'strikethrough',
          'subscript',
          'superscript',
          'code',
          'horizontalLine',
          '|',
          'removeFormat',
        ],
      },
      'alignment',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
      'link',
      'insertImage',
      'insertTable',
      // '-', // break point
      {
        label: 'Others',
        icon: '',
        items: [
          'todoList',
          'specialCharacters',
          'pageBreak',
          {
            label: 'Insert',
            icon: '',
            items: ['highlight', 'blockQuote', 'mediaEmbed', 'codeBlock', 'htmlEmbed'],
          },
          'fontFamily',
          'exportPdf',
          'exportWord',
          'showBlocks',
          'findAndReplace',
          'selectAll',
          '|',
          'sourceEditing',
        ],
      },
    ],
    // shouldNotGroupWhenFull: true,
  },
  // language: 'zh-cn', // 需引入语言包，进行设置。
  htmlSupport: {
    allow: [
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true,
      },
    ],
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5',
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6',
      },
    ],
  },
  exportPdf: {
    stylesheets: ['EDITOR_STYLES'],
    fileName: 'export-pdf-demo.pdf',
    converterOptions: {
      format: 'Tabloid',
      margin_top: '20mm',
      margin_bottom: '20mm',
      margin_right: '24mm',
      margin_left: '24mm',
      page_orientation: 'portrait',
    },
  },
  exportWord: {
    stylesheets: ['EDITOR_STYLES'],
    fileName: 'export-word-demo.docx',
    converterOptions: {
      format: 'B4',
      margin_top: '20mm',
      margin_bottom: '20mm',
      margin_right: '12mm',
      margin_left: '12mm',
      page_orientation: 'portrait',
    },
  },
  // fontFamily: {
  //   options: [
  //     'default',
  //     'Blackoak Std',
  //     '宋体,SimSun',
  //     '新宋体,NSimSun',
  //     '黑体,SimHei',
  //     '微软雅黑,Microsoft YaHei',
  //     '楷体_GB2312,KaiTi_GB2312',
  //     '隶书,LiSu',
  //     '幼园,YouYuan',
  //     '华文细黑,STXihei',
  //     '细明体,MingLiU',
  //     '新细明体,PMingLiU',
  //   ],
  // },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22, 28],
    supportAllValues: true,
  },
  htmlEmbed: {
    showPreviews: true,
  },
  image: {
    styles: ['alignCenter', 'alignLeft', 'alignRight'],
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Original',
        value: null,
      },
      {
        name: 'resizeImage:50',
        label: '50%',
        value: '50',
      },
      {
        name: 'resizeImage:75',
        label: '75%',
        value: '75',
      },
    ],
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage',
      '|',
    ],
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  link: {
    decorators: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
  },
  mention: {
    feeds: [
      {
        marker: '@',
        feed: [
          '@apple',
          '@bears',
          '@brownie',
          '@cake',
          '@cake',
          '@candy',
          '@canes',
          '@chocolate',
          '@cookie',
          '@cotton',
          '@cream',
          '@cupcake',
          '@danish',
          '@donut',
          '@dragée',
          '@fruitcake',
          '@gingerbread',
          '@gummi',
          '@ice',
          '@jelly-o',
          '@liquorice',
          '@macaroon',
          '@marzipan',
          '@oat',
          '@pie',
          '@plum',
          '@pudding',
          '@sesame',
          '@snaps',
          '@soufflé',
          '@sugar',
          '@sweet',
          '@topping',
          '@wafer',
        ],
        minimumCharacters: 1,
      },
    ],
  },
  // 图片上传.简单的上传适配器 功能配置
  simpleUpload: {
    // The URL that the images are uploaded to.
    uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/',
    // https://ckeditor.com/docs/ckeditor5/latest/assets/img/malta.jpg
    // Enable the XMLHttpRequest.withCredentials property.
    withCredentials: true,
    // Headers sent along with the XMLHttpRequest to the upload server.
    headers: {
      'X-CSRF-TOKEN': 'CSRF-Token',
      Authorization: 'Bearer <JSON Web Token>',
    },
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
      'toggleTableCaption',
    ],
  },
  // licenseKey: "your-license-key",
};



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
        <div className="ckeditor">
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={html}
        // onReady={(editor) => {
        //   editor.setData(html);
        // }}
        onChange={(_event, editor) => {
          const data = editor.getData();
          handleSetHtml(data);
        }}
      />
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