import './App.css';
import './fonts.css'
import TraitComposer from './Components/Pages/TraitComposer';
import CharacterComposer from './Components/Pages/CharacterComposer';

function App() {
  return (
    <div className="App">
      <CharacterComposer/>
      {/* <TraitComposer type="Virtue"/> */}
    </div>
  );
}

export default App;
