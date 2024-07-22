import React, { useState } from 'react';
import { Button, Spin, Card } from 'antd';
import aiFun from '../../api/user/ai';
import { Transformer } from 'markmap-lib';
const { Markmap, loadCSS, loadJS } = markmap;
import * as markmap from 'markmap-view';
const Picture = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    const handleGenerateClick = () => {
        setLoading(true);
        handleMarkdownChange()
        setLoading(false)
    };
    const handleMarkdownChange = async () => {
        // const formData = new FormData();
        // formData.append('text', editor.getHTML());
        // const res=await aiFun.mindMap(formData)
        // console.log(res.data)
        const content = `# 人工智能在医疗影像诊断中的应用与挑战\n\n## 摘要\n- 简要介绍人工智能在医疗影像诊断中的研究背景与意义\n- 论文研究的主要内容、方法、结论及创新点\n\n## 关键词\n- 人工智能\n- 医疗影像诊断\n- 深度学习\n- 挑战\n- 应用\n\n## 第一章 引言\n### 1.1 研究背景\n- 阐述医疗影像诊断的重要性\n- 传统方法的局限性\n- 人工智能技术的发展\n- 人工智能在医疗影像诊断中的潜力\n\n### 1.2 研究意义\n- 论述人工智能在医疗影像诊断中的应用对医疗行业的影响\n- 国内外研究现状\n- 发展趋势\n

`
        const transformer = new Transformer();
        // 1. 转换 makrdown
        const { root, features } = transformer.transform(content);
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
                <svg id="markmap-container" style={{ height: '400px', width: '300px' }}></svg>
            </Card>

        </div>
    );
};

export default Picture;
