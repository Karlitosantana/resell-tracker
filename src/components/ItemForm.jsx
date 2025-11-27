import React, { useState, useRef } from 'react';
import { Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { resizeImage } from '../utils/image';

export function ItemForm({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        purchasePrice: initialData.purchasePrice || '',
        purchaseSource: initialData.purchaseSource || '',
        purchaseDate: initialData.purchaseDate || new Date().toISOString().split('T')[0],
        notes: initialData.notes || '',
        image: initialData.image || null
    });

    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resizedImage = await resizeImage(file);
                setFormData(prev => ({ ...prev, image: resizedImage }));
            } catch (error) {
                console.error("Error resizing image:", error);
                alert("Nepodařilo se nahrát obrázek.");
            }
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

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
                {/* Image Upload Section */}
                <div className="flex justify-center mb-2">
                    <div
                        className="relative w-full h-48 bg-secondary/20 rounded-lg border-2 border-dashed border-secondary/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
                        onClick={() => !formData.image && fileInputRef.current.click()}
                    >
                        {formData.image ? (
                            <>
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="text-center p-4">
                                <Upload size={32} className="mx-auto mb-2 text-secondary" />
                                <p className="text-sm text-secondary">Klikněte pro nahrání fotky</p>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

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
