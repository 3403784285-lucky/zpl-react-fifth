import React  from "react";

class List extends React.Component{

    render(){
        const {filterPos}=this.props;
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

     