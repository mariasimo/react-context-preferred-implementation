import React, { useEffect } from "react";
import {
  useCharactersDispatch,
  useCharactersState,
} from "../context/characters-context";

const Characters = () => {
  const { characters: list, loading, error } = useCharactersState();
  const { fetchCharacters, dispatch } = useCharactersDispatch();

  useEffect(() => dispatch(() => fetchCharacters(dispatch)), []);

  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <ul>
          {list.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      )}
      {error && "Error: " + error.message}
    </div>
  );
};

export default Characters;
