import { useSelector, useDispatch } from "react-redux";
import { increment } from "../store";

function Redux() {
  const count = useSelector((state) => state.calculate.value);
  const dispatch = useDispatch()
  const handleAdd = ()=>{
    dispatch(increment())
  }
  return (
    <>
      redux当前数:{count}
      <button onClick={handleAdd}>add</button>
    </>
  );
}

export default Redux;