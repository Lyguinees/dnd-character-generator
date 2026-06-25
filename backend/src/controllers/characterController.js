const characterService = require('../services/characterService');

async function listCharacters(req, res, next) {
  try {
    const characters = await characterService.listCharacters();
    res.json(characters);
  } catch (error) {
    next(error);
  }
}

async function getCharacter(req, res, next) {
  try {
    const character = await characterService.getCharacterById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    next(error);
  }
}

async function createCharacter(req, res, next) {
  try {
    const character = await characterService.createCharacter(req.body);
    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateCharacter(req, res, next) {
  try {
    const updated = await characterService.updateCharacter(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCharacter(req, res, next) {
  try {
    const deleted = await characterService.deleteCharacter(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
