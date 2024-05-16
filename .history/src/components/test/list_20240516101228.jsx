import React from "react";
function List({filterPos}){
    console.log(filterPos)
    return( <ul>
        {
           filterPos.map((item,index)=>{
           return (<div key={index}>
            <li>{item.name}</li>
                            
            <img src={`/img/test${item.id}.jpg`}/>

           </div>)
          })
        }

    </ul>)
}

// class List extends React.Component{

//     render(){
//         const {filterPos}=this.props;

//         return (
               
//         <ul>
//             {
//                filterPos.map((item,index)=>{
//                return (<div key={index}>
//                 <li>{item.name}</li>
                                
//                 <img src={`/img/test${item.id}.jpg`}/>

//                </div>)
//               })
//             }

//         </ul>
//         )

//     }
// }   
           
     export default List

