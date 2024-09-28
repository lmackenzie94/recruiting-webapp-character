import { useSkillResults } from '../contexts/skillResults';

export const SkillResults = () => {
  const { skillResults } = useSkillResults();
  if (!skillResults) return <p>No skill results</p>;

  const { character, selectedSkill, roll, dc } = skillResults;
  const characterSkillValue = character?.skills[selectedSkill];
  const isSuccess = characterSkillValue + roll >= dc;
  if (!character?.name) return null;
  return (
    <div>
      <p>Character: {character?.name}</p>
      <p>
        Skill: {selectedSkill} ({characterSkillValue})
      </p>
      <p>You Rolled: {roll}</p>
      <p>DC was: {dc}</p>
      <p>Result: {isSuccess ? 'Success!' : 'Failure'}</p>
    </div>
  );
};
