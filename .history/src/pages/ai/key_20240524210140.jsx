
import { Button } from "antd";
function Key()
{

      return <>
      <div className="first-frame">
        <div>粘贴文本</div>
        <div className="button-frame">
            <Button>ctrl</Button>+<Button>V</Button>
        </div>

      </div>
      <div className="second-frame">
      <div>粘贴文本</div>
        <div className="button-frame">
            <Button>ctrl</Button>+<Button>V</Button>
        </div>
      </div>
      <div className="third-frame">
      <div>粘贴文本</div>
        <div className="button-frame">
            <Button>ctrl</Button>+<Button>V</Button>
        </div>
      </div>
      <div className="fourth-frame">
      <div>短语补全拓展</div>
        <div className="button-frame">
            <Button>ctrl</Button>+<Button>;</Button>
        </div>
      </div>
      <div className="fifth-frame">
      <div>文本补全</div>
        <div className="button-frame">
            <Button>ctrl</Button>+<Button>'</Button>
        </div>
      </div>
      <div className="sixth-frame">
      <div>智能纠错</div>
        <div className="button-frame">
            <Button>ctrl</Button>+<Button>M</Button>
        </div>
      </div>
      <div className="seventh-frame">
      <div>文本润色</div>
        <div className="button-frame">
            <Button>ctrl</Button>+<Button>V</Button>
        </div>
      </div>

      </>
}

export default Key;