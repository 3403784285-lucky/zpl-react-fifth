import React from "react"

class Copy extends React.Component{
   constructor(){
    super()
    this.state={
        pos:["好困啊","睡着了"],
        searching:''
       
    }
   }
   componentDidMount(){
   
    this.setState(
    {
      return{searching:}
    }
     );
     console.log("组件已挂载")
   
    }
    render(){
        return (<>
        <input type="search" onChange={event=>{
            console.log(event)
        }}></input>
        <ul>
            {
                this.state.pos.map((item,index)=><li key={index}>{item}</li>)
            }

        </ul>
       
        
        </>)
    }
}
export default Copy