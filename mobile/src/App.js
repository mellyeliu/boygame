import "./App.css";
import "./fonts.css";
import TraitComposer from "./Components/Pages/TraitComposer";
import CharacterComposer from "./Components/Pages/CharacterComposer";
import { useMediaQuery } from "react-responsive";
import DesktopScreen from "./Components/Pages/Desktop";
import JoinGame from "./Components/Pages/JoinGame";
import HeadToHead from "./Components/Pages/HeadToHead";

function App() {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  console.log(isMobile);
  return (
    <div className="App">
      <HeadToHead />
      {/* {isMobile ? <TraitComposer type="Virtue" /> : <DesktopScreen />} */}
      {/* {isMobile ? <CharacterComposer /> : <DesktopScreen />} */}
      {/* <CharacterComposer /> */}
      {/* <TraitComposer type="Virtue"/> */}
    </div>
  );
}

export default App;
