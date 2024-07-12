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
    return <div className='flex-c-center-center'>

        <Radio.Group className='m-t-20' size='large' options={options} onChange={onChange3} value={value3} optionType="button" />
        <div className='flex-wrap p-20 m-t-20' style={{ justifyContent: 'space-between' }}>
            <Card className='m-r-10'
                hoverable
                style={{
                    width: 280,
                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title={<>
                    <IconFont type="icon-wordIcon" /> 教师花名册</>} />


            </Card>
            <Card className='m-r-10'
                style={{
                    width: 270,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className='m-r-10'
                style={{
                    width: 270,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className='m-r-10'
                style={{
                    width: 270,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>


        </div>

    </div>
}
export default ItsCenter;