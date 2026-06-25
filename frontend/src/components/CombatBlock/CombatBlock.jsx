import React from 'react';

function CombatBlock({ attacks, onChange }) {
  function updateAttack(index, field, value) {
    const updated = attacks.map((attack, attackIndex) => {
      if (attackIndex !== index) return attack;
      return { ...attack, [field]: value };
    });
    onChange(updated);
  }

  function addAttack() {
    onChange([...attacks, { name: '', attackBonus: 0, damage: '', damageType: '' }]);
  }

  function removeAttack(index) {
    onChange(attacks.filter((_, attackIndex) => attackIndex !== index));
  }

  return (
    <section className="card section-card">
      <h3>Combate</h3>
      {attacks.map((attack, index) => (
        <div key={index} className="combat-row">
          <input placeholder="Nome" value={attack.name} onChange={(e) => updateAttack(index, 'name', e.target.value)} />
          <input type="number" placeholder="Bônus" value={attack.attackBonus} onChange={(e) => updateAttack(index, 'attackBonus', Number(e.target.value))} />
          <input placeholder="Dano" value={attack.damage} onChange={(e) => updateAttack(index, 'damage', e.target.value)} />
          <input placeholder="Tipo" value={attack.damageType} onChange={(e) => updateAttack(index, 'damageType', e.target.value)} />
          <button type="button" className="danger" onClick={() => removeAttack(index)}>Remover</button>
        </div>
      ))}
      <button type="button" className="secondary-button" onClick={addAttack}>Adicionar ataque</button>
    </section>
  );
}

export default CombatBlock;
