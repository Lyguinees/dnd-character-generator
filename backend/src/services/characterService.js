const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const dataFile = path.join(__dirname, '../data/characters.json');

async function readCharacters() {
  const content = await fs.readFile(dataFile, 'utf-8');
  return JSON.parse(content || '[]');
}

async function writeCharacters(characters) {
  await fs.writeFile(dataFile, JSON.stringify(characters, null, 2), 'utf-8');
}

function validateCharacter(character) {
  const required = ['name', 'playerName', 'race', 'className', 'level', 'hitPoints'];
  const missing = required.filter((field) => !character[field] && character[field] !== 0);
  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
  if (typeof character.level !== 'number' || character.level < 1) {
    return 'Level must be a positive number';
  }
  return null;
}

async function listCharacters() {
  return readCharacters();
}

async function getCharacterById(id) {
  const characters = await readCharacters();
  return characters.find((character) => character.id === id);
}

async function createCharacter(character) {
  const error = validateCharacter(character);
  if (error) {
    throw new Error(error);
  }
  const characters = await readCharacters();
  const newCharacter = { ...character, id: character.id || crypto.randomUUID() };
  characters.push(newCharacter);
  await writeCharacters(characters);
  return newCharacter;
}

async function updateCharacter(id, updates) {
  const characters = await readCharacters();
  const index = characters.findIndex((character) => character.id === id);
  if (index === -1) {
    return null;
  }
  const updatedCharacter = { ...characters[index], ...updates, id };
  const error = validateCharacter(updatedCharacter);
  if (error) {
    throw new Error(error);
  }
  characters[index] = updatedCharacter;
  await writeCharacters(characters);
  return updatedCharacter;
}

async function deleteCharacter(id) {
  const characters = await readCharacters();
  const filtered = characters.filter((character) => character.id !== id);
  await writeCharacters(filtered);
  return filtered.length !== characters.length;
}

module.exports = {
  listCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
