import { Input, Table, Button, Radio, Menu, Pagination, Popover, Modal, Divider, Select, message } from 'antd';
import userFun from '../../api/user/user';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../api/user/file';
import { useStorage } from "web-localstorage-plus";
import { useState } from 'react';
import shareCFun from '../../api/user/share';
import { encrypt } from '../../utils/code';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_b9ss08hx8l8.js'
    ],
});



const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


function File() {
    
}

export default File;