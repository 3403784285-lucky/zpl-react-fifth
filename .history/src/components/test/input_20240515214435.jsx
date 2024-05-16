import React  from "react";
class Input extends React.Component{
    render(){
        return (<>
        <input type="search" onChange={this.onHandleChange}></input>
        </>)
    }

}
export 