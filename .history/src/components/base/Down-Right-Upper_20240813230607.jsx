import { List, Typography } from 'antd';

const { Text } = Typography;

const NotificationList = ({ data }) => {
  return (
    <List
    className=''
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