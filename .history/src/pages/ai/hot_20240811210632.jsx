import React, { useState, useEffect } from 'react';
import aiFun from '../../api/user/ai';

function Hot() {
    const [trendingData, setTrendingData] = useState([]);

    useEffect(() => {
      // 定义异步函数获取数据
      const fetchData = async () => {
        const res = await aiFun.getHot();
        if(res.code === 200){
            setTrendingData(res.data);
        }
      };
      fetchData();
    }, []);

    return (
      <div className='p-20 p-l-30' style={{height: '78vh', display: 'flex', flexDirection: 'column'}}>
        <h4 className='m-b-20' style={{flexShrink: 0}}>
            新闻头条
        </h4>
        <ul className='flex-c-center-start p-l-50' style={{flexGrow: 1, overflowY: 'auto'}}>
          {trendingData.map((item, index) => (
            <li key={index}>
              <a href={item.url} className='text-ellipsis' style={{width: 250}} target="_blank" rel="noopener noreferrer">
                {index} {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Hot;
