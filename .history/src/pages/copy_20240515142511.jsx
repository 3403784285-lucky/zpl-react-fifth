import React from "react"

class Copy extends React.Component{
   constructor(){
    super()
    this.state={
        pos:["好困啊","睡着了"]
    }
   }
   componentDidMount(){
    this.state.pos=["哈哈哈哈","睡醒了"]
    console.log(this.state)
   }
    render(){
        return (<>
        <ul>

        </ul>
       
        
        </>)
    }
}
export default Copy