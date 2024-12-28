import React, { useEffect, useRef, useState } from 'react';
import { Button, Spin, Card, message, Tooltip, Modal } from 'antd';
import aiFun from '../../api/user/ai';
import { Transformer } from 'markmap-lib';
const { Markmap, loadCSS, loadJS } = markmap;
import MindMap from "simple-mind-map";
import * as markmap from 'markmap-view';
import { createFromIconfontCN, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_n2arlpotmto.js'
    ],
});
const Picture = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null)

    let mindMap = null

    // 记录前进回退
    const isStart = useRef(true)
    const isEnd = useRef(true)

    // 当前激活的节点列表
    const activeNodes = useRef([])

    // 回退
    const back = () => {
        mindMap.execCommand('BACK')
    }

    // 前进
    const forward = () => {
        mindMap.execCommand('FORWARD')
    }

    // 插入兄弟节点
    const insertNode = () => {
        mindMap.execCommand('INSERT_NODE')
    }

    // 插入子节点
    const insertChildNode = () => {
        mindMap.execCommand('INSERT_CHILD_NODE')
    }

    // 删除节点
    const deleteNode = () => {
        mindMap.execCommand('REMOVE_NODE')
    }


    const handleGenerateClick = () => {
        handleMarkdownChange()
    };
    useEffect(() => {
        // 在组件卸载时销毁MindMap实例
        console.log(document.getElementById('mindMapContainer'))
        mindMap = open ? new MindMap({
            el: contentRef.current,
            data: {
                "data": {
                    "text": "根节点"
                },
                "children": [],
                initRootNodePosition: ['left', 'center']
            }
        }) : null;
        // 监听节点激活事件
        if (mindMap) {
            mindMap.on('node_active', (node, nodeList) => {
                activeNodes.value = nodeList
            })

            // 前进回退事件
            mindMap.on('back_forward', (index, len) => {
                isStart.value = index <= 0
                isEnd.value = index >= len - 1
            })
        }

        return () => {
            if (mindMap) {


                mindMap.destroy();
            }

        };
    }, [open]);

    const editTwo = () => {
        setOpen(true)



    }
    const handleMarkdownChange = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('text', editor.getHTML());
        const res = await aiFun.mindMap(formData)
        console.log(res.data)
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
                <Button type='primary' className='m-l-10' onClick={editTwo}>
                    二次编辑
                </Button>

            </div>
            <Modal
                title="思维导图二次编辑"
                width={900}
                icon={<IconFont type='icon-jihebiaoshi21'></IconFont>}
                okText='保存'
                cancelText='取消'
                // onOk={}
                // onCancel ={}
                open={open}
            >
                <div className='b-rd-4' style={{ border: 'black solid 0.1px' }}>
                    <div className={`upper-frame bg-color-blue flex-end-center p-x-10 b-rd-6`} style={{ height: '8%' }}>




                        <Tooltip placement="bottom" title={"撤回"}>
                            <IconFont type="icon-undo" onClick={() => editor.chain().focus().undo().run()} className='m-4 p-10 b-rd-4 font-size-lg' />

                        </Tooltip>
                        <Tooltip placement="bottom" title={"取消撤回"} >

                            <IconFont type="icon-redo" onClick={() => editor.chain().focus().redo().run()} className='m-4 p-10 b-rd-4 font-size-lg' />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"插入兄弟节点"} >

                            <IconFont type="icon-clue" onClick={() => editor.chain().focus().redo().run()} className='m-4 p-10 b-rd-4 font-size-lg' />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"插入子节点"} >

                            <IconFont type="icon-Vector-11" onClick={() => editor.chain().focus().redo().run()} className='m-4 p-10 b-rd-4 font-size-lg' />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"删除节点"} >

                            <IconFont type="icon-shanchujiedian" onClick={() => editor.chain().focus().redo().run()} className='m-4 p-10 b-rd-4 font-size-lg' />
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
