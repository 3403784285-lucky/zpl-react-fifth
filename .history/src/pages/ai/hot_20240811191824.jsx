import request from 'umi-request';
function Hot() {
    const [trendingData, setTrendingData] = useState([]);

    useEffect(() => {
      // 定义异步函数获取数据
      const fetchData = async () => {
        try {
            const response = await request.post('https://tenapi.cn/v2/toutiaohot');
            if (response.code === 200) {
              setTrendingData(response.data);
            } else {
              console.error('Error fetching data: ', response.msg);
            }
          } catch (error) {
            console.error('Error making request: ', error);
          }
        };
      fetchData();
    }, []);
  
    return (
      <div>
        <h2>Trending News</h2>
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