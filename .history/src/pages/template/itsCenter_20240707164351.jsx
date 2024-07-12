import { Radio } from 'antd';
const options = [
    {
      label: 'Apple',
      value: 'Apple',
    },
    {
      label: 'Pear',
      value: 'Pear',
    },
    {
      label: 'Orange',
      value: 'Orange',
      title: 'Orange',
    },
  ];
function ItsCenter()
{
    const [value3, setValue3] = useState('Apple');
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
      };
  return <div className='flex-c-center-center'>

   <Radio.Group className='m-t-20' options={options} onChange={onChange3} value={value3} optionType="button" />

  
  </div>
}
export default ItsCenter;