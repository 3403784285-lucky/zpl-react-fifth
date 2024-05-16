import React  from "react";

class List extends React.Component{

    render(){
        const {filterPos}=this.props;
        return (
               
        <ul>
            {
               filterPos.map((item,index)=>{
               return (<>
                <li key={index}>{item}</li>
                    <img src="{}"  />
               </>)
              })
            }

        </ul>
        )

    }
}   
           
     export default List

