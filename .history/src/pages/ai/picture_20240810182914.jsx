import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Spin, Card, message, Tooltip, Modal } from 'antd';
import aiFun from '../../api/user/ai';
import { Transformer } from 'markmap-lib';
import markdown from 'simple-mind-map/src/parse/markdown.js'
const { Markmap, loadCSS, loadJS } = markmap;
import MindMap from "simple-mind-map";
import * as markmap from 'markmap-view';
import Export from 'simple-mind-map/src/plugins/Export.js'
import { createFromIconfontCN, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_l0iirwun48i.js'
    ],
});
MindMap.usePlugin(Export)
const Picture = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    // 记录前进回退
    const [isStart, setIsStart] = useState(true)
    const [isEnd, setIsEnd] = useState(true)
    const [markdownData, setMarkDownData] = useState('')
    const [activeNodes, setActiveNodes] = useState([])
    const contentRef = useRef(null)
    const mindMapRef = useRef(null); // 使用 ref 来保存 mindMap 实例
    const designData=async()=>{
        if(markdownData!=''){
              let data = await markdown.transformMarkdownTo(markdownData)
        mindMapRef.current.setData(data)
        }
      

    }

    useEffect(() => {
        if (open&&contentRef.current) {
            console.log(contentRef.current)
            mindMapRef.current = new MindMap({
                el: contentRef.current,
                data: {
                    "data": {
                        "text": "根节点"
                    },
                    "children": [],
                    initRootNodePosition: ['left', 'center']
                }
            });
            const mindMap = mindMapRef.current;
            designData()

            mindMap.on('node_active', (node, nodeList) => {
                setActiveNodes(nodeList);
            });

            mindMap.on('back_forward', (index, len) => {
                setIsStart(index <= 0);
                setIsEnd(index >= len - 1);
            });

            return () => {
                if (mindMap) {
                    mindMap.destroy();
                }
            };
        }
    }, [open]);

    const back = useCallback(() => {
        const mindMap = mindMapRef.current;

        mindMap.execCommand('BACK');

    }, []);

    const forward = useCallback(() => {
        const mindMap = mindMapRef.current;
        if (mindMap) {
            mindMap.execCommand('FORWARD');
        }
    }, []);

    const insertNode = useCallback(() => {
        const mindMap = mindMapRef.current;
        if (mindMap) {
            mindMap.execCommand('INSERT_NODE');
        }
    }, []);

    const insertChildNode = useCallback(() => {
        const mindMap = mindMapRef.current;

        mindMap.execCommand('INSERT_CHILD_NODE');

    }, []);

    const deleteNode = useCallback(() => {
        const mindMap = mindMapRef.current;
        if (mindMap) {
            mindMap.execCommand('REMOVE_NODE');
        }
    }, []);



    const handleGenerateClick = () => {
        handleMarkdownChange()

    }

    const editTwo = () => {
        setOpen(true)
    }
    const outlet=()=>{
        const mindMap = mindMapRef.current;
        if (mindMap) {
            mindMap.export('png', true, '思维导图')
        }
    }
    const handleMarkdownChange = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('text', editor.getHTML());
        const res = await aiFun.mindMap(formData)
        console.log(res.data)
        setMarkDownData(res.data)
        setLoading(false)
        const transformer = new Transformer();
        // 1. 转换 makrdown
        const { root, features } = transformer.transform(res.data);
        // 2. 获取 assets 数据// either get assets required by used features
        const { styles, scripts } = transformer.getUsedAssets(features);
        // 清空markmap容器mar
        const container = document.getElementById('markmap-container');
        container.innerHTML = '';
        // 加载样式和脚本
        if (styles) loadCSS(styles);
        if (scripts) loadJS(scripts, { getMarkmap: () => markmap });
        // 创建并渲染markmap
        Markmap.create(container, null, root);
    };
    return (
        <div className='flex-c-center-center m-t-10 p-10'>
            <div>
                <Button onClick={handleGenerateClick}>
                    生成思维导图
                </Button>
                <Button type='primary' disabled={markdownData==''} className='m-l-10' onClick={editTwo}>
                    二次编辑
                </Button>

            </div>
            <Modal
                title="思维导图二次编辑"
                width={900}
                closable={true}
                icon={<IconFont type='icon-jihebiaoshi21'></IconFont>}
                okText='确定'
                cancelText='取消'
                onOk={()=>setOpen(false)}
                onCancel ={()=>setOpen(false)}
                open={open}
            >
                <div className='b-rd-4' style={{ border: 'black solid 0.1px' }}>
                    <div className={`upper-frame bg-color-blue flex-end-center p-x-10 b-rd-6`} style={{ height: '8%' }}>

                        <Tooltip placement="bottom" title={"导出为图片"}>
                            <IconFont type="icon-daochu" onClick={outlet} style={{ display: `activeNodes.length>0?'block':'none'` }} className='m-4 p-10 b-rd-4 font-size-mlg' />

                        </Tooltip>
                        <Tooltip placement="bottom" title={"撤回"}>
                            <IconFont type="icon-undo" onClick={back} style={{ display: `!isStart?'block':'none'` }} className='m-4 p-10 b-rd-4 font-size-lg' />

                        </Tooltip>
                        <Tooltip placement="bottom" title={"取消撤回"} >

                            <IconFont type="icon-redo" onClick={forward} style={{ display: `!isEnd?'block':'none'` }} className='m-4 p-10 b-rd-4 font-size-lg' />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"插入兄弟节点"} >
                            <IconFont type="icon-clue" className='m-4 p-10 b-rd-4 font-size-lg' onClick={insertNode} style={{ display: `activeNodes.length>0?'block':'none'` }} />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"插入子节点"} >

                            <IconFont type="icon-Vector-11" onClick={insertChildNode} style={{ display: `activeNodes.length>0?'block':'none'` }} className='m-4 p-10 b-rd-4 font-size-lg' />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"删除节点"} >

                            <IconFont type="icon-shanchujiedian" onClick={deleteNode} style={{ display: `activeNodes.length>0?'block':'none'` }} className='m-4 p-10 b-rd-4 font-size-mlg' />
                        </Tooltip>

                    </div>
                    <div ref={contentRef} id="mindMapContainer" ></div></div>

            </Modal>



            {loading && <Spin size="large" />}


            <Card title="生成的思维导图" style={{ marginTop: 16 }}>
                <svg id="markmap-container" style={{ height: '400px', width: '280px' }}></svg>
            </Card>


        </div>
    );
};

export default Picture;
