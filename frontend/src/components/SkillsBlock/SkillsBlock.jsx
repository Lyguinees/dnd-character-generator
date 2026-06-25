import React from 'react';
import { skillsList } from '../../utils/calculations';

function SkillsBlock({ skills, attributes, proficiencyBonus, onChange, getSkillBonus }) {
  const currentSkills = skillsList.map((skill) => {
    const existing = skills.find((item) => item.id === skill.id);
    return {
      ...skill,
      proficient: existing?.proficient || false,
    };
  });

  function handleToggleSkill(skillId) {
    const updated = currentSkills.map((skill) => {
      if (skill.id !== skillId) return skill;
      return { ...skill, proficient: !skill.proficient };
    });
    onChange(updated);
  }

  return (
    <section className="card section-card">
      <h3>Perícias</h3>
      <div className="table-block">
        <div className="table-row table-header">
          <span>Perícia</span>
          <span>Habilidade</span>
          <span>Proficiência</span>
          <span>Bônus</span>
        </div>
        {currentSkills.map((skill) => (
          <div key={skill.id} className="table-row">
            <span>{skill.name}</span>
            <span>{skill.attribute}</span>
            <span>
              <input
                type="checkbox"
                checked={skill.proficient}
                onChange={() => handleToggleSkill(skill.id)}
              />
            </span>
            <span>{getSkillBonus(skill, attributes, proficiencyBonus)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsBlock;
