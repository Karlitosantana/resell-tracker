import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

export function ItemForm({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        purchasePrice: initialData.purchasePrice || '',
        purchaseSource: initialData.purchaseSource || '',
        purchaseDate: initialData.purchaseDate || new Date().toISOString().split('T')[0],
        notes: initialData.notes || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            purchasePrice: parseFloat(formData.purchasePrice) || 0,
        });
    };

    return (
        <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <h2 className="text-xl font-bold">Přidat nový předmět</h2>
                <button onClick={onCancel} className="text-secondary hover:text-primary">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm text-secondary mb-1">Název předmětu</label>
                    <input
                        type="text"
                        required
                        className="input"
                        placeholder="např. Vintage Nike Bunda"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-secondary mb-1">Nákupní cena (Kč)</label>
                        <input
                            type="number"
                            step="1"
                            required
                            className="input"
                            placeholder="0"
                            value={formData.purchasePrice}
                            onChange={e => setFormData({ ...formData, purchasePrice: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-secondary mb-1">Datum nákupu</label>
                        <input
                            type="date"
                            required
                            className="input"
                            value={formData.purchaseDate}
                            onChange={e => setFormData({ ...formData, purchaseDate: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-secondary mb-1">Zdroj</label>
                    <select
                        className="input"
                        value={formData.purchaseSource}
                        onChange={e => setFormData({ ...formData, purchaseSource: e.target.value })}
                    >
                        <option value="">Vyberte zdroj...</option>
                        <option value="Charity Shop">Second Hand</option>
                        <option value="Car Boot Sale">Bleší trh</option>
                        <option value="eBay">eBay</option>
                        <option value="Vinted">Vinted</option>
                        <option value="Facebook Marketplace">Facebook Marketplace</option>
                        <option value="Other">Jiný</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-secondary mb-1">Poznámky</label>
                    <textarea
                        className="input"
                        rows="3"
                        placeholder="Stav, velikost, detaily..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Zrušit
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <Save size={18} />
                        Uložit
                    </button>
                </div>
            </form>
        </div>
    );
}
