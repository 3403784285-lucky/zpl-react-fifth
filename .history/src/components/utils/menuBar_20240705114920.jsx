import React, { useEffect, useState } from 'react'
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
  
const MenuBar = ({editor}) => {
    const [lineHeight, setLineHeight] = useState('2')
    // const [pdfContent, setPdfContent] = useState('');
    const [formatToApply, setFormatToApply] = useState(null);
    const [colorS, setColorS] = useState('black');
    const [currentIcon, setCurrentIcon] = useState('heading1');
    const [open, setOpen] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);
    console.log("经过")
    if (!editor) {
      console.log("根本没有")
      return null
    }
    const handleOpenChange = (newOpen) => {

        setOpen(newOpen);
    
    
      };
      const handleOpenChangeCopy = (newOpenCopy) => {
    
        setOpenCopy(newOpenCopy);
    
      };
      
  const applyLineHeight = () => {
    console.log(lineHeight)
    editor.chain().focus().setLineHeight(lineHeight).run()
  }
    // const handleFileChange = async (info) => {
    //   const file = info.file.originFileObj || info.file;

    //   if (file) {
    //     try {
    //       const arrayBuffer = await file.arrayBuffer();
    //       const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    //       console.log(html); // 确认生成的 HTML 内容

    //       editor.commands.setContent(html, {
    //         parseOptions: {
    //           preserveWhitespace: 'full',
    //         },
    //       });




    //       console.log('Document uploaded successfully');
    //     } catch (error) {
    //       console.error('Failed to render document');
    //       console.error(error);
    //     }
    //   }
    // };



    return (
      <>
        <div className={`upper-frame bg-color-blue flex-center-center shadow`} style={{ height: '50px' }}>
          <div className='position-absolute' style={{ opacity: 0, left: 192 }}>
            <ColorPicker
              defaultValue='grey'
              onChangeComplete={(colorO) => selectColorComplete(colorO)}
              styles={{
                popupOverlayInner: {
                  width: 480,

                },

              }}
              presets={presets}
              panelRender={customPanelRender}
            /></div>
          <IconFont type="icon-undo" onClick={() => editor.chain().focus().redo().run()} className='m-10 font-size-lg' />
          <IconFont type="icon-redo" onClick={() => editor.chain().focus().undo().run()} className='m-10 font-size-lg' />
          <IconFont type="icon-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
          <IconFont onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} type="icon-code-inline" />
          <Popover placement="bottom" content={contentPop} trigger="click"
            open={open}
            onOpenChange={handleOpenChange}>
            <IconFont type={`icon-${currentIcon}`} className='m-10 font-size-lg' />
          </Popover>
          <IconFont type="icon-strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          {/*          
        <Popover placement="bottom"
          content={<>
         <IconFont type="icon-table-add" className='m-10 font-size-lg'onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
         <IconFont type="icon-table-remove" className='m-10 font-size-lg' onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
         <IconFont type="icon-add-column" className='m-10 font-size-lg' onClick={() => editor.chain().focus().addColumnAfter().run()} />
         <IconFont type="icon-delete-column" className='m-10 font-size-lg' onClick={() => editor.chain().focus().deleteColumn().run()} />
         <IconFont type="icon-add-row" className='m-10 font-size-lg' onClick={() => editor.chain().focus().addRowAfter().run()} />
         <IconFont type="icon-delete-row" className='m-10 font-size-lg' onClick={editor.chain().focus().deleteRow().run()} />
        
          </>}
          trigger="click"
          open={openCopy}
          onOpenChange={handleOpenChangeCopy}
        >
         <IconFont type="icon-table" className='m-10 font-size-lg'  />
        </Popover> */}
          <IconFont type="icon-text-align-left" className='m-10 font-size-lg' />
          {/* 格式刷按钮 */}
          <IconFont type="icon-painter" onClick={applyFormat} className='m-10 font-size-lg' />
          <IconFont type="icon-link-break" className='m-10 font-size-lg' />
          <IconFont type="icon-italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          <IconFont type="icon-more-grid-big" onClick={applyLineHeight} className='m-10 font-size-lg' />
          <IconFont type="icon-swatches-palette" className='m-10 font-size-lg' />


          {/* <Upload beforeUpload={() => false} onChange={handleFileChange}>
          <Button>Upload Word Document</Button>
        </Upload> */}
          {/* <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
      <Button>上传 PDF</Button>
    </Upload> */}
        </div>
      </>
    )
  }