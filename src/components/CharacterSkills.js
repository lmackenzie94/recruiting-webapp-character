import { useMemo } from 'react';
import { INITIAL_POINTS_TO_SPEND, SKILL_LIST } from '../consts';
import { calculateAttributeModifier } from '../utils';

export const CharacterSkills = ({ character, updateCharacter }) => {
  // update points to spend when Intelligence attribute changes
  const pointsToSpend = useMemo(() => {
    return (
      INITIAL_POINTS_TO_SPEND +
      4 * calculateAttributeModifier(character.attributes.Intelligence)
    );
  }, [character.attributes.Intelligence]);

  const handleSkillChange = (skill, value) => {
    const newSkills = { ...character.skills, [skill]: value };
    updateCharacter(character.name, { ...character, skills: newSkills });
  };

  const pointsSpent = getTotalPointsSpent(
    character.skills,
    character.attributes
  );
  const isOutOfPoints = pointsSpent >= pointsToSpend;

  return (
    <div className="flex flex-col gap-2 p-4 border-2 border-gray-300 rounded-md">
      <h2 className="text-xl font-bold font-mono mb-4">Skills</h2>

      <p>Points to spend: {pointsToSpend}</p>
      <p className={isOutOfPoints ? 'text-red-500' : 'text-green-500'}>
        Points spent: {pointsSpent}
      </p>
      <div className="flex flex-col gap-2">
        {Object.entries(character.skills).map(([skillName, points]) => (
          <Skill
            key={skillName}
            skill={skillName}
            points={points}
            attributes={character.attributes}
            isOutOfPoints={isOutOfPoints}
            handleSkillChange={handleSkillChange}
          />
        ))}
      </div>
    </div>
  );
};

const Skill = ({
  skill,
  points,
  attributes,
  isOutOfPoints,
  handleSkillChange
}) => {
  // TODO: bug - skill points is what's being saved, not total points
  const { modifierName, modifierValue } = getModifier(skill, attributes);

  const handleIncrement = () => {
    handleSkillChange(skill, points + 1);
  };

  const handleDecrement = () => {
    handleSkillChange(skill, points - 1);
  };

  const totalPoints = points + modifierValue;

  return (
    <div key={skill} className="flex flex-row gap-2">
      <p>
        {skill}: {points}
      </p>
      <p>
        (Modifier: {modifierName}): {modifierValue}
      </p>
      <button onClick={handleIncrement} disabled={isOutOfPoints}>
        +
      </button>
      <button disabled={points <= 0} onClick={handleDecrement}>
        -
      </button>
      <p>Total: {totalPoints}</p>
    </div>
  );
};

const getModifier = (skill, attributes) => {
  const modifierName = SKILL_LIST.find(s => s.name === skill).attributeModifier;
  const modifierValue = calculateAttributeModifier(attributes[modifierName]);
  return { modifierName, modifierValue };
};

const getTotalSkillPoints = skills => {
  return Object.values(skills).reduce((acc, curr) => acc + curr, 0);
};

const getTotalModifierPoints = attributes => {
  return Object.values(attributes).reduce(
    (acc, curr) => acc + calculateAttributeModifier(curr),
    0
  );
};

const getTotalPointsSpent = (skills, attributes) => {
  return getTotalSkillPoints(skills) + getTotalModifierPoints(attributes);
};
