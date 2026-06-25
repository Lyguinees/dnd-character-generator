import React from 'react';

function SpellsBlock({ spells, onChange }) {
  function updateSpell(index, field, value) {
    const updated = spells.map((spell, spellIndex) => {
      if (spellIndex !== index) return spell;
      return { ...spell, [field]: value };
    });
    onChange(updated);
  }

  function addSpell() {
    onChange([...spells, { name: '', level: 0, school: '', castingTime: '', range: '', components: '', duration: '', description: '' }]);
  }

  function removeSpell(index) {
    onChange(spells.filter((_, spellIndex) => spellIndex !== index));
  }

  return (
    <section className="card section-card">
      <h3>Magias</h3>
      {spells.map((spell, index) => (
        <div key={index} className="spell-row">
          <input placeholder="Nome" value={spell.name} onChange={(e) => updateSpell(index, 'name', e.target.value)} />
          <input type="number" min="0" placeholder="Nível" value={spell.level} onChange={(e) => updateSpell(index, 'level', Number(e.target.value))} />
          <input placeholder="Escola" value={spell.school} onChange={(e) => updateSpell(index, 'school', e.target.value)} />
          <input placeholder="Tempo de conjuração" value={spell.castingTime} onChange={(e) => updateSpell(index, 'castingTime', e.target.value)} />
          <input placeholder="Alcance" value={spell.range} onChange={(e) => updateSpell(index, 'range', e.target.value)} />
          <input placeholder="Componentes" value={spell.components} onChange={(e) => updateSpell(index, 'components', e.target.value)} />
          <input placeholder="Duração" value={spell.duration} onChange={(e) => updateSpell(index, 'duration', e.target.value)} />
          <textarea placeholder="Descrição" value={spell.description} onChange={(e) => updateSpell(index, 'description', e.target.value)} />
          <button type="button" className="danger" onClick={() => removeSpell(index)}>Remover magia</button>
        </div>
      ))}
      <button type="button" className="secondary-button" onClick={addSpell}>Adicionar magia</button>
    </section>
  );
}

export default SpellsBlock;
