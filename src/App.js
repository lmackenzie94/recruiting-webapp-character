import './App.css';
import { CharacterSheet } from './components/CharacterSheet.js';
import { SkillResults } from './components/SkillResults.js';
import { useCharacters } from './hooks/useCharacters.js';
import { PartySkillCheck } from './components/PartyKillCheck.js';
import { SkillResultsProvider } from './contexts/skillResults.js';
import { AddCharacterForm } from './components/AddCharacterForm.js';

// CHARACTER OBJECT:
// {
//   "name": "Character Name",
//   "attributes": {
//     "Strength": 14,
//     "Dexterity": 10,
//     ...
//   },
//   "skills": {
//     "Acrobatics": 0,
//     "Animal Handling": 0,
//     "Arcana": 0,
//     ...
//   }
// }

function App() {
  const {
    characters,
    addCharacter,
    updateCharacter,
    saveCharacters,
    removeAllCharacters,
    resetAllCharacters
  } = useCharacters();

  return (
    <SkillResultsProvider>
      <div className="App">
        <header className="App-header py-4">
          <h1 className="text-2xl font-black">PolicyMe | Character Sheets</h1>
        </header>
        <main className="App-section">
          <AddCharacterForm addCharacter={addCharacter} />
          <div className="flex gap-2 my-4 justify-center">
            <button onClick={saveCharacters}>Save Characters</button>
            <button onClick={resetAllCharacters}>Reset Characters</button>
            <button onClick={removeAllCharacters}>Remove All Characters</button>
          </div>
          <SkillResults />
          <PartySkillCheck characters={characters} />
          <section className="container mx-auto">
            {characters.map(character => (
              <CharacterSheet
                key={character.name}
                character={character}
                updateCharacter={updateCharacter}
              />
            ))}
          </section>
        </main>
      </div>
    </SkillResultsProvider>
  );
}

export default App;
