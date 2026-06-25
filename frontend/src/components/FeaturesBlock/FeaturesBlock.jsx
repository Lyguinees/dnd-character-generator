import React from 'react';

function FeaturesBlock({ features, onChange }) {
  function updateField(field, value) {
    onChange({ ...features, [field]: value });
  }

  return (
    <section className="card section-card">
      <h3>Traços e características</h3>
      <label>Habilidades raciais</label>
      <textarea value={features.raceTraits} onChange={(e) => updateField('raceTraits', e.target.value)} />
      <label>Habilidades de classe</label>
      <textarea value={features.classTraits} onChange={(e) => updateField('classTraits', e.target.value)} />
      <label>Outras características</label>
      <textarea value={features.otherTraits} onChange={(e) => updateField('otherTraits', e.target.value)} />
    </section>
  );
}

export default FeaturesBlock;
