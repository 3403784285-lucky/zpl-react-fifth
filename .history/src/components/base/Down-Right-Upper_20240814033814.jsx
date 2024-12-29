import { List, Typography } from 'antd';
import { useEffect } from 'react';
import backFun from '../../api/user/back';

const { Text } = Typography;

const NotificationList = () => {
    useEffect(()=>{
        const fetchData=async()=>{
            const res=await backFun.

        }
        fetchData()
    })
  return (
    <List
    style={{height:'30vh'}}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<Text strong>{item.title}</Text>}
            description={item.createdAt}
          />
        </List.Item>
      )}
    />
  );
};
export default NotificationList