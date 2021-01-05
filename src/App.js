import Characters from "./components/Characters";
import Count from "./components/Count";
import CountDisplay from "./components/CountDisplay";
import { CharactersProvider } from "./context/characters-context";
import { CountProvider } from "./context/count-context";

function App() {
  return (
    <div className="App">
      <div className="provider-thing">
        <CountProvider>
          <h3>Count thingy</h3>
          <p>Use context preferred implementation</p>
          <CountDisplay />
          <Count />
        </CountProvider>
      </div>
      <div className="async-provider-thing">
        <CharactersProvider>
          <h3>Character list</h3>
          <p>
            Something completely unrelated to demonstrate async management with
            custom useReducer
          </p>
          <Characters />
        </CharactersProvider>
      </div>
    </div>
  );
}

export default App;
