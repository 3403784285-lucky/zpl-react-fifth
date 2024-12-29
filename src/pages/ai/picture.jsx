import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Spin, Card, message, Tooltip, Modal } from 'antd';
import aiFun from '../../api/user/ai';
import { Transformer } from 'markmap-lib';
import markdown from 'simple-mind-map/src/parse/markdown.js';
const { Markmap, loadCSS, loadJS } = markmap;
import MindMap from "simple-mind-map";
import * as markmap from 'markmap-view';
import Export from 'simple-mind-map/src/plugins/Export.js';
import { createFromIconfontCN, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_l0iirwun48i.js'
    ],
});

const AI_SSE_URL = 'http://localhost:8090/ai/sse';
MindMap.usePlugin(Export);

const Picture = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    // 记录前进回退
    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(true);
    const [markdownData, setMarkDownData] = useState('');
    const [activeNodes, setActiveNodes] = useState([]);
    const contentRef = useRef(null);
    const mindMapRef = useRef(null); // 使用 ref 来保存 mindMap 实例
    let markmapInstance = useRef(null); // 保存 Markmap 实例，改为 useRef 避免多次重置

    /**
     * 解析后端返回的 SSE 数据行
     * 每一行形如: data: {"token":"some text"}
     */
    const parseSSEChunk = (textChunk) => {
        // 先按换行符切割
        const lines = textChunk.split(/\r?\n/);
        let newTokens = '';

        for (let line of lines) {
            if (line.startsWith('data:')) {
                // 去掉 "data:" 这部分，得到 JSON
                const dataStr = line.replace(/^data:\s*/, '').trim();
                // 有些 SSE 可能发送 "[DONE]" 表示结束
                if (dataStr === '[DONE]') {
                    continue;
                }
                try {
                    const dataObj = JSON.parse(dataStr);
                    // dataObj.token 即本次返回的增量内容
                    if (dataObj.token) {
                        newTokens += dataObj.token;
                    }
                } catch (err) {
                    console.error('SSE JSON 解析出错', err);
                }
            }
        }
        return newTokens;
    };

    // 根据最新 markdownData 更新 simple-mind-map
    const designData = async () => {
        if (markdownData !== '') {
            let data = await markdown.transformMarkdownTo(markdownData);
            mindMapRef.current.setData(data);
        }
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                // 如果已经存在实例，先销毁，避免重复初始化
                if (mindMapRef.current) {
                    mindMapRef.current.destroy();
                }

                mindMapRef.current = new MindMap({
                    el: contentRef.current,
                    data: {
                        data: {
                            text: "根节点"
                        },
                        children: [],
                        initRootNodePosition: ['left', 'center']
                    }
                });

                designData();

                mindMapRef.current.on('node_active', (node, nodeList) => {
                    setActiveNodes(nodeList);
                });

                mindMapRef.current.on('back_forward', (index, len) => {
                    setIsStart(index <= 0);
                    setIsEnd(index >= len - 1);
                });
            }, 500);
        }
    }, [open]);

    const back = useCallback(() => {
        const mindMap = mindMapRef.current;
        if (mindMap) {
            mindMap.execCommand('BACK');
        }
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
        if (mindMap) {
            mindMap.execCommand('INSERT_CHILD_NODE');
        }
    }, []);

    const deleteNode = useCallback(() => {
        const mindMap = mindMapRef.current;
        if (mindMap) {
            mindMap.execCommand('REMOVE_NODE');
        }
    }, []);

    const editTwo = () => {
        setOpen(true);
    };

    const outlet = () => {
        const mindMap = mindMapRef.current;
        if (mindMap) {
            mindMap.export('png', true, '思维导图');
        }
    };

    /**
     * 点击生成思维导图按钮的事件
     */
    const handleGenerateClick = () => {
        handleMarkdownChange();
    };

    /**
     * 核心方法：请求后端 SSE 接口，逐行解析流式返回
     */
    const handleMarkdownChange = async () => {
        setLoading(true);
        // 构建请求体
        const bodyData = {
            type: "mindmap",
            userQuery: editor.getHTML()
        };

        try {
            const response = await fetch(AI_SSE_URL, {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let result1 = '';

            const processStream = async () => {
                const { done, value } = await reader.read();
                if (done) {
                    // 流结束
                    setLoading(false);
                    return;
                }
                // 将 chunk 解码成文本
                const textChunk = decoder.decode(value, { stream: true });
                // 解析出增量 token
                const newTokens = parseSSEChunk(textChunk);
                result1 += newTokens;

                // 更新 state，触发前端视图更新
                setMarkDownData(result1);

                // 增量更新 Markmap
                const transformer = new Transformer();
                const { root, features } = transformer.transform(result1);
                const { styles, scripts } = transformer.getUsedAssets(features);

                // 动态加载样式和脚本（仅第一次加载就好）
                if (styles) loadCSS(styles);
                if (scripts) loadJS(scripts, { getMarkmap: () => markmap });

                // 如果 Markmap 实例已存在，则增量更新数据；否则初始化
                if (markmapInstance.current) {
                    markmapInstance.current.setData(root);
                    markmapInstance.current.fit();
                } else {
                    const container = document.getElementById('markmap-container');
                    container.innerHTML = '';
                    markmapInstance.current = Markmap.create(container, null, root);
                }

                // 继续下一段流读取
                setTimeout(processStream, 50); // 可以调节时间
            };

            // 开始读取流
            processStream();
        } catch (error) {
            console.error('Error fetching SSE stream:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex-c-center-center m-t-10 p-10">
            <div>
                <Button onClick={handleGenerateClick}>
                    生成思维导图
                </Button>
                <Button
                    type="primary"
                    disabled={markdownData === ''}
                    className="m-l-10"
                    onClick={editTwo}
                >
                    二次编辑
                </Button>
            </div>

            <Modal
                title="思维导图二次编辑"
                width={1100}
                closable={true}
                icon={<IconFont type='icon-jihebiaoshi21' />}
                okText='确定'
                cancelText='取消'
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                open={open}
            >
                <div className="b-rd-4" style={{ border: 'black solid 0.1px' }}>
                    <div
                        className={`upper-frame bg-color-blue flex-end-center p-x-10 b-rd-6`}
                        style={{ height: '8%' }}
                    >
                        <Tooltip placement="bottom" title={"导出为图片"}>
                            <IconFont
                                type="icon-daochu"
                                onClick={outlet}
                                style={{ display: activeNodes.length > 0 ? 'block' : 'none' }}
                                className="m-4 p-10 b-rd-4 font-size-mlg"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"撤回"}>
                            <IconFont
                                type="icon-undo"
                                onClick={back}
                                style={{ display: !isStart ? 'block' : 'none' }}
                                className="m-4 p-10 b-rd-4 font-size-lg"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"取消撤回"}>
                            <IconFont
                                type="icon-redo"
                                onClick={forward}
                                style={{ display: !isEnd ? 'block' : 'none' }}
                                className="m-4 p-10 b-rd-4 font-size-lg"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"插入兄弟节点"}>
                            <IconFont
                                type="icon-clue"
                                onClick={insertNode}
                                style={{ display: activeNodes.length > 0 ? 'block' : 'none' }}
                                className="m-4 p-10 b-rd-4 font-size-lg"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"插入子节点"}>
                            <IconFont
                                type="icon-Vector-11"
                                onClick={insertChildNode}
                                style={{ display: activeNodes.length > 0 ? 'block' : 'none' }}
                                className="m-4 p-10 b-rd-4 font-size-lg"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title={"删除节点"}>
                            <IconFont
                                type="icon-shanchujiedian"
                                onClick={deleteNode}
                                style={{ display: activeNodes.length > 0 ? 'block' : 'none' }}
                                className="m-4 p-10 b-rd-4 font-size-mlg"
                            />
                        </Tooltip>
                    </div>

                    <div ref={contentRef} id="mindMapContainer" />
                </div>
            </Modal>

            {loading && <Spin size="large" />}

            <Card title="生成的思维导图" style={{ marginTop: 16 }}>
                <svg
                    id="markmap-container"
                    style={{ height: '400px', width: '280px' }}
                ></svg>
            </Card>
        </div>
    );
};

export default Picture;
