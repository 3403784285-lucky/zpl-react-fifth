import Tiptap from "../../../components/utils/edit/editor"
import { ToC } from '../../../components/utils/edit/ToC'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { TableOfContents, getHierarchicalIndexes } from "@tiptap-pro/extension-table-of-contents";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Table } from '@tiptap/extension-table'
import { Markdown } from 'tiptap-markdown'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import StarterKit from '@tiptap/starter-kit'
import { Highlight } from '@tiptap/extension-highlight'
import { LineHeight } from "../../../components/utils/edit/lineHeight";
import { TextAlign } from '@tiptap/extension-text-align'
import { useEditor } from "@tiptap/react";
import { decrypt } from "../../../utils/code";
import { useStorage } from "web-localstorage-plus";
import userFun from "../../../api/user/user";
import FontFamily from "@tiptap/extension-font-family";
import { useMemo } from 'react';
import Collaboration from '@tiptap/extension-collaboration';
import { WebsocketProvider } from 'y-websocket';
import Image from "@tiptap/extension-image";
import * as Y from 'yjs';
const MemorizedToC = memo(ToC)
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontSize } from "../../../components/utils/edit/fontSizeExtension";
import FileHandler from '@tiptap-pro/extension-file-handler'
import EchartsNode from '../../../components/utils/edit/EchartsNode'

const getRandomName = () => {
  const names = ['廖梓行', '刘洋', '张培灵']
  return names[Math.floor(Math.random() * names.length)]
}
const getRandomColor = () => {
  const colors = ['#ff5733', '#33ff57', '#3357ff']
  return colors[Math.floor(Math.random() * colors.length)]
}

