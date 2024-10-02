import { SKILL_LIST } from '../consts';
import { SkillCheck } from './SkillCheck';
import { useSkillResults } from '../contexts/skillResults';

export const PartySkillCheck = ({ characters }) => {
  const { setSkillResults } = useSkillResults();
  const skillOptions = SKILL_LIST.map(({ name }) => ({
    name,
    value: name
  }));

  const handleSubmit = ({ selectedSkill, dc, roll }) => {
    const characterToUse = getCharacterWithHighestSkill(
      characters,
      selectedSkill
    );
    setSkillResults({ character: characterToUse, selectedSkill, dc, roll });
  };

  return <SkillCheck onSubmit={handleSubmit} skillOptions={skillOptions} />;
};

const getCharacterWithHighestSkill = (characters, skill) => {
  let characterToUse = characters[0];
  let highestSkill = 0;
  characters.forEach(character => {
    const skillValue = character.skills[skill];
    if (skillValue > highestSkill) {
      highestSkill = skillValue;
      characterToUse = character;
    }
  });
  return characterToUse;
};
