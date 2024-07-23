
import React, { useEffect, useState } from 'react'
import { red, grey, green, cyan } from '@ant-design/colors';
import { Popover, ColorPicker, Row, Col, Modal, Divider, Select, Tooltip, Input } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import classes from "./editor.module.scss";
import { useSelector } from 'react-redux';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_zhfogepo3a8.js'
  ],
});
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));
const presets = genPresets({
  grey,
  red,
  green,
  cyan,
});
const handleMarkdownChange = () => {
  const transformer = new Transformer();

  // 1. 转换 makrdown
  const { root, features } = transformer.transform(content);

  // 2. 获取 assets 数据// either get assets required by used features
  const { styles, scripts } = transformer.getUsedAssets(features);

  // 清空markmap容器
  const container = document.getElementById('markmap-container');
  container.innerHTML = '';

  // 加载样式和脚本
  if (styles) loadCSS(styles);
  if (scripts) loadJS(scripts, { getMarkmap: () => markmap });

  // 创建并渲染markmap
  Markmap.create(container, null, root);
};


const customPanelRender = (_, { components: { Picker, Presets } }) => (
  <Row className='colorPickerFrame' justify="space-between" wrap={false}>
    <Col span={12}>
      <Presets />
    </Col>
    <Divider
      type="vertical"
      style={{
        height: 'auto',
      }}
    />
    <Col flex="auto">
      <Picker />
    </Col>
  </Row>
);

