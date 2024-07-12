
import React, { useEffect, useState } from 'react'

import { Popover ,ColorPicker} from 'antd'
const presets = genPresets({
    grey,
    red,
    green,
    cyan,
  });
  

const MenuBar = ({ editor, selectColorComplete, contentPop, contentPopCopy, contentPopFour, contentPopThree, currentIcon, currentTextAlign, colorS, open, handleOpenChange, openCopy, handleOpenChangeCopy, openThree, handleOpenChangeThree, openFour, handleOpenChangeFour, applyLineHeight, handleFormatBrushClick, handleFormatBrushDoubleClick }) => {
    if (!editor) {
      return null;
    }
  
    return (
      <div className={`upper-frame bg-color-blue flex-center-center shadow`} style={{ height: '50px' }}>
        <div className='position-absolute' style={{ opacity: 0, left: 192 }}>
          <ColorPicker
            defaultValue='grey'
            onChangeComplete={selectColorComplete}
            styles={{ popupOverlayInner: { width: 480 } }}
            presets={presets}
            panelRender={customPanelRender}
          />
        </div>
        <IconFont type="icon-undo" onClick={() => editor.chain().focus().undo().run()} className='m-10 font-size-lg' />
        <IconFont type="icon-redo" onClick={() => editor.chain().focus().redo().run()} className='m-10 font-size-lg' />
        <IconFont
          type="icon-bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
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
        <Popover placement="bottom" content={contentPopCopy} trigger="click" open={openCopy} onOpenChange={handleOpenChangeCopy}>
          <IconFont type="icon-table" className='m-10 font-size-lg' />
        </Popover>
        <Popover placement="bottom" content={contentPopThree} trigger="click" open={openThree} onOpenChange={handleOpenChangeThree}>
          <IconFont type={`icon-text-align-${currentTextAlign}`} className='m-10 font-size-lg' />
        </Popover>
        <IconFont type="icon-painter" onClick={handleFormatBrushClick} onDoubleClick={handleFormatBrushDoubleClick} className='m-10 font-size-lg' />
        <IconFont type="icon-link-break" className='m-10 font-size-lg' />
        <IconFont
          type="icon-italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? `isActive m-10 font-size-lg` : 'm-10 font-size-lg'}
        />
        <IconFont type="icon-list-check" className='m-10 font-size-lg' />
        <IconFont type="icon-more-grid-big" onClick={applyLineHeight} className='m-10 font-size-lg' />
        <Popover placement="bottom" content={contentPopFour} trigger="click" open={openFour} onOpenChange={handleOpenChangeFour}>
          <IconFont type="icon-swatches-palette" className='m-10 font-size-lg' />
        </Popover>
        <IconFont type="icon-peach-flower" className='m-10 font-size-lg' />
        <IconFont type="icon-expand" className='m-10 font-size-lg' />
  
      </div>
    );
  };
export default MenuBar