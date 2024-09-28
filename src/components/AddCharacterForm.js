import { useState } from 'react';

export const AddCharacterForm = ({ addCharacter }) => {
  const [characterName, setCharacterName] = useState('');

  const handleAddCharacter = e => {
    e.preventDefault();
    if (characterName.trim()) {
      addCharacter(characterName);
      setCharacterName('');
    } else {
      alert('Character name cannot be empty');
    }
  };

  return (
    <form onSubmit={handleAddCharacter} className="my-4">
      <input
        type="text"
        name="characterName"
        placeholder="Character Name"
        className="text-black"
        value={characterName}
        onChange={e => setCharacterName(e.target.value)}
        required
      />
      <button type="submit">Create Character</button>
    </form>
  );
};
