import { useEffect, useState } from 'react';
import { ATTRIBUTE_LIST, SKILL_LIST } from '../consts';

const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attribute) => {
  acc[attribute] = 10;
  return acc;
}, {});

const initialSkills = SKILL_LIST.reduce((acc, skill) => {
  acc[skill.name] = 0;
  return acc;
}, {});

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const savedCharacters = JSON.parse(localStorage.getItem('characters'));
    if (savedCharacters) {
      setCharacters(savedCharacters);
    }
  }, []);

  const addCharacter = name => {
    const newCharacter = {
      name,
      attributes: initialAttributes,
      skills: initialSkills
    };

    setCharacters([...characters, newCharacter]);
  };

  const updateCharacter = (characterName, updatedCharacter) => {
    console.log('updateCharacter', characterName, updatedCharacter);
    const updatedCharacters = [...characters].map(character =>
      character.name === characterName ? updatedCharacter : character
    );
    setCharacters(updatedCharacters);
  };

  const saveCharacters = () => {
    localStorage.setItem('characters', JSON.stringify(characters));
  };

  const removeAllCharacters = () => {
    setCharacters([]);
    localStorage.removeItem('characters');
  };

  const resetAllCharacters = () => {
    const resetCharacters = characters.map(character => ({
      ...character,
      attributes: initialAttributes,
      skills: initialSkills
    }));
    setCharacters(resetCharacters);
    saveCharacters();
  };

  return {
    characters,
    addCharacter,
    updateCharacter,
    saveCharacters,
    removeAllCharacters,
    resetAllCharacters
  };
};
