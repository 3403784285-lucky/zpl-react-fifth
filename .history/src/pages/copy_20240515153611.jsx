import React from "react"

class Copy extends React.Component{
   constructor(){
    super()
    this.state={
        pos:["好困啊","睡着了"],
        searching:'',
        filterPos:[]
       
    }
   }
   componentDidMount(){
    this.setState({
        pos:["1","2"],
        filterPos:["1","2"]
    })
   }

   onHandleChange=event=>{
    console.log(event)
    this.setState(()=>{
        searching:event.target.value
    },()=>{
        console.log(this.state.searching)
    })
}
    render(){
        return (<>
        <input type="search" onChange={this.onHandleChange}></input>
        <ul>
            {
                this.state.pos.map((item,index)=><li key={index}>{item}</li>)
            }

        </ul>
       
        
        </>)
    }
}
export default Copy