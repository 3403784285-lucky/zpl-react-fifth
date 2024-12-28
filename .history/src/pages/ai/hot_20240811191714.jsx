import Request from "../../api";

function Hot() {
    const [trendingData, setTrendingData] = useState([]);

    useEffect(() => {
      // 定义异步函数获取数据
      const fetchData = async () => {
        try {
            const response = await Request.post('/v2/toutiaohot');
            setTrendingData(response.data);
          } catch (error) {
            console.error('Error fetching data: ', error);
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