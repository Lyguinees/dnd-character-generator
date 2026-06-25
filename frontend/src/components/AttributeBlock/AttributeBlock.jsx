import React from 'react';

function AttributeBlock({ attributes, onChange, getModifier }) {
  const attributeKeys = [
    { key: 'strength', label: 'Força' },
    { key: 'dexterity', label: 'Destreza' },
    { key: 'constitution', label: 'Constituição' },
    { key: 'intelligence', label: 'Inteligência' },
    { key: 'wisdom', label: 'Sabedoria' },
    { key: 'charisma', label: 'Carisma' },
  ];

  return (
    <section className="card section-card">
      <h3>Atributos</h3>
      <div className="attribute-column">
        {attributeKeys.map((attribute) => {
          const score = attributes[attribute.key];
          return (
            <div key={attribute.key} className="attribute-field stacked-attribute">
              <label>{attribute.label}</label>
              <input
                type="number"
                min="1"
                value={score}
                onChange={(e) => onChange(attribute.key, Number(e.target.value))}
              />
              <span>{getModifier(score) >= 0 ? `+${getModifier(score)}` : getModifier(score)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AttributeBlock;
