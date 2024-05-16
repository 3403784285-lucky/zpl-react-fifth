import React  from "react";


class List extends React.Component{

    render(){
        const {filterPos}=this.props;

        return (
               
        <ul>
            {
               filterPos.map((item,index)=>{
               return (<div key={index}>
                                
                <img src="/img/test1.jpg"/>

               </div>)
              })
            }

        </ul>
        )

    }
}   
           
     export default List

