import React, { useState } from 'react';
import { Button, Spin, Card, message, Modal } from 'antd';
import aiFun from '../../api/user/ai';
import { Transformer } from 'markmap-lib';
const { Markmap, loadCSS, loadJS } = markmap;
import * as markmap from 'markmap-view';
const Picture = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const handleGenerateClick = () => {
        handleMarkdownChange()
    };
    useEffect(() => {
        const mindMap = new MindMap(visible&&{
          el: document.getElementById('mindMapContainer'),
          data: {
            "data": {
                "text": "根节点"
            },
            "children": []
          }
        });
        // 在组件卸载时销毁MindMap实例
        return () => {
          mindMap.destroy();
        };
      }, [visible]);
    const editTwo=()=>{
        Modal.confirm({
            title: '思维导图二次编辑',
            icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
            content: (
                <div id="mindMapContainer"></div>
            ),
            okText: '保存',
            cancelText: '弃用',
            onOk() {
              // 替换编辑器中的选中内容为生成的结果
              
            },
            onCancel() {
              
            }
        })
      setVisible(true)
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
           


            {loading && <Spin size="large" />}


            <Card title="生成的思维导图" style={{ marginTop: 16 }}>
                <svg id="markmap-container" style={{ height: '400px', width: '280px' }}></svg>
            </Card>


        </div>
    );
};

export default Picture;
