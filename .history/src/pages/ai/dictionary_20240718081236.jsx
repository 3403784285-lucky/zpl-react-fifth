import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';

function Dictionary({ baiduClick }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        // // Simulate API call or fetch logic
        // // Replace with your actual API call logic here
        // const response = await fetch('your_search_endpoint');
        // const data = await response.json();
        setSearchResults([{"desc":"6.创新性 7.研究意义 论文写作是一个非常有技巧性的工作,其每一部分都有每一部分需要达到的目的。下面是我总结的论文中各部分的概念和一些写法及示例,仅供参考...","href":"http://www.baidu.com/link?url=Ta5PkREr35d33_nYD88dFlZbJYCt8vybADvMCdFjLOOcmUXABDCGpTWJa015UvwV","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://zhuanlan.zhihu.com/p/614296532","site":"知乎","title":"...国内外现状、研究目标、创新性、研究意义等要怎么写? -..."},{"desc":"人事管理系统研究目的意义及国内外研究现状 1 研究目的及意义 2 国内外的研究现状 1 研究目的及意义 随着企业规模的扩大,企业管理组织会变得越来越庞大和困难,...","href":"http://www.baidu.com/link?url=r98XsRsdAT7V_CORojotipPLflF4r3YqPaOwR1dITRjbNJNQnlwK9LnhA8fuw94v49ZBveYEBoD5g0n77ysTtq","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://www.360wenmi.com/f/files5l0605s.html","site":"www.360wenmi.com/f/files5l060....","title":"国内外进展情况、研究目的及意义(精选10篇)"},{"desc":"现状调研是指对目前事物或现象进行系统、全面的了解和掌握,并针对所调查的内容进行客观的数据分析和建议性意见提出的研究活动。本文将以某地区教育现状调研为例,探讨现状调研...","href":"http://www.baidu.com/link?url=Fb8nXi6MgX9O5rHYl1ZfJQcIRFzo7RZCQL5h-oeuyyqulIzPB-CqklgbIjB1Zd05HKv5SYfmq7Cq34P0pIIk_q","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://www.chinesejy.com/diaoyanbaogao/191485.html","site":"九月范文网","title":"现状调研报告范文(5篇)"},{"desc":"一、研究目的: 二、研究意义: 1、 时代要求 2、 应用技术要求 3、 现有应用软件的不足 三、现就现状: (国内外) 四、开发步骤: 1、 实用性 2、 正对性 3、 性价比 一、 选题意...","href":"http://www.baidu.com/link?url=fQAS0_l0yhsVqDWlUEcPkq4tWEXIbIa1h_qjHhYxZ8nNGHDeQ9g3zzhYnd7kRoqvqFz4neaU8IBBi_Yr3IyR-DPImf-OwvJsc2_xzzlTEHDcUkyHigSG_70tY8Sxc4DF","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://wenku.baidu.com/view/e617a7ec4328915f804d2b160b4e767f5acf800a.html","site":"百度文库","title":"论文研究目的、意义及研究现状 - 百度文库"},{"desc":"二、锂电池管理系统研究现状 国外电池管理系统研究现状 随着近十年来电动汽车研究和使用的不断升温,国外一些大的汽车生产商和电池供应商针对各种电池作了大量...","href":"http://www.baidu.com/link?url=Fb8nXi6MgX9O5rHYl1ZfJWptH_PnKkio2AOiKxG_0kRgdbmecCPB7uXBXw2z--zy","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"http://www.juda.cn/news/108366.html","site":"钜大锂电","title":"锂电池管理系统的研究与实现 — 研究目的与意义【钜大锂电】"},{"desc":"在写论文的时候,介绍研究背景、国内外现状、研究目标、创新性和研究意义是非常重要的,这些内容可以写在论文的引言部分。以下是写论文时可以参考的写作思路和要点: 一、研究背景 介绍...","href":"http://www.baidu.com/link?url=qFB44wxMQkvZr9P_6x46QfWRGG8VVSl4YzIZlivVn5dcBpQ3da9iT1D2G9krgJrbdijX8zWchhSVsBc5ntNJ2K","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://www.bilibili.com/read/cv23483609/","site":"哔哩哔哩","title":"写论文时,研究背景、国内外现状、创新性、研究意义等要怎..."},{"desc":"1. 养老院行业现状 目前国内养老院数量逐年增加,但普遍存在床位不足、设施老化、人员短缺等问题。由于养老院的经营成本较高,导致许多养老院无法提供高质量的服...","href":"http://www.baidu.com/link?url=cww7L6ElMpJxjC9dfSSrMLKyabO4HH7MAB-hNs95E7qKoax43-Jl4ees8r9fofpP","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://www.0775qc.com/144429.html","site":"智慧养老","title":"介绍养老院行业现状及未来发展趋势的调研目的和意义-智慧..."},{"desc":"选题的目的与意义: 由于很多的小型实体店铺一直在依靠手工方式来进行出库、入库等记录,使库存管理变得繁琐,同时出错率较高,并且存在不易查找的弊端。所以小型实体店铺库存管理信息系统开发针对这...","href":"http://www.baidu.com/link?url=qFB44wxMQkvZr9P_6x46Qh89OMhVZVnxoA3NMbfmRhHGAkuMvMpioaTVrlFSFw6o8BQMvM_92uhYlVR5F2HxPa","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://www.chazidian.com/fanwen/755594","site":"查字典","title":"论文开题报告研究现状(十五篇) - 查字典"},{"desc":"课题研究的意义: 面对经济全球化的趋势,企业能否在竞争日益激烈的环境中生存和发展,关键在于企业是否具备核心竞争力,而核心竞争力主要来自于企业中的人力资源,...","href":"http://www.baidu.com/link?url=yLV7YIRpAKHVEYznVmN0SjXz83Zr3jNQT8ThY1WOzRMlHA-A5kSvQYN97JAxNDudXcAVZ9Ssbbbn4TQIi35WzK","kw":"的现状和重要性2. 研究目的与意义","page":1,"realUrl":"https://fw.chazidian.com/mip/fanwen1049563/","site":"范文网","title":"最新论文开题报告研究现状(十六篇)"}]);
        setLoading(false);
    };

    return (
        <div className="p-30" style={{ width: '360px' }}>
            <h4 className='m-b-20'>边写边搜</h4>
            <div className="input-frame flex">
                <Input placeholder="请输入关键字可用逗号隔开" style={{ width: '100%' }} />
                <Button onClick={handleSearch} className='bg-color-second text-color-white flex-1 b-rd-6' disabled={loading}>
                    推荐
                </Button>
            </div>

            <div className='flex-c-center-center'>
                <Card className='m-t-30 p-4 shadow flex-c-center-center' hoverable style={{ width: 300, height: 150, overflowY: 'auto' }}>
                    {loading && <div>Loading...</div>}
                    {!loading && searchResults.length === 0 && <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>暂无数据</div>}
                    {!loading && searchResults.map((result, index) => (
                        <Card key={index} title={<a href={result.href} target="_blank" rel="noopener noreferrer">{result.title}</a>} style={{ margin: '10px 0' }}>
                            <p>{result.desc}</p>
                            <a href={result.href} target="_blank" rel="noopener noreferrer">{result.site}</a>
                        </Card>
                    ))}
                </Card>
            </div>
        </div>
    );
}

export default Dictionary;
