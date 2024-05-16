import React  from "react";
import svg from "../../style/img/test1.jpg"
class List extends React.Component{

    render(){
        const {filterPos}=this.props;
        return (
               
        <ul>
            {
               filterPos.map((item,index)=>{
                
               return (<div key={index}>
                <li >{item}</li>
                <img src="{svg}" />
               </div>)
              })
            }

        </ul>
        )

    }
}   
           
     export default List

