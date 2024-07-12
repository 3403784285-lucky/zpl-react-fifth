
import { Dropdown, Popover,Popconfirm ,Button } from 'antd'
import { DownOutlined, UnorderedListOutlined, createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd'
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js',

    ],
});
const items = [
    {
        label: '全部文件',
        key: '0',
    },

];
const dataFetch =
    [
        {
            "id": 45,
            "userId": 3,
            "name": "23213",
            "content": "# 示例论文标题\n\n**作者姓名**\n\n---\n\n**摘要**  \n本文旨在提供一个 Markdown 格式的论文文章示例，展示基本的排版和样式设置，包括标题、段落、引用和图片插入等内容。\n\n## 1. 引言\n\n随着互联网技术的发展，Markdown 已经成为编写文档的流行格式。本文将展示如何使用 Markdown 编写和格式化一篇论文文章。\n\n## 2. 文献综述\n\n文献综述部分主要回顾相关领域的研究工作。例如，Smith 等人（2020）在其研究中探讨了 Markdown 在文档编写中的重要性。\n\n> “Markdown 是编写文档的基础，它定义了文档的结构和内容。” - Smith et al. (2020)\n\n## 3. 研究方法\n\n在本研究中，我们采用了定量研究方法，通过问卷调查收集数据。数据分析使用了 SPSS 软件。\n\n## 4. 结果与讨论\n\n研究结果表明，Markdown 在文档编写中的应用非常广泛，其重要性不可忽视。\n\n![示例图片](https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/8a0bb37eaca543c6b09ca095ae547681~tplv-gflu06s87d-image.png)\n\n## 5. 结论\n\n本文展示了如何使用 Markdown 编写和格式化一篇论文文章。希望这对初学者有所帮助。\n\n---\n\n### 参考文献\n\nSmith, J., Doe, J., & Brown, A. (2020). The Importance of Markdown in Document Writing. Web Journal, 15(3), 123-134.\n\n\n\n\n\n\n\n\n\n```\n\n```",
            "summary": "1231",
            "type": 21312,
            "label": "1312",
            "subject": "132",
            "category": "1321",
            "status": 1312,
            "isDeleted": 0,
            "likeCount": 0,
            "visibility": 1,
            "createTime": "2024-06-07 17:17:24",
            "updateTime": "2024-06-07 17:17:24"
        }
    ]

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
        key: 1,
        content: '做一个乖女孩',
        time: '2-19 12:57'

    },
    {
        key: 2,
        content: '第一步变得自信',
        time: '2-19 12:57'

    },
    {
        key: 3,
        content: '第二步变得强大',
        time: '2-19 12:57'

    },


]

let MyDom = list.map((item, index) => {
    return <li key={item.key} className='flex m-t-4 ' style={{ justifyContent: 'space-between' }}>
        <div>{item.content}</div>
        <div >{item.time}</div>
    </li>
})

const content = (<div >
          <Popconfirm
      title="Title"
      description="Open Popconfirm with Promise"
      onConfirm={confirm}
       placement="top"
      onOpenChange={() => console.log('open change')}
    >
       <div className='p-6 hover-effect b-rd-6'>新建文件夹</div>
    </Popconfirm>
   
</div>)
const contentCopy = (<div >
    <div className='p-6 hover-effect b-rd-6'>删除</div>
    <div className='p-6 hover-effect b-rd-6'>重命名</div>
</div>)
function Favorites() {
    const [icon, setIcon] = useState('icon-suoding');
    const [open, setOpen] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);
    const confirm = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(null), 3000);
        });

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleOpenChangeCopy = (newOpenCopy) => {
        setOpenCopy(newOpenCopy);
    };
    return <>

        <div className="favorite-frame p-20 p-b-2 ">
            <div className="title p-10 p-b-20 font-size-lg font-bold">收藏</div>
            <div className="select-part p-16 flex" style={{ justifyContent: 'space-between' }}>
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['8'],
                    }}

                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className='text-color-black'>
                            全部文件
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Popover
                    trigger="click"
                    open={open}
                    content={content}
                    onOpenChange={handleOpenChange}
                >
                    <UnorderedListOutlined />
                </Popover>


            </div>

            <div className="list-frame p-16 flex " style={{ justifyContent: 'space-between' }}>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16 position-relative hover-row"
                    onMouseEnter={() => {
                        // 鼠标移入行时执行的操作
                        const rows = document.querySelectorAll('.hover-row');
                        rows[0].classList.add('hover-row-active');
                    }}
                    onMouseLeave={() => {
                        // 鼠标移出行时执行的操作
                        const rows = document.querySelectorAll('.hover-row');
                        rows[0].classList.remove('hover-row-active');
                    }}
                    style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center ">
                        <IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记
                    </div>
                    <Popover
                        trigger="click"
                        open={openCopy}
                        content={contentCopy}
                        onOpenChange={handleOpenChangeCopy}
                    >
                        <IconFont type='icon-gengduo' className='font-size-mlg position-absolute share-button' style={{ right: 15, top: 20 }}></IconFont>
                    </Popover>

                    <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                        主要是用来激励自己
                    </div>
                    <div className="second-li">
                        <ul className='m-t-20 p-6 text-color-grey'>{MyDom}</ul>
                    </div>
                </div>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16" style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center"><IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记</div>
                    <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                        主要是用来激励自己
                    </div>
                    <div className="second-li">
                        <ul className='m-t-20 p-6 text-color-grey'>{MyDom}</ul>
                    </div>
                </div>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16" style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center"><IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记</div>
                    <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                        主要是用来激励自己
                    </div>
                    <div className="second-li">
                        <ul className='m-t-20 p-6 text-color-grey'>{MyDom}</ul>
                    </div>
                </div>
                <div className="li shadow b-rd-6 p-16 m-10 m-r-16" style={{ width: '250px', height: '180px' }}>
                    <div className="first-header flex-r-start-center"><IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />读书笔记</div>
                    <div className="second-header flex-r-end-center"></div>
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