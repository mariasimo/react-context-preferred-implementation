import React from "react";
import { useCountState } from "../context/count-context";

const CountDisplay = () => {
  const { count } = useCountState();

  console.log("Count Display rendered");

  return <div className="count-display">{count}</div>;
};

export default CountDisplay;
