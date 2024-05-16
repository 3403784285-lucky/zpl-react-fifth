import React from "react"

class Copy extends React.Component{
   constructor(){
    super()
    this.state={
        pos:["好困啊","睡着了"]
    }
   }
   componentDidMount(){console.log(this.state)
    this.setState=({
       pos: ["哈哈哈哈","睡醒了"],
    })
    
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