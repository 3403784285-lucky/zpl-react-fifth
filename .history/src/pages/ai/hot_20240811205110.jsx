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
      <div className='p-20 p-l-30'>
        <h4 className='m-b-10'>
            新闻头条
        </h4>
        <ul className='flex-c-center-start p-l-50 m-t-30' style={{height:'70vh',overflowY:'auto'}}>
          {trendingData.map((item, index) => (
            <li key={index}>
              <a href={item.url} className='text' target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default Hot;