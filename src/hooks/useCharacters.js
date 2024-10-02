import { useCallback, useEffect, useState } from 'react';
import { API_URL, ATTRIBUTE_LIST, SKILL_LIST } from '../consts';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacters = useCallback(async signal => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, { signal });
      if (!response.ok) {
        throw new Error('Failed to get characters from API');
      }
      const data = await response.json();
      setCharacters(data.message === 'Item not found' ? [] : data.body);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetchCharacters(abortController.signal);
    return () => abortController.abort();
  }, [fetchCharacters]);

  const addCharacter = name => {
    setCharacters(prevCharacters => {
      const updatedCharacters = [
        ...prevCharacters,
        { name, attributes: initialAttributes, skills: initialSkills }
      ];
      saveCharacters(updatedCharacters);
      return updatedCharacters;
    });
  };

  const updateCharacter = useCallback((characterName, updatedCharacter) => {
    setCharacters(prevCharacters =>
      prevCharacters.map(character =>
        character.name === characterName ? updatedCharacter : character
      )
    );
  }, []);

  const saveCharacters = async updatedCharacters => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCharacters || characters)
      });
      if (!response.ok) {
        throw new Error('Failed to save characters to API');
      }
      console.log('Characters saved successfully');
      return 'Characters saved successfully';
    } catch (error) {
      setError(error);
    }
  };

  const removeAllCharacters = () => {
    setCharacters([]);
    saveCharacters([]);
  };

  const resetAllCharacters = () => {
    setCharacters(prevCharacters => {
      const updatedCharacters = prevCharacters.map(character => ({
        ...character,
        attributes: initialAttributes,
        skills: initialSkills
      }));
      saveCharacters(updatedCharacters);
      return updatedCharacters;
    });
  };

  return {
    characters,
    loading,
    error,
    addCharacter,
    updateCharacter,
    saveCharacters,
    removeAllCharacters,
    resetAllCharacters
  };
};
