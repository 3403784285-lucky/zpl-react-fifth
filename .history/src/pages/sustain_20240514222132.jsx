import { useSelector, useDispatch } from "react-redux";
import { increment} from "../store";

function Sustain() {
  const count = useSelector((state) => state.calculate.value);
  const dispatch = useDispatch()
  const handleAdd = ()=>{
    dispatch(increment())
  }
  return (
    <div>
      redux当前数:{count}
      <button onClick={handleAdd}>add</button>
    </div>
  );
}

export default Sustain;
