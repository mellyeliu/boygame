import logo from "./logo.svg";
import "./App.css";
import Character from "./Components/Character";
import HeadToHead from "./Pages/HeadToHead";
import Brainstorm from "./Pages/Brainstorm";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App">
      <HeadToHead title="Would you like to go on a date?"/>
      {/* <Brainstorm title="Virtues"/> */}
      {/* <Homepage /> */}

      {/* <Character
        tidbit={"Frames his first earned dollar in home office"}
        trade={"Frames his first earned dollar in home office"}
        virtue={"Frames his first earned dollar in home office"}
        vice={"Frames his first earned dollar in home office"}
      /> */}
    </div>
  );
}

export default App;
