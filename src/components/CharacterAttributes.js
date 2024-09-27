import { useMemo } from 'react';
import { MAX_TOTAL_ATTRIBUTES } from '../consts';
import { calculateAttributeModifier } from '../utils';

export const CharacterAttributes = ({ attributes, setAttributes }) => {
  const totalAttributes = useMemo(
    () => calculateTotalAttributes(attributes),
    [attributes]
  );

  const maxedOutAttributes = totalAttributes >= MAX_TOTAL_ATTRIBUTES;

  const handleIncrement = attribute => {
    const nextAttributeValue = attributes[attribute] + 1;
    setAttributes(prevAttributes => ({
      ...prevAttributes,
      [attribute]: nextAttributeValue
    }));
  };

  const handleDecrement = attribute => {
    const nextAttributeValue = attributes[attribute] - 1;
    setAttributes(prevAttributes => ({
      ...prevAttributes,
      [attribute]: nextAttributeValue
    }));
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-2 border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold">Attributes</h2>
      <p className={`${maxedOutAttributes ? 'text-red-500' : ''}`}>
        Total Attributes: {totalAttributes}
      </p>
      <div className="flex flex-col gap-2">
        {Object.keys(attributes).map(attribute => (
          <Attribute
            key={attribute}
            name={attribute}
            value={attributes[attribute]}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            maxedOutAttributes={maxedOutAttributes}
          />
        ))}
      </div>
    </div>
  );
};

const Attribute = ({
  name,
  value,
  handleIncrement,
  handleDecrement,
  maxedOutAttributes
}) => {
  const modifier = calculateAttributeModifier(value);
  return (
    <div className="flex flex-row gap-2">
      <span className="font-bold">{name}</span>
      <button
        onClick={() => handleIncrement(name)}
        disabled={maxedOutAttributes}
      >
        +
      </button>
      <button onClick={() => handleDecrement(name)}>-</button>
      <span>Value: {value}</span>
      <span>Modifier: {modifier}</span>
    </div>
  );
};

const calculateTotalAttributes = attributes => {
  return Object.values(attributes).reduce((acc, value) => acc + value, 0);
};
