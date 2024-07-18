
import React, { useEffect, useState } from 'react'
import { red, grey, green, cyan } from '@ant-design/colors';
import { Popover, ColorPicker, Row, Col, Divider, Select } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import classes from "./editor.module.scss";
import { useSelector } from 'react-redux';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
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


const MenuBar = ({ handleSizeChange, handleFontChange, editor, selectColorComplete, contentPop, contentPopCopy, contentPopFour, contentPopThree, currentIcon, currentTextAlign, colorS, open, handleOpenChange, openCopy, handleOpenChangeCopy, openThree, handleOpenChangeThree, openFour, handleOpenChangeFour, applyLineHeight, handleFormatBrushClick, handleFormatBrushDoubleClick }) => {


  if (!editor) {
    return null;
  }

  return (
    <div className={`upper-frame bg-color-blue flex-center-center shadow`} style={{ height: '8%' }}>
      <div className='position-absolute' style={{  left: 192 }}>
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
      <IconFont type="icon-undo" onClick={() => editor.chain().focus().undo().run()} className='m-10 font-size-lg' />
      <IconFont type="icon-redo" onClick={() => editor.chain().focus().redo().run()} className='m-10 font-size-lg' />
      <IconFont
        type="icon-bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? `isActive m-10 font-size-lg` : 'm-10 font-size-lg'}
      />

      <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
      <IconFont
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? `isActive m-10 font-size-lg` : 'm-10 font-size-lg'}
        type="icon-code-inline"
      />
      <Popover placement="bottom" content={contentPop} trigger="click" open={open} onOpenChange={handleOpenChange}>
        <IconFont type={`icon-${currentIcon}`} className='m-10 font-size-lg' />
      </Popover>
      <IconFont
        type="icon-strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? `isActive m-10 font-size-lg` : 'm-10 font-size-lg'}
      />
       <IconFont
        type="icon-italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? `isActive m-10 font-size-lg` : 'm-10 font-size-lg'}
      />
      <IconFont type="icon-link-break" className='m-10 font-size-lg' />
      <Popover placement="bottom" content={contentPopThree} trigger="click" open={openThree} onOpenChange={handleOpenChangeThree}>
        <IconFont type={`icon-text-align-${currentTextAlign}`} className='m-10 font-size-lg' />
      </Popover>
      <IconFont type="icon-list-check" className='m-10 font-size-lg' />
      <IconFont type="icon-list-check" className='m-10 font-size-lg' />

      <Popover placement="bottom" content={contentPopCopy} trigger="click" open={openCopy} onOpenChange={handleOpenChangeCopy}>
        <IconFont type="icon-table" className='m-10 font-size-lg' />
      </Popover>
     
      <IconFont type="icon-painter" onClick={handleFormatBrushClick} onDoubleClick={handleFormatBrushDoubleClick} className='m-10 font-size-lg' />
     
      <IconFont type="icon-more-grid-big" onClick={applyLineHeight} className='m-10 font-size-lg' />
      <Popover placement="bottom" content={contentPopFour} trigger="click" open={openFour} onOpenChange={handleOpenChangeFour}>
        <IconFont type="icon-swatches-palette" className='m-10 font-size-lg' />
      </Popover>
      <IconFont type="icon-peach-flower" className='m-10 font-size-lg' />
      <IconFont type="icon-jurassic_chart" className={`m-10 p-10 font-size-lg`} />
      <IconFont type="icon-expand" className='m-10 font-size-lg' />

    </div>
  );
};
export default MenuBar