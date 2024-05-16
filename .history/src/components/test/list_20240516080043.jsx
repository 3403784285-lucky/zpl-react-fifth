import React  from "react";
import {require} from 'node'

class List extends React.Component{

    render(){
        const {filterPos}=this.props;

        return (
               
        <ul>
            {
               filterPos.map((item,index)=>{
               return (<div key={index}>
                                
                <img src="@/" alt="" />

               </div>)
              })
            }

        </ul>
        )

    }
}   
           
     export default List

