import React from "react"
import List from "../components/test/list"
import  Input  from "../components/test/input"
// class Copy extends React.Component{
//    constructor(){
//     super()
//     this.state={
//         pos:["好困啊","睡着了"],
//         filterPos:[]
       
//     }
//    }
//    componentDidMount(){
//     let result=[{name:"1"},{name:"2"}]
//     this.setState({
//         pos:result,
//         filterPos:result
//     })
//     result.map((po,index)=>{
//         po.id=index+1
//     })
//    }

//    onHandleChange=event=>{
//     const comparedPos=this.state.pos.filter(po=>{
//         return po.name.includes(event.target.value)
//     })
  
//     this.setState(()=>{
//        return {filterPos:comparedPos}
//     },()=>{
        
//     })
//     }
//     render(){
//         return (<>
//         <Input onHandleChange={this.onHandleChange}/>
//         <List filterPos={this.state.filterPos}/>
       
        
//         </>)
//     }
// }

function Copy(){
    const {pos,setPos}=React.useState([]);
    console.log(pos+"哈哈哈")
    const {filterPos,setFilterPos}=React.useState([]);
    React.useEffect(()=>{
             let result=[{name:"1"},{name:"2"}]
            setFilterPos(result)
            setPos(result)
            result.map((po,index)=>{
                po.id=index+1
            })
    })
    
    const onHandleChange=event=>{
        const comparedPos=pos.filter(po=>{
            return po.name.includes(event.target.value)
            
        })
        setFilterPos(comparedPos)
    }
    return (<>
          <Input onHandleChange={onHandleChange}/>
          <List filterPos={filterPos}/>  
          </>)
}
export default Copy