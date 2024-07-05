// messageHelper.js
import { message } from 'antd';

const showMessage = (type, content) => {
  message.destroy();
  message[type](content);
};

export const showErrorMessage = (content) => {
  showMessage('error', content);
};