function BigEditor() {
  const location = useLocation()
  const scrollContainerRef = useRef();
  const [user, setUser] = useState()
  const [room, setRoom] = useState(160)
  const [items, setItems] = useState([])
  const [documentId, setDocumentId] = useState(0)
  const [contentCopy, setContentCopy] = useState(`# 人工智能在医疗影像诊断中的应用与挑战

## 摘要

* 简要介绍人工智能在医疗影像诊断中的研究背景与意义
* 论文研究的主要内容、方法、结论及创新点

## 关键词

* 人工智能；医疗影像诊断；深度学习；挑战；应用

## 第一章 引言

### 1.1 研究背景

* 阐述医疗影像诊断的重要性和传统方法的局限性
* 人工智能技术的发展及其在医疗影像诊断中的潜力

### 1.2 研究意义

* 论述人工智能在医疗影像诊断中的应用对医疗行业的影响
* 国内外研究现状与发展趋势

### 1.3 研究内容与方法

* 论文的主要研究内容概述
* 研究所采用的方法和技术路线

### 1.4 论文结构安排

* 简要介绍论文的章节安排和逻辑结构

## 第二章 人工智能与医疗影像诊断概述

### 2.1 人工智能基础

* 人工智能的定义、发展历程及核心技术
* 深度学习在人工智能中的地位与应用

### 2.2 医疗影像诊断技术

* 医疗影像诊断的基本原理与常用技术
* 医疗影像数据的特点与处理方法

### 2.3 人工智能与医疗影像诊断的结合

* 人工智能在医疗影像诊断中的应用模式
* 人工智能在医疗影像诊断中的优势与挑战

## 第三章 人工智能在医疗影像诊断中的应用

### 3.1 图像识别与分类

* 深度学习在医疗影像图像识别中的应用
* 分类算法的设计与实现
* 应用案例与分析

### 3.2 疾病检测与预测

* 基于人工智能的疾病检测方法
* 疾病预测模型的构建与验证
* 应用案例与分析

### 3.3 辅助诊断与决策支持

* 人工智能在辅助诊断中的作用
* 决策支持系统的设计与实现
* 应用案例与分析

## 第四章 人工智能在医疗影像诊断中面临的挑战

### 4.1 数据质量与标注问题

* 医疗影像数据的特点与标注难度
* 数据质量对模型性能的影响

### 4.2 模型泛化能力与鲁棒性

* 模型的泛化能力与过拟合问题
* 模型的鲁棒性与抗干扰能力

### 4.3 伦理与法律问题

* 人工智能在医疗影像诊断中的伦理考量
* 相关法律法规与监管政策

### 4.4 技术与应用推广

* 技术瓶颈与研发挑战
* 临床应用与推广策略

## 第五章 解决方案与展望

### 5.1 解决方案

* 针对挑战提出的解决方案与建议
* 现有技术的改进与优化

### 5.2 未来展望

* 人工智能在医疗影像诊断中的发展趋势
* 对医疗行业的潜在影响

## 结论

* 总结论文的主要研究成果与贡献
* 对未来研究的展望与建议

## 参考文献

* [参考的具体学术文献]`)
  // const props = {
  //   action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  //   onChange: handleChange,
  //   multiple: true,
  // };
  const ydoc = useMemo(() => new Y.Doc(), []);   // 使用 useMemo 保证只创建一次 provider
  console.log("连接")
  const provider = useMemo(() => {
    console.log(room + "hhhhhhhh")
    console.log(ydoc + "hhhhhhhh")
    return new WebsocketProvider(`ws://192.168.43.214:8081/ws/${room}`, 'tttt', ydoc)
  }, [ydoc, room]);
  useEffect(() => {
    const fetchData = async () => {
      // const storage = useStorage();

      // const queryParams = location.search.slice(1); // 获取查询参数（去掉开头的问号）
      // const documentId = decrypt(queryParams); // 假设你有一个解密函数
      // storage.setItem("documentId", documentId)
      // console.log(location.search)
      // console.log('Document ID:', documentId);
      // const userId = storage.getItem("openid");
      // if (userId) {
      //   const res = await userFun.shareCollaboration({ userId, documentId });
      //   console.log(JSON.stringify(res.data) + "-------------->");
      //   setRoom(res.data.document.id);
      //   setUser(res.data.user);
      //   setContentCopy(res.data.document.content); // 获取内容
      //   console.log("content:", contentCopy)
      //   console.log("用户：",res.data.user)

      // }
    };
    fetchData();
  }, [location.search])
  const editor = useEditor({
    extensions: [
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(content) {
          console.log(contentCopy)
          setItems(content)
        },
      }),
      Image,
      FontSize,
      EchartsNode,
      
      FontFamily,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
      }),
      Color.configure({
        types: [TextStyle.name, ListItem.name], keepMarks: true,

      }),
      TextStyle.configure({ types: [ListItem.name], keepMarks: true, }),
      Highlight.configure({
        multicolor: true,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          
            name: getRandomName(),
            color: getRandomColor(),
        
          // name: user.nickname,
          // color: '#f783ac'
        },
      }),
      Markdown,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        keepMarks: true,
      }),
      LineHeight.configure({
        keepMarks: true,
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        history: {
          depth: 10,
        },
        heading: {

          levels: [1, 2, 3],
        }
      }),
    ],
    content: contentCopy
  });

  useEffect(() => {
    if (editor && contentCopy) {
      editor.commands.setContent(contentCopy)
      editor.commands.insertContent(",")

    }
  }, [contentCopy])



  return <div className="flex h-full shadow-primary">
    <div className="shadow-primary p-20" style={{ height: '100%', width: '16%', overflowY: 'auto' }} ref={scrollContainerRef}>
      <h3 className="m-y-10">目录</h3>
      <div className="p-t-10">
        <MemorizedToC items={items} scrollContainerRef={scrollContainerRef} />

      </div>
    </div>
    <div className="" style={{ height: '100%', width: '84%' }}><Tiptap editor={editor} content={contentCopy} room={room} user={user} /></div>
    {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
  </div>
}
export default BigEditor