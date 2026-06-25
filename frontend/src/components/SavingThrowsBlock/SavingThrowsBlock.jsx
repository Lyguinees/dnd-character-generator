import React from 'react';

const savingKeys = [
  { key: 'strength', label: 'Força' },
  { key: 'dexterity', label: 'Destreza' },
  { key: 'constitution', label: 'Constituição' },
  { key: 'intelligence', label: 'Inteligência' },
  { key: 'wisdom', label: 'Sabedoria' },
  { key: 'charisma', label: 'Carisma' },
];

function SavingThrowsBlock({ savingThrows, attributes, proficiencyBonus, onChange, getSavingThrowBonus }) {
  function handleToggleSaving(key) {
    const exists = savingThrows.find((item) => item.key === key);
    if (exists) {
      onChange(savingThrows.filter((item) => item.key !== key));
    } else {
      onChange([...savingThrows, { key, proficient: true }]);
    }
  }

  return (
    <section className="card section-card">
      <h3>Testes de resistência</h3>
      <div className="table-block">
        <div className="table-row table-header">
          <span>Atributo</span>
          <span>Proficiência</span>
          <span>Bônus</span>
        </div>
        {savingKeys.map((item) => {
          const saved = savingThrows.find((entry) => entry.key === item.key);
          const proficient = Boolean(saved?.proficient);
          return (
            <div key={item.key} className="table-row">
              <span>{item.label}</span>
              <span>
                <input type="checkbox" checked={proficient} onChange={() => handleToggleSaving(item.key)} />
              </span>
              <span>{getSavingThrowBonus(item.key, attributes, proficiencyBonus, proficient)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SavingThrowsBlock;
