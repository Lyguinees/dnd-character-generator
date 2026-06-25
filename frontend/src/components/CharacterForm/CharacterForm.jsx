import React, { useMemo, useState } from 'react';
import { getModifier, getProficiencyBonus, skillsList, getSkillBonus, getSavingThrowBonus, getDefaultCharacter, generateRandomCharacter } from '../../utils/calculations';
import AttributeBlock from '../AttributeBlock/AttributeBlock';
import SkillsBlock from '../SkillsBlock/SkillsBlock';
import SavingThrowsBlock from '../SavingThrowsBlock/SavingThrowsBlock';
import CombatBlock from '../CombatBlock/CombatBlock';
import InventoryBlock from '../InventoryBlock/InventoryBlock';
import SpellsBlock from '../SpellsBlock/SpellsBlock';
import FeaturesBlock from '../FeaturesBlock/FeaturesBlock';

function CharacterForm({ character: initialCharacter, onSave, onCancel }) {
  const [character, setCharacter] = useState(initialCharacter || getDefaultCharacter());

  const proficiencyBonus = useMemo(() => getProficiencyBonus(character.level), [character.level]);
  const attributes = character.attributes;

  function updateField(field, value) {
    setCharacter((current) => ({ ...current, [field]: value }));
  }

  function updateAttribute(attribute, value) {
    setCharacter((current) => ({
      ...current,
      attributes: { ...current.attributes, [attribute]: Number(value) },
    }));
  }

  function updateNested(path, value) {
    setCharacter((current) => ({
      ...current,
      [path]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(character);
  }

  function handleGenerateRandom() {
    setCharacter(generateRandomCharacter());
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>{character.id ? 'Editar Ficha' : 'Nova Ficha'}</h2>

      <section className="form-section basic-info-card">
        <div className="field-row">
          <label>Nome do personagem</label>
          <input value={character.name} onChange={(e) => updateField('name', e.target.value)} />
          <label>Nome do jogador</label>
          <input value={character.playerName} onChange={(e) => updateField('playerName', e.target.value)} />
        </div>
        <div className="field-row">
          <label>Raça</label>
          <input value={character.race} onChange={(e) => updateField('race', e.target.value)} />
          <label>Classe</label>
          <input value={character.className} onChange={(e) => updateField('className', e.target.value)} />
        </div>
        <div className="field-row">
          <label>Antecedente</label>
          <input value={character.background} onChange={(e) => updateField('background', e.target.value)} />
          <label>Alinhamento</label>
          <input value={character.alignment} onChange={(e) => updateField('alignment', e.target.value)} />
        </div>
        <div className="field-row">
          <label>Nível</label>
          <input type="number" min="1" value={character.level} onChange={(e) => updateField('level', Number(e.target.value))} />
          <label>Experiência</label>
          <input type="number" min="0" value={character.experience} onChange={(e) => updateField('experience', Number(e.target.value))} />
        </div>
        <div className="field-row">
          <label>Pontos de vida</label>
          <input type="number" min="0" value={character.hitPoints} onChange={(e) => updateField('hitPoints', Number(e.target.value))} />
          <label>Classe de armadura</label>
          <input type="number" min="0" value={character.armorClass} onChange={(e) => updateField('armorClass', Number(e.target.value))} />
        </div>
        <div className="field-row">
          <label>Deslocamento</label>
          <input type="number" min="0" value={character.speed} onChange={(e) => updateField('speed', Number(e.target.value))} />
          <label>Iniciativa</label>
          <input type="number" value={character.initiative} onChange={(e) => updateField('initiative', Number(e.target.value))} />
        </div>
        <div className="field-row">
          <label>Proficiência</label>
          <input type="number" value={proficiencyBonus} disabled />
          <label>Conjurador</label>
          <select value={character.isCaster ? 'yes' : 'no'} onChange={(e) => updateField('isCaster', e.target.value === 'yes')}>
            <option value="no">Não</option>
            <option value="yes">Sim</option>
          </select>
        </div>
      </section>

      <AttributeBlock attributes={attributes} onChange={updateAttribute} getModifier={getModifier} />
      <SkillsBlock
        skills={character.skills}
        attributes={attributes}
        proficiencyBonus={proficiencyBonus}
        onChange={(skills) => updateNested('skills', skills)}
        getSkillBonus={getSkillBonus}
      />
      <SavingThrowsBlock
        savingThrows={character.savingThrows}
        attributes={attributes}
        proficiencyBonus={proficiencyBonus}
        onChange={(savingThrows) => updateNested('savingThrows', savingThrows)}
        getSavingThrowBonus={getSavingThrowBonus}
      />
      <CombatBlock attacks={character.attacks} onChange={(attacks) => updateNested('attacks', attacks)} />
      <InventoryBlock inventory={character.inventory} onChange={(inventory) => updateNested('inventory', inventory)} />
      <FeaturesBlock features={character.features} onChange={(features) => updateNested('features', features)} />
      {character.isCaster && <SpellsBlock spells={character.spells} onChange={(spells) => updateNested('spells', spells)} />}

      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={handleGenerateRandom}>Gerar aleatória</button>
        <button type="button" className="secondary-button" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="primary-button">Salvar ficha</button>
      </div>
    </form>
  );
}

export default CharacterForm;
