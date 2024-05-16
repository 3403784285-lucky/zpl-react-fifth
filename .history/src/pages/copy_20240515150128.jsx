import React from "react"

class Copy extends React.Component{
   constructor(){
    super()
    this.state={
        pos:["好困啊","睡着了"],
       
    }
   }
   componentDidMount(){
    console.log("组件已挂载")
    this.setState=(
    ()=>{
      return {pos: ["1","2"]};
    },
    ()=>{
        console.log(this.state);
    }
     )
    }
    render(){
        return (<>
        <ul>
            {
                this.state.pos.map((item,index)=><li key={index}>{item}</li>)
            }

        </ul>
       
        
        </>)
    }
}
export default Copy