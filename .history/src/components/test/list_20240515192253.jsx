class List extends React.Component{

    render(){
        return (
               
        <ul>
            {
                this.state.filterPos.map((item,index)=><li key={index}>{item}</li>)
            }

        </ul>
        )

    }
}   
        
        
     