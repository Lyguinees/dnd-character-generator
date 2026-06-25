import React from 'react';
import AttributeBlock from '../../components/AttributeBlock/AttributeBlock';
import SkillsBlock from '../../components/SkillsBlock/SkillsBlock';
import SavingThrowsBlock from '../../components/SavingThrowsBlock/SavingThrowsBlock';
import CombatBlock from '../../components/CombatBlock/CombatBlock';
import InventoryBlock from '../../components/InventoryBlock/InventoryBlock';
import FeaturesBlock from '../../components/FeaturesBlock/FeaturesBlock';
import SpellsBlock from '../../components/SpellsBlock/SpellsBlock';
import { getModifier, getProficiencyBonus, getSkillBonus, getSavingThrowBonus } from '../../utils/calculations';

function CharacterSheet({ character, onEdit, onDelete, onBack }) {
  const proficiencyBonus = getProficiencyBonus(character.level);

  return (
    <section className="card sheet-card">
      <header className="sheet-header">
        <div>
          <h2>{character.name}</h2>
          <p>{character.race} {character.className} Level {character.level}</p>
          <p>{character.background} • {character.alignment}</p>
        </div>
        <div className="sheet-actions">
          <button type="button" onClick={onBack}>Voltar</button>
          <button type="button" onClick={onEdit}>Editar</button>
          <button type="button" className="danger" onClick={onDelete}>Deletar</button>
        </div>
      </header>

      <div className="sheet-grid">
        <div className="sheet-block">
          <h3>Informações básicas</h3>
          <p><strong>Jogador:</strong> {character.playerName}</p>
          <p><strong>Exp:</strong> {character.experience}</p>
          <p><strong>PV:</strong> {character.hitPoints}</p>
          <p><strong>CA:</strong> {character.armorClass}</p>
          <p><strong>Deslocamento:</strong> {character.speed}</p>
          <p><strong>Iniciativa:</strong> {character.initiative}</p>
          <p><strong>Proficiência:</strong> +{proficiencyBonus}</p>
        </div>
        <div className="sheet-block">
          <h3>Atributos</h3>
          <div className="attribute-grid">
            {Object.entries(character.attributes).map(([key, value]) => (
              <div key={key} className="attribute-field">
                <span>{key}</span>
                <strong>{value}</strong>
                <span>{getModifier(value) >= 0 ? `+${getModifier(value)}` : getModifier(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SkillsBlock
        skills={character.skills}
        attributes={character.attributes}
        proficiencyBonus={proficiencyBonus}
        onChange={() => {}}
        getSkillBonus={getSkillBonus}
      />
      <SavingThrowsBlock
        savingThrows={character.savingThrows}
        attributes={character.attributes}
        proficiencyBonus={proficiencyBonus}
        onChange={() => {} }
        getSavingThrowBonus={getSavingThrowBonus}
      />
      <CombatBlock attacks={character.attacks} onChange={() => {}} />
      <InventoryBlock inventory={character.inventory} onChange={() => {}} />
      <FeaturesBlock features={character.features} onChange={() => {}} />
      {character.isCaster && <SpellsBlock spells={character.spells} onChange={() => {}} />}
    </section>
  );
}

export default CharacterSheet;
