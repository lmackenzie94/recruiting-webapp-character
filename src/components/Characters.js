import { CharacterSheet } from './CharacterSheet';

export const Characters = ({ characters }) => {
  return (
    <section className="container mx-auto">
      {characters.map(character => (
        <CharacterSheet key={character.name} character={character} />
      ))}
    </section>
  );
};
