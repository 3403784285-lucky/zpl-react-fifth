import React, { useState } from 'react';
import { Button, Spin, Card, message } from 'antd';
import aiFun from '../../api/user/ai';
import { Transformer } from 'markmap-lib';
const { Markmap, loadCSS, loadJS } = markmap;
import * as markmap from 'markmap-view';
const Picture = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    const handleGenerateClick = () => {
        
        handleMarkdownChange()
    };
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
            <Button onClick={handleGenerateClick}>
                生成思维导图
            </Button>

            {loading && <Spin size="large" />}


            <Card title="生成的思维导图" style={{ marginTop: 16 }}>
                <svg id="markmap-container" style={{ height: '390px', width: '280px' }}></svg>
            </Card>
            <Button className='m-t-10'>二次编辑</Button>


        </div>
    );
};

export default Picture;
