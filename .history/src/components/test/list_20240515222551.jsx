import React  from "react";

class List extends React.Component{

    render(){
        const {filterPos}=this.props;

        return (
               
        <ul>
            {
               filterPos.map((item,index)=>{
               return (<div key={index}>
                <li >{item}</li>
                
                <img src="../../style/img/test1.jpg" />
                https://ts1.cn.mm.bing.net/th/id/R-C.4f8e9489ce1f9f2ed72b16154e44fdc9?rik=jkwQu2NxwJ6R5A&riu=http%3a%2f%2fimg.touxiangwu.com%2f2020%2f3%2fiUrIbu.jpg&ehk=UtpJVb9Eb82cTLrtjrHCLYKgX5rRuiTFDycWPYF%2bccQ%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1
               </div>)
              })
            }

        </ul>
        )

    }
}   
           
     export default List

