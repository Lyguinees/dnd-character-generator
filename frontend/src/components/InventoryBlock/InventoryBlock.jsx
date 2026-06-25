import React from 'react';

function InventoryBlock({ inventory, onChange }) {
  function updateCoin(field, value) {
    onChange({ ...inventory, [field]: Number(value) });
  }

  function updateItem(index, value) {
    const items = inventory.items.map((item, itemIndex) => (itemIndex === index ? value : item));
    onChange({ ...inventory, items });
  }

  function addItem() {
    onChange({ ...inventory, items: [...inventory.items, ''] });
  }

  function removeItem(index) {
    onChange({ ...inventory, items: inventory.items.filter((_, itemIndex) => itemIndex !== index) });
  }

  return (
    <section className="card section-card">
      <h3>Inventário</h3>
      <div className="field-row coins-row">
        <label>PC</label>
        <input type="number" min="0" value={inventory.cp} onChange={(e) => updateCoin('cp', e.target.value)} />
        <label>PP</label>
        <input type="number" min="0" value={inventory.pp} onChange={(e) => updateCoin('pp', e.target.value)} />
        <label>PE</label>
        <input type="number" min="0" value={inventory.ep} onChange={(e) => updateCoin('ep', e.target.value)} />
        <label>PO</label>
        <input type="number" min="0" value={inventory.gp} onChange={(e) => updateCoin('gp', e.target.value)} />
        <label>PL</label>
        <input type="number" min="0" value={inventory.sp} onChange={(e) => updateCoin('sp', e.target.value)} />
      </div>
      <div className="inventory-list">
        {inventory.items.map((item, index) => (
          <div key={index} className="inventory-item-row">
            <input
              className="inventory-note-input"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder="Item"
            />
            <button type="button" className="danger" onClick={() => removeItem(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="secondary-button" onClick={addItem}>Adicionar item</button>
      </div>
    </section>
  );
}

export default InventoryBlock;
