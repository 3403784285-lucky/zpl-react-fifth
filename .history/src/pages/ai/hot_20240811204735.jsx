import request from 'umi-request';
import aiFun from '../../api/user/ai';
function Hot() {
    const [trendingData, setTrendingData] = useState([]);

    useEffect(() => {
      // 定义异步函数获取数据
      const fetchData = async () => {
        const res=await aiFun.getHot();
        if(res.code==200){
            setTrendingData(res.data)
        }
      }
      fetchData();
    }, []);
    return (
      <div className='m-20'>
        <h4>
            新闻头条
        </h4>
        <ul>
          {trendingData.map((item, index) => (
            <li key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default Hot;