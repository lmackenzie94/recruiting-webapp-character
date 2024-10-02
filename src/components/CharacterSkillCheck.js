import { useSkillResults } from '../contexts/skillResults';
import { SkillCheck } from './SkillCheck';

export const CharacterSkillCheck = ({ character }) => {
  const { setSkillResults } = useSkillResults();

  const skillOptions = Object.keys(character.skills).map(skill => ({
    name: skill,
    value: skill
  }));

  const handleSubmit = ({ selectedSkill, dc, roll }) => {
    setSkillResults({ character, selectedSkill, dc, roll });
  };

  return <SkillCheck onSubmit={handleSubmit} skillOptions={skillOptions} />;
};
