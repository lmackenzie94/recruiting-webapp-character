import { useState } from 'react';
import { CharacterAttributes } from './CharacterAttributes';
import { CharacterClasses } from './CharacterClasses';
import { CharacterSkills } from './CharacterSkills';

export const CharacterSheet = ({ character }) => {
  const [attributes, setAttributes] = useState(character.attributes);
  const [skills, setSkills] = useState(character.skills);

  return (
    <div className="border-2 border-yellow-300 rounded-md p-4">
      <h2 className="text-xl font-bold font-mono mb-4">
        Character: {character.name}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <CharacterAttributes
          attributes={attributes}
          setAttributes={setAttributes}
        />
        <CharacterClasses attributes={attributes} />
        <CharacterSkills
          attributes={attributes}
          skills={skills}
          setSkills={setSkills}
        />
      </div>
    </div>
  );
};
