import { CharacterAttributes } from './CharacterAttributes';
import { CharacterClasses } from './CharacterClasses';
import { CharacterSkills } from './CharacterSkills';
import { SkillCheck } from './SkillCheck';

export const CharacterSheet = ({ character, updateCharacter }) => {
  return (
    <div className="border-2 border-yellow-300 rounded-md p-4">
      <h2 className="text-xl font-bold font-mono mb-4">
        Character: {character.name}
      </h2>
      <SkillCheck character={character} />
      <div className="grid grid-cols-3 gap-4">
        <CharacterAttributes
          character={character}
          updateCharacter={updateCharacter}
        />
        <CharacterClasses attributes={character.attributes} />
        <CharacterSkills
          character={character}
          updateCharacter={updateCharacter}
        />
      </div>
    </div>
  );
};
