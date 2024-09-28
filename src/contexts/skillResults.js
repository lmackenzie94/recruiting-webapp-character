import { createContext, useContext, useState } from 'react';

const SkillResultsContext = createContext();

const SkillResultsProvider = ({ children }) => {
  const [skillResults, setSkillResults] = useState(null);

  return (
    <SkillResultsContext.Provider value={{ skillResults, setSkillResults }}>
      {children}
    </SkillResultsContext.Provider>
  );
};

const useSkillResults = () => {
  return useContext(SkillResultsContext);
};

export { SkillResultsProvider, useSkillResults };
