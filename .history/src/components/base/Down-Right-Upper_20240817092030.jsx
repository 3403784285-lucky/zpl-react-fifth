import { List, Typography } from 'antd';
import { useEffect, useState } from 'react';
import backFun from '../../api/user/back';

const { Title, Text } = Typography;

const NotificationList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await backFun.getNotice();
            if (res.code === 200) {
                setData(res.data);
            }
        };
        fetchData();
    }, []);

    return (
        <Card title="系统公告">
            
            <List
                style={{ height: '30vh', overflowY: 'auto' }}
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
        </Card>
    );
};

export default NotificationList;
