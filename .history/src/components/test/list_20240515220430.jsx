import React  from "react";

class List extends React.Component{

    render(){
        const {filterPos}=this.props;
        return (
               
        <ul>
            {
               filterPos.map((item,index)=>{
               return (<div key={index}>
                <li >{item}</li>
                <img src="{`../../style/img/test ${index+1}.jpg`}"  />
               </div>)
              })
            }

        </ul>
        )

    }
}   
           
     export default List

