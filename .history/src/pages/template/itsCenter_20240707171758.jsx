import { Radio, Card } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js',


    ],
});
const { Meta } = Card;
const options = [
    {
        label: '期刊论文',
        value: '1',
    },
    {
        label: '会议论文',
        value: '2',
    },
    {
        label: '学位论文',
        value: '3',
    },
    {
        label: '专著',
        value: '4',
    },

];
function ItsCenter() {
    const [value3, setValue3] = useState('1');
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };
    return <div className='flex-c-center-center' style={{ height: '73.5vh', overflowY: "auto" }}>

        <Radio.Group className='m-t-20' size='large' options={options} onChange={onChange3} value={value3} optionType="button" />
        <div className='flex-wrap p-20 m-t-20' style={{ justifyContent: 'space-between' }}>
            <Card className='m-r-10 shadow'
                onClick={}
                hoverable={true}
               
                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>
            <Card className='m-r-10 shadow'
                hoverable
          
                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>
            <Card className='m-r-10 shadow'
                hoverable
                
                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>
            <Card className='m-r-10 shadow'
                hoverable
           
                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>




        </div>

    </div>
}
export default ItsCenter;