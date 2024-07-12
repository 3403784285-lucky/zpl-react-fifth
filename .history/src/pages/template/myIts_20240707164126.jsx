function MyIts()
{
    const [value3, setValue3] = useState('Apple');
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
      };
  return <>
  

  
  </>
}
export default MyIts;