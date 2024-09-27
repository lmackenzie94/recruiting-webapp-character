import { CLASS_LIST } from '../consts';

export const CharacterClasses = ({ attributes }) => {
  return (
    <div className="flex flex-col gap-2 p-4 border-2 border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold">Classes</h2>
      {Object.keys(CLASS_LIST).map(cls => {
        return <Class key={cls} cls={cls} attributes={attributes} />;
      })}
    </div>
  );
};

const Class = ({ cls, attributes }) => {
  const attributeRequirements = CLASS_LIST[cls];
  const characterIsEligible = checkRequirements(
    attributeRequirements,
    attributes
  );

  return (
    <details key={cls}>
      <summary
        className={
          characterIsEligible
            ? 'bg-green-200 text-green-800'
            : 'bg-red-200 text-red-800'
        }
      >
        {cls}
      </summary>
      <ul>
        {Object.keys(attributeRequirements).map(attribute => (
          <li key={attribute}>
            {attribute}: {attributeRequirements[attribute]}
          </li>
        ))}
      </ul>
    </details>
  );
};

const checkRequirements = (attributeRequirements, attributes) => {
  return Object.keys(attributeRequirements).every(
    attribute => attributes[attribute] >= attributeRequirements[attribute]
  );
};
