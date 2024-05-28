

function Correction(){
  return <>
  <div className="div">
    <div className="first-frame flex p-30 " style={{justifyContent:'space-between'}}>
        <div className="tip-correction"><strong> <Badge count={show ? 25 : 0} />智能纠错</strong></div>
        <div className="refresh-correction text-color-second"><strong>纠错刷新</strong></div>
    </div>

    

    <img style={{width:'100%'}} src="/img/nodata.png" alt="没有数据" />


  </div>
  
  
  
  </>


}


export default Correction;