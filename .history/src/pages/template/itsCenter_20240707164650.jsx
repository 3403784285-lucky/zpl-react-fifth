import { Radio } from 'antd';
const options = [
    {
        label: '期刊论文',
        value: 'Apple',
    },
    {
        label: '会议论文',
        value: 'Apple',
    },
    {
        label: '学位论文',
        value: 'Apple',
    },
    {
        label: '专著',
        value: 'Pear',
    },
    
];
function ItsCenter() {
    const [value3, setValue3] = useState('Apple');
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };
    return <div className='flex-c-center-center'>

        <Radio.Group className='m-t-20' size='large' options={options} onChange={onChange3} value={value3} optionType="button" />


    </div>
}
export default ItsCenter;