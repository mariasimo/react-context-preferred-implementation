import React from "react";
import { useCountDispatch } from "../context/count-context";
const Count = () => {
  const { increment, decrement } = useCountDispatch();

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Count;
