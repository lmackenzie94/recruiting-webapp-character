import { useRef } from 'react';
import { SKILL_LIST } from '../consts';
import { useSkillResults } from '../contexts/skillResults';

// TODO: reduce duplication b/w PartySkillCheck and SkillCheck
export const PartySkillCheck = ({ characters }) => {
  const { setSkillResults } = useSkillResults();
  const skillRef = useRef(null);
  const dcRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const selectedSkill = skillRef.current.value;
    const characterToUse = getCharacterWithHighestSkill(
      characters,
      selectedSkill
    );
    const dc = dcRef.current.value;
    const roll = Math.floor(Math.random() * 20) + 1;
    setSkillResults({ character: characterToUse, selectedSkill, dc, roll });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 border-2 border-blue-300 rounded-md p-4"
    >
      <label htmlFor="skill">Skill</label>
      <select
        id="skill"
        defaultValue=""
        ref={skillRef}
        required
        className="text-black"
      >
        <option value="" disabled>
          Select Skill
        </option>
        {SKILL_LIST.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <label htmlFor="dc">DC</label>
      <input
        type="number"
        id="dc"
        ref={dcRef}
        required
        className="text-black"
      />
      <button type="submit">Roll</button>
    </form>
  );
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
