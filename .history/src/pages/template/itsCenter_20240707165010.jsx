import { Radio, Card } from 'antd';

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
        <div className='flex' style={{ justifyContent: 'space-between' }}>
            <Card className='m-r-10'
                style={{
                    width: 250,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card
                style={{
                    width: 250,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card
                style={{
                    width: 250,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card
                style={{
                    width: 250,
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