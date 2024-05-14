// import { useStorage } from "web-localstorage-plus";

// function Storage() {
//   const storage = useStorage();
//   storage.setItem("name", "spp", "author");
//   storage.setItem("age", 29, "author");
//   return <>learn storage</>;
// }

// export default Storage;
import { useSelector, useDispatch } from "react-redux";
import { increment} from "../store";

function Tesr() {
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

export default Test;