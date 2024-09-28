import { CharacterAttributes } from './CharacterAttributes';
import { CharacterClasses } from './CharacterClasses';
import { CharacterSkills } from './CharacterSkills';
import { SkillCheck } from './SkillCheck';

export const CharacterSheet = ({ character, updateCharacter }) => {
  const handleAttributeChange = (attribute, value) => {
    const newAttributes = { ...character.attributes, [attribute]: value };
    updateCharacter(character.name, {
      ...character,
      attributes: newAttributes
    });
  };

  const handleSkillChange = (skill, value) => {
    const newSkills = { ...character.skills, [skill]: value };
    updateCharacter(character.name, { ...character, skills: newSkills });
  };

  return (
    <div className="border-2 border-yellow-300 rounded-md p-4">
      <h2 className="text-xl font-bold font-mono mb-4">
        Character: {character.name}
      </h2>
      <SkillCheck character={character} />
      <div className="grid grid-cols-3 gap-4">
        <CharacterAttributes
          attributes={character.attributes}
          handleAttributeChange={handleAttributeChange}
        />
        <CharacterClasses attributes={character.attributes} />
        <CharacterSkills
          skills={character.skills}
          attributes={character.attributes}
          handleSkillChange={handleSkillChange}
        />
      </div>
    </div>
  );
};
