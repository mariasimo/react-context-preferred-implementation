import React, { createContext, useContext, useReducer } from "react";

const CountStateContext = createContext();
const CountDispatchContext = createContext();

const initState = { count: 0 };

const countReducer = (state, action) => {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const CountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countReducer, initState);
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
};

const useCountState = () => {
  const state = useContext(CountStateContext);

  if (state === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return state;
};

const useCountDispatch = () => {
  const dispatch = useContext(CountDispatchContext);

  if (dispatch === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }

  // here we can export simply the dispatch
  // or alternatively create con action creators to export some more tailored logic
  const increment = () => dispatch({ type: "increment" });
  const decrement = () => dispatch({ type: "decrement" });

  return { increment, decrement };
};

export { CountProvider, useCountState, useCountDispatch };
