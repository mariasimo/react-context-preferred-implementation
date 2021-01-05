import React from "react";
import { useCountState } from "../context/count-context";

const CountDisplay = () => {
  const { count } = useCountState();

  return <div className="count-display">{count}</div>;
};

export default CountDisplay;
