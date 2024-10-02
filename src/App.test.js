import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useCharacters } from './hooks/useCharacters';

jest.mock('./hooks/useCharacters');

describe('App Component', () => {
  const mockAddCharacter = jest.fn();
  const mockUpdateCharacter = jest.fn();
  const mockSaveCharacters = jest.fn();
  const mockResetAllCharacters = jest.fn();
  const mockRemoveAllCharacters = jest.fn();

  beforeEach(() => {
    useCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: null,
      addCharacter: mockAddCharacter,
      updateCharacter: mockUpdateCharacter,
      saveCharacters: mockSaveCharacters,
      removeAllCharacters: mockRemoveAllCharacters,
      resetAllCharacters: mockResetAllCharacters
    });
  });

  test('renders header', () => {
    render(<App />);
    expect(screen.getByText('PolicyMe | Character Sheets')).toBeInTheDocument();
  });

  test('renders AddCharacterForm', () => {
    render(<App />);
    expect(screen.getByText('Add Character')).toBeInTheDocument();
  });

  test('renders "No characters saved yet" when characters array is empty', () => {
    render(<App />);
    expect(screen.getByText('No characters saved yet')).toBeInTheDocument();
  });

  test('renders loading message when loading is true', () => {
    useCharacters.mockReturnValue({
      characters: [],
      loading: true,
      error: null
    });
    render(<App />);
    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    useCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: new Error('Test error')
    });
    render(<App />);
    expect(
      screen.getByText('Error loading characters: Test error')
    ).toBeInTheDocument();
  });

  test('renders CharacterSheet components when characters are present', () => {
    const mockCharacters = [
      { name: 'Character 1', attributes: {}, skills: {} },
      { name: 'Character 2', attributes: {}, skills: {} }
    ];
    useCharacters.mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: null
    });
    render(<App />);
    expect(screen.getByText('Character: Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character: Character 2')).toBeInTheDocument();
  });

  test('buttons are disabled when there are no characters', () => {
    render(<App />);
    expect(screen.getByText('Save Characters')).toBeDisabled();
    expect(screen.getByText('Reset Characters')).toBeDisabled();
    expect(screen.getByText('Remove All Characters')).toBeDisabled();
  });

  test('buttons are enabled when there are characters', () => {
    useCharacters.mockReturnValue({
      characters: [{ name: 'Character 1', attributes: {}, skills: {} }],
      loading: false,
      error: null
    });
    render(<App />);
    expect(screen.getByText('Save Characters')).toBeEnabled();
    expect(screen.getByText('Reset Characters')).toBeEnabled();
    expect(screen.getByText('Remove All Characters')).toBeEnabled();
  });

  test('calls saveCharacters when Save Characters button is clicked', () => {
    useCharacters.mockReturnValue({
      characters: [{ name: 'Character 1', attributes: {}, skills: {} }],
      loading: false,
      error: null,
      saveCharacters: mockSaveCharacters
    });
    render(<App />);
    fireEvent.click(screen.getByText('Save Characters'));
    expect(mockSaveCharacters).toHaveBeenCalled();
  });

  test('calls resetAllCharacters when Reset Characters button is clicked', () => {
    useCharacters.mockReturnValue({
      characters: [{ name: 'Character 1', attributes: {}, skills: {} }],
      loading: false,
      error: null,
      resetAllCharacters: mockResetAllCharacters
    });
    render(<App />);
    fireEvent.click(screen.getByText('Reset Characters'));
    expect(mockResetAllCharacters).toHaveBeenCalled();
  });

  test('calls removeAllCharacters when Remove All Characters button is clicked', () => {
    useCharacters.mockReturnValue({
      characters: [{ name: 'Character 1', attributes: {}, skills: {} }],
      loading: false,
      error: null,
      removeAllCharacters: mockRemoveAllCharacters
    });
    render(<App />);
    fireEvent.click(screen.getByText('Remove All Characters'));
    expect(mockRemoveAllCharacters).toHaveBeenCalled();
  });
});
