
import { Dropdown } from 'antd'
import { DownOutlined, UnorderedListOutlined ,createFromIconfontCN} from '@ant-design/icons';
import { Space } from 'antd'
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_ybuylbais59.js'
    ],
});
const items = [
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item（disabled）',
        key: '3',
        disabled: true,
    },
];
// const columns = [
//     {
//       title: '收藏时间',
//       dataIndex: 'name',
//       showSorterTooltip: {
//         target: 'full-header',
//       },
//       filters: [
//         {
//           text: 'Joe',
//           value: 'Joe',
//         },
//         {
//           text: 'Jim',
//           value: 'Jim',
//         },
//         {
//           text: 'Submenu',
//           value: 'Submenu',
//           children: [
//             {
//               text: 'Green',
//               value: 'Green',
//             },
//             {
//               text: 'Black',
//               value: 'Black',
//             },
//           ],
//         },
//       ],
//       // specify the condition of filtering result
//       // here is that finding the name started with `value`
//       onFilter: (value, record) => record.name.indexOf(value) === 0,
//       sorter: (a, b) => a.name.length - b.name.length,
//       sortDirections: ['descend'],
//     },
//     {
//       title: '归属',
//       dataIndex: 'age',
//       defaultSortOrder: 'descend',
//       sorter: (a, b) => a.age - b.age,
//     },
//     {
//       title: '名称',
//       dataIndex: 'address',
//       filters: [
//         {
//           text: 'London',
//           value: 'London',
//         },
//         {
//           text: 'New York',
//           value: 'New York',
//         },
//       ],
//       onFilter: (value, record) => record.address.indexOf(value) === 0,
//     },
//   ];
//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sydney No. 1 Lake Park',
//     },
//     {
//       key: '4',
//       name: 'Jim Red',
//       age: 32,
//       address: 'London No. 2 Lake Park',
//     },
//   ];
//   const onChange = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };

const list = [
    {
        key:1,
        content:'做一个乖女孩',
        time:'2-19 12:57'

    },
    {
        key:2,
        content:'第一步变得自信',
        time:'2-19 12:57'

    },
    {
        key:3,
        content:'第二步变得强大',
        time:'2-19 12:57'

    },
   
   
]

let MyDom =list.map((item,index)=>{
    return <li key={item.key} className='flex m-t-4 ' style={{justifyContent:'space-between'}}>
        <div>{item.content}</div>
        <div >{item.time}</div>
    </li>
})

function Favorites() {
    return <>
        <div className="favorite-frame p-20 p-b-2 ">
            <div className="title p-10 p-b-20 font-size-lg font-bold">收藏</div>
            <div className="select-part p-16 flex" style={{ justifyContent: 'space-between' }}>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className='text-color-black'>
                            全部文件
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <UnorderedListOutlined />

            </div>

            <div className="list-frame p-16 flex" style={{justifyContent:'space-between'}}>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16" style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center"><IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记<IconFont className='m-r-20' type="icon-suoding" /></div>
                    <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                        主要是用来激励自己
                    </div>
                    <div className="second-li">
                        <ul className='m-t-20 p-6 text-color-grey'>{MyDom}</ul>
                    </div>
                </div>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16" style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center"><IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记<IconFont className='m-r-20' type="icon-suoding" /></div>
                    <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                        主要是用来激励自己
                    </div>
                    <div className="second-li">
                        <ul className='m-t-20 p-6 text-color-grey'>{MyDom}</ul>
                    </div>
                </div>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16" style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center"><IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记<IconFont className='m-r-20' type="icon-suoding" /></div>
                    <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                        主要是用来激励自己
                    </div>
                    <div className="second-li">
                        <ul className='m-t-20 p-6 text-color-grey'>{MyDom}</ul>
                    </div>
                </div>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16" style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center"><IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记<IconFont className='m-r-20' type="icon-suoding" /></div>
                    <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                        主要是用来激励自己
                    </div>
                    <div className="second-li">
                        <ul className='m-t-20 p-6 text-color-grey'>{MyDom}</ul>
                    </div>
                </div>
            

            </div>

            {/* <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{
        target: 'sorter-icon',
        }}
    /> */}


        </div>



    </>
}
export default Favorites