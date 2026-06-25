const BASE_URL = 'http://localhost:4000/api/characters';

async function fetchCharacters() {
  const response = await fetch(BASE_URL);
  return response.json();
}

async function fetchCharacterById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
}

async function createCharacter(character) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character),
  });
  return response.json();
}

async function updateCharacter(id, character) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character),
  });
  return response.json();
}

async function deleteCharacter(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}

export { fetchCharacters, fetchCharacterById, createCharacter, updateCharacter, deleteCharacter };
