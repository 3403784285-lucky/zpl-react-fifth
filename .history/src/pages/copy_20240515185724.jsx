import React from "react"

class Copy extends React.Component{
   constructor(){
    super()
    this.state={
        pos:["好困啊","睡着了"],
 
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
    const comparedPos=this.state.pos.filter(po=>{
        return po.includes(event.target.value)
    })
  
    this.setState(()=>{
       return {filterPos:comparedPos}
    },()=>{
        
    })
    }
    render(){
        return (<>
        <input type="search" onChange={this.onHandleChange}></input>
        <ul>
            {
                this.state.filterPos.map((item,index)=><li key={index}>{item}</li>)
            }

        </ul>
       
        
        </>)
    }
}
export default Copy