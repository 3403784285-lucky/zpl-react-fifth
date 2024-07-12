import { Radio, Card } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js',


    ],
});
const { Meta } = Card;
function MyIts()
{
    const [value3, setValue3] = useState('1');
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };
    const openTemplate=()=>{
        
    }
    return <div className='flex-wrap p-20 m-t-20' style={{ justifyContent: 'space-between' }}>
            <Card className='m-r-10 shadow'
                onClick={openTemplate}
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
}
export default MyIts;