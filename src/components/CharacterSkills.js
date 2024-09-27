import { useMemo } from 'react';
import { INITIAL_POINTS_TO_SPEND, SKILL_LIST } from '../consts';
import { calculateAttributeModifier } from '../utils';

export const CharacterSkills = ({ attributes, skills, setSkills }) => {
  // update points to spend when Intelligence attribute changes
  const pointsToSpend = useMemo(() => {
    console.log('attributes.Intelligence', attributes.Intelligence);
    return (
      INITIAL_POINTS_TO_SPEND +
      4 * calculateAttributeModifier(attributes.Intelligence)
    );
  }, [attributes.Intelligence]);

  const pointsSpent = getTotalPointsSpent(skills, attributes);
  const isOutOfPoints = pointsSpent >= pointsToSpend;

  return (
    <div className="flex flex-col gap-2 p-4 border-2 border-gray-300 rounded-md">
      <h2 className="text-xl font-bold font-mono mb-4">Skills</h2>

      <p>Points to spend: {pointsToSpend}</p>
      <p className={isOutOfPoints ? 'text-red-500' : 'text-green-500'}>
        Points spent: {pointsSpent}
      </p>
      <div className="flex flex-col gap-2">
        {Object.entries(skills).map(([skillName, points]) => (
          <Skill
            key={skillName}
            skill={skillName}
            skillPoints={points}
            setSkills={setSkills}
            attributes={attributes}
            isOutOfPoints={isOutOfPoints}
          />
        ))}
      </div>
    </div>
  );
};

const Skill = ({
  skill,
  setSkills,
  skillPoints,
  attributes,
  isOutOfPoints
}) => {
  const modifier = SKILL_LIST.find(s => s.name === skill).attributeModifier;
  const modifierValue = calculateAttributeModifier(attributes[modifier]);

  const totalPoints = skillPoints + modifierValue;

  const handleIncrement = () => {
    setSkills(prevSkills => ({ ...prevSkills, [skill]: skillPoints + 1 }));
  };

  const handleDecrement = () => {
    setSkills(prevSkills => ({ ...prevSkills, [skill]: skillPoints - 1 }));
  };

  return (
    <div key={skill} className="flex flex-row gap-2">
      <p>
        {skill}: {skillPoints}
      </p>
      <p>
        (Modifier: {modifier}): {modifierValue}
      </p>
      <button onClick={handleIncrement} disabled={isOutOfPoints}>
        +
      </button>
      <button disabled={skillPoints <= 0} onClick={handleDecrement}>
        -
      </button>
      <p>Total: {totalPoints}</p>
    </div>
  );
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
