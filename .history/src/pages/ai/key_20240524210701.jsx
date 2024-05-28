
import { Button } from "antd";
function Key() {

    return <>

        <div className="bottom-frame flex-c-center-center p-20">
            <div className="first-frame p-10">
                <div>粘贴文本</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>V</Button>
                </div>

            </div>
            <div className="second-frame p-10">
                <div>粘贴文本</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>V</Button>
                </div>
            </div>
            <div className="third-frame p-10">
                <div>粘贴文本</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>V</Button>
                </div>
            </div>
            <div className="fourth-frame p-10">
                <div>短语补全拓展</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>;</Button>
                </div>
            </div>
            <div className="fifth-frame p-10">
                <div>文本补全</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>'</Button>
                </div>
            </div>
            <div className="sixth-frame p-10">
                <div>智能纠错</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>M</Button>
                </div>
            </div>
            <div className="seventh-frame">
                <div>文本润色</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>,</Button>
                </div>
            </div>
            <div className="eighth-frame">
                <div>输入法切换</div>
                <div className="button-frame">
                    <Button>ctrl</Button>+<Button>/</Button>
                </div>
            </div>
            <div className="ninth-frame">
                <div>短语补全候选选中</div>
                <div className="button-frame">
                    <Button>tab</Button>
                </div>
            </div></div>


    </>
}

export default Key;