import React, { useEffect, useState } from 'react';
import CharacterList from './components/CharacterList/CharacterList';
import CharacterForm from './components/CharacterForm/CharacterForm';
import CharacterSheet from './pages/CharacterSheet/CharacterSheet';
import { fetchCharacters, fetchCharacterById, createCharacter, updateCharacter, deleteCharacter } from './services/api';
import { getDefaultCharacter } from './utils/calculations';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    const data = await fetchCharacters();
    setCharacters(data);
  }

  async function handleSelectCharacter(id) {
    const character = await fetchCharacterById(id);
    setSelectedCharacter(character);
    setViewMode('view');
  }

  function handleCreateNew() {
    setEditingCharacter(getDefaultCharacter());
    setViewMode('create');
  }

  function handleEditCharacter(character) {
    setEditingCharacter(character);
    setViewMode('edit');
  }

  async function handleSaveCharacter(character) {
    if (character.id) {
      await updateCharacter(character.id, character);
    } else {
      await createCharacter(character);
    }
    await loadCharacters();
    setViewMode('list');
    setSelectedCharacter(null);
    setEditingCharacter(null);
  }

  async function handleDeleteCharacter(id) {
    await deleteCharacter(id);
    await loadCharacters();
    setViewMode('list');
    if (selectedCharacter?.id === id) {
      setSelectedCharacter(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Gerador de Ficha D&D 5e</h1>
          <p>Crie e gerencie suas fichas de maneira simples e visual.</p>
        </div>
        <button type="button" className="primary-button" onClick={handleCreateNew}>
          Nova ficha
        </button>
      </header>

      <main className="app-content">
        {viewMode === 'list' && (
          <CharacterList
            characters={characters}
            onSelect={handleSelectCharacter}
            onEdit={handleEditCharacter}
            onDelete={handleDeleteCharacter}
          />
        )}

        {viewMode === 'create' && (
          <CharacterForm
            character={editingCharacter}
            onSave={handleSaveCharacter}
            onCancel={() => setViewMode('list')}
          />
        )}

        {viewMode === 'edit' && (
          <CharacterForm
            character={editingCharacter}
            onSave={handleSaveCharacter}
            onCancel={() => setViewMode('view')}
          />
        )}

        {viewMode === 'view' && selectedCharacter && (
          <CharacterSheet
            character={selectedCharacter}
            onEdit={() => handleEditCharacter(selectedCharacter)}
            onDelete={() => handleDeleteCharacter(selectedCharacter.id)}
            onBack={() => setViewMode('list')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
