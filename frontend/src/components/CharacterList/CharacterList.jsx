import React from 'react';

function CharacterList({ characters, onSelect, onEdit, onDelete }) {
  return (
    <section className="card list-card">
      <h2>Fichas</h2>
      {characters.length === 0 ? (
        <p>Nenhuma ficha disponível. Crie uma nova ficha.</p>
      ) : (
        <div className="character-grid">
          {characters.map((character) => (
            <article key={character.id} className="character-card">
              <div>
                <strong>{character.name}</strong>
                <span>{character.race} / {character.className} {character.level}</span>
              </div>
              <div className="card-actions">
                <button type="button" onClick={() => onSelect(character.id)}>Ver</button>
                <button type="button" onClick={() => onEdit(character)}>Editar</button>
                <button type="button" className="danger" onClick={() => onDelete(character.id)}>Deletar</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default CharacterList;
