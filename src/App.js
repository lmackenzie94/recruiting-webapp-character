import { useState } from 'react';
import './App.css';
import { Characters } from './components/Characters.js';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts.js';

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

const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attribute) => {
  acc[attribute] = 10;
  return acc;
}, {});

const initialSkills = SKILL_LIST.reduce((acc, skill) => {
  acc[skill.name] = 0;
  return acc;
}, {});

function App() {
  const [characters, setCharacters] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState('');

  const handleAddCharacter = e => {
    e.preventDefault();
    const newCharacter = {
      name: newCharacterName,
      attributes: initialAttributes,
      skills: initialSkills
    };

    setCharacters([...characters, newCharacter]);
    setNewCharacterName('');
  };

  return (
    <div className="App">
      <header className="App-header py-4">
        <h1 className="text-2xl font-black">PolicyMe | Character Sheets</h1>
      </header>
      <main className="App-section">
        <form onSubmit={handleAddCharacter} className="my-4">
          <input
            type="text"
            placeholder="Character Name"
            value={newCharacterName}
            onChange={e => setNewCharacterName(e.target.value)}
            className="text-black"
          />
          <button type="submit">Create Character</button>
        </form>
        <Characters characters={characters} />
      </main>
    </div>
  );
}

export default App;
