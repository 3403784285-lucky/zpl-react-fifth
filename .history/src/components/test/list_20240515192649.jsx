class List extends React.Component{
const {filterPos}=this.props;
    render(){
        return (
               
        <ul>
            {
               filterPos.map((item,index)=><li key={index}>{item}</li>)
            }

        </ul>
        )

    }
}   
        
        
     export default List