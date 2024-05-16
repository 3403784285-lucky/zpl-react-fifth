import React from "react"
import List from "../components/test/list"
import  Input  from "../components/test/input"
class Copy extends React.Component{
   constructor(){
    super()
    this.state={
        pos:["好困啊","睡着了"],
 
        filterPos:[]
       
    }
   }
   componentDidMount(){
    let result=["1","2"]
    this.setState({
        pos:result,
        filterPos:result
    })
    result.map((po,index)=>{
        po.id=index+1
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
        <Input onHandleChange={this.onHandleChange}/>
        <List filterPos={this.state.filterPos}/>
       
        
        </>)
    }
}
export default Copy