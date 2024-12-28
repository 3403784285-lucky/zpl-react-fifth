
function Hot() {
    const copyItems = items.map((item) => {

        return<div className="key-frame flex-r-center-center p-10">
            <div >{item.key}</div>
            <div className="button-frame m-l-10">
                {item.mark}
            </div>

        </div>
    })
    return <>
        <div className="bottom-frame flex-c-center-center p-10 m-100">
            {copyItems}
        </div>
    </>
}

export default Hot;