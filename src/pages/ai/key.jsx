
import { Button, message } from "antd";
const items = [
    {
        key: "粘贴文本",
        mark: <><Button>ctrl</Button><span>+</span><Button>V</Button></>,
    },
    {
        key: "短语补全扩展",
        mark: <><Button>ctrl</Button><span>+</span><Button>;</Button></>,
    },
    {
        key: "文本补全",
        mark: <><Button>ctrl</Button><span>+</span><Button>'</Button></>,
    },
    {
        key: "智能纠错",
        mark: <><Button>ctrl</Button><span>+</span><Button>M</Button></>,
    },
    {
        key: "文本润色",
        mark: <><Button>ctrl</Button><span>+</span><Button>,</Button></>,
    },
    {
        key: "输入法切换",
        mark: <><Button>ctrl</Button><span>+</span><Button>/</Button></>,
    },

    {
        key: "短语补全候选选中",
        mark: <Button>tab</Button>,
    },



]


function Key() {
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

export default Key;