const icons=['x','xox','xx']
const MenuBar = ({ handleSizeChange, emptyFormat, fontSize, fontFamily, shrink, changeShrink, handleFontChange, editor, selectColorComplete, contentPop, contentPopCopy, contentPopThree, currentIcon, currentTextAlign, colorS, open, handleOpenChange, openCopy, handleOpenChangeCopy, openThree, handleOpenChangeThree, openFour, handleOpenChangeFour, applyLineHeight, handleFormatBrushClick, handleFormatBrushDoubleClick }) => {
const [currentIconCopy,setCurrentIconCopy]=useState('x')
  const [arrow, setArrow] = useState('Show');
  const [modal, contextHolder] = Modal.useModal();
  let url = ''
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  const handleUrlChange = (e) => {
    console.log(e.target.value)
    url = e.target.value
  }
  const hide = (index) => {
    console.log("选择开关")
    console.log(index)
    if(index==0){
      editor.chain().focus().setLineHeight(1).run()

    }else if(index==1){
      editor.chain().focus().setLineHeight(1.5).run()
      
    }else{
      editor.chain().focus().setLineHeight(2).run()

    }
    setCurrentIconCopy(icons[index])
    setOpen(false);
  };
  const addImage = useCallback(() => {


    modal.confirm({
      title: '请插入url',
      icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
      content: <Input onChange={(e) => handleUrlChange(e)} />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      }
    });



  }, [editor])


  if (!editor) {
    return null;
  }


  return (
    <div className={`upper-frame bg-color-blue flex-center-center shadow`} style={{ height: '8%' }}>
      {contextHolder}
      <div className='position-absolute' style={{ opacity: 0, left: 785 }}>
        <ColorPicker
          defaultValue='grey'
          onChangeComplete={selectColorComplete}
          styles={{ popupOverlayInner: { width: 480 } }}
          presets={presets}
          panelRender={customPanelRender}
        />
      </div>
      <Select
        showSearch
        placeholder="字体类型"
        optionFilterProp="label"
        className='m-x-10'
        value={fontFamily}
        style={{ width: 100 }}
        onChange={handleFontChange}
        options={[
          {
            "value": "Inter",
            "label": "Inter"
          },
          {
            "value": "Comic Sans MS",
            "label": "Comic Sans MS"
          },
          {
            "value": "Comic Sans",
            "label": "Comic Sans"
          },
          {
            "value": "serif",
            "label": "serif"
          },
          {
            "value": "monospace",
            "label": "monospace"
          },
          {
            "value": "cursive",
            "label": "cursive"
          }
        ]
        }
      />
      <Select
        showSearch
        placeholder="字号大小"
        optionFilterProp="label"
        style={{ width: 100 }}
        onChange={handleSizeChange}
        value={fontSize}
        options={[
          {
            "value": "12",
            "label": "12"
          },
          {
            "value": "14",
            "label": "14"
          },
          {
            "value": "16",
            "label": "16"
          },
          {
            "value": "18",
            "label": "18"
          },
          {
            "value": "20",
            "label": "20"
          },
          {
            "value": "24",
            "label": "24"
          },
          {
            "value": "28",
            "label": "28"
          },
          {
            "value": "32",
            "label": "32"
          },
          {
            "value": "36",
            "label": "36"
          },
          {
            "value": "40",
            "label": "40"
          }
        ]
        }
      />
      <Tooltip placement="bottom" title={"行距"} arrow={mergedArrow}>
        <Popover placement="bottom" content={icons.map((icon, index) => (
          <IconFont type={`icon-${icon}`} key={icon} onClick={() => hide(index)} className={`m-10 font-size-lg`}>
          </IconFont>
        ))} trigger="click" open={openH} onOpenChange={handleOpenChangeH}>
          <IconFont type="icon-more-grid-big" onClick={applyLineHeight} className='m-10 font-size-lg' />

        </Popover>
      </Tooltip>
      <Tooltip placement="bottom" title={"撤回"} arrow={mergedArrow}>
        <IconFont type="icon-undo" onClick={() => editor.chain().focus().undo().run()} className='m-10 font-size-lg' />

      </Tooltip>
      <Tooltip placement="bottom" title={"取消撤回"} arrow={mergedArrow}>

        <IconFont type="icon-redo" onClick={() => editor.chain().focus().redo().run()} className='m-10 font-size-lg' />
      </Tooltip>
      <Tooltip placement="bottom" title={"格式刷(用法:选中要复制的格式点击格式刷，显示选中后，再选中另一处要应用的文本点击格式刷即可)"} arrow={mergedArrow}>

        <IconFont type="icon-painter" onClick={handleFormatBrushClick} onDoubleClick={handleFormatBrushDoubleClick} className='m-10 font-size-lg' />
      </Tooltip>
      <Tooltip placement="bottom" title={"橡皮擦"} arrow={mergedArrow}>
        <IconFont type="icon-clean" className='m-4 p-10 b-rd-4'

          onClick={emptyFormat} />
      </Tooltip>


      <Tooltip placement="bottom" title={"加粗"} arrow={mergedArrow}>

        <IconFont
          type="icon-bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"字体颜色"} arrow={mergedArrow}>
        <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
      </Tooltip>
      <Tooltip placement="bottom" title={"代码块"} arrow={mergedArrow}>

        <IconFont
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}
          type="icon-code-inline"
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"标题级别"} arrow={mergedArrow}>

        <Popover placement="bottom" content={contentPop} trigger="click" open={open} onOpenChange={handleOpenChange}>
          <IconFont type={`icon-${currentIcon}`} className='m-10 font-size-lg' />
        </Popover>
      </Tooltip>
      <Tooltip placement="bottom" title={"删除线"} arrow={mergedArrow}>

        <IconFont
          type="icon-strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}

        />
      </Tooltip>
      <Tooltip placement="bottom" title={"斜体"} arrow={mergedArrow}>

        <IconFont
          type="icon-italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}

        />
      </Tooltip>
      <Tooltip placement="bottom" title={"链接"} arrow={mergedArrow}>

        <IconFont type="icon-link-break"
          className={editor.isActive('link') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}

        />
      </Tooltip>
      <Tooltip placement="bottom" title={"高亮"} arrow={mergedArrow}>

        <IconFont type="icon-bg-color"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}

        />
      </Tooltip>
      <Tooltip placement="bottom" title={"对齐"} arrow={mergedArrow}>

        <Popover placement="bottom" content={contentPopThree} trigger="click" open={openThree} onOpenChange={handleOpenChangeThree}>
          <IconFont type={`icon-text-align-${currentTextAlign}`} className='m-10 font-size-lg' />
        </Popover>
      </Tooltip>
      <Tooltip placement="bottom" title={"有序列表"} arrow={mergedArrow}>

        <IconFont type="icon-list-order"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}

        />
      </Tooltip>
      <Tooltip placement="bottom" title={"无序列表"} arrow={mergedArrow}>

        <IconFont type="icon-list-disorder"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? `${classes.isActive} m-4 p-10 b-rd-4 font-size-lg` : 'm-4 p-10 b-rd-4 font-size-lg'}

        />
      </Tooltip>
      <Tooltip placement="bottom" title={"表格"} arrow={mergedArrow}>

        <Popover placement="bottom" content={contentPopCopy} trigger="click" open={openCopy} onOpenChange={handleOpenChangeCopy}>
          <IconFont type="icon-table" className='m-10 font-size-lg' />
        </Popover>
      </Tooltip>
      <Tooltip placement="bottom" title={"图像"} onClick={addImage} arrow={mergedArrow}>

        <IconFont type="icon-image" className='m-10 font-size-lg' onClick={() => editor.chain().focus().setTextAlign('right').run()} />
      </Tooltip>



      <Tooltip placement="bottom" title={"ai智能"} arrow={mergedArrow}>


        <IconFont type="icon-ai" onClick={changeShrink} className={`m-4 p-10 b-rd-4 font-size-lg ${shrink ? '' : `${classes.isActive}`}`} />
      </Tooltip>

    </div>
  );
};
export default MenuBar