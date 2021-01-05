import { useContext, useReducer, createContext } from "react";

const CharactersStateContext = createContext();
const CharactersDispatchContext = createContext();

const initState = {
  characters: ["Holi", "Holi"],
  loading: false,
  error: null,
};
const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      characters: [], //empty
      loading: true,
      error: null,
    };
  }
  if (action.type === "RESPONSE_OK") {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      characters: [], //empty
      loading: false,
      error: action.payload.error,
    };
  }

  throw new Error(`Unhandled action type: ${action.type}`);
};

const useAsyncReducer = (reducer, initState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const asyncDispatch = (action) => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, asyncDispatch];
};

const CharactersProvider = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(reducer, initState);

  return (
    <CharactersDispatchContext.Provider value={dispatch}>
      <CharactersStateContext.Provider value={state}>
        {children}
      </CharactersStateContext.Provider>
    </CharactersDispatchContext.Provider>
  );
};

const useCharactersState = () => {
  const state = useContext(CharactersStateContext);
  if (state === undefined) {
    throw new Error(
      "useCharacterState must be used within a CharacterProvider"
    );
  }
  return state;
};
const useCharactersDispatch = () => {
  const dispatch = useContext(CharactersDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      "useCharacterDispatch must be used within a CharacterProvider"
    );
  }

  const fetchCharacters = (asyncDispatch) => {
    asyncDispatch({ type: "LOADING" });
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((response) => {
        const characters = response.results.map((ch) => ch.name);
        asyncDispatch({ type: "RESPONSE_OK", payload: { characters } });
      })
      .catch((error) => {
        asyncDispatch({ type: "ERROR", payload: { error } });
      });
  };

  return { dispatch, fetchCharacters };
};
export { CharactersProvider, useCharactersState, useCharactersDispatch };
