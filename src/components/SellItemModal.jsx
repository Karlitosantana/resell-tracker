import React, { useState, useEffect } from 'react';
import { DollarSign, X, Calculator } from 'lucide-react';

export function SellItemModal({ item, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        salePrice: '',
        salePlatform: '',
        saleDate: new Date().toISOString().split('T')[0],
        shippingCost: '',
        commission: '',
        otherFees: ''
    });

    const [profit, setProfit] = useState(0);

    useEffect(() => {
        const sale = parseFloat(formData.salePrice) || 0;
        const shipping = parseFloat(formData.shippingCost) || 0;
        const comm = parseFloat(formData.commission) || 0;
        const other = parseFloat(formData.otherFees) || 0;
        const cost = parseFloat(item.purchasePrice) || 0;

        setProfit(sale - shipping - comm - other - cost);
    }, [formData, item.purchasePrice]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            salePrice: parseFloat(formData.salePrice) || 0,
            shippingCost: parseFloat(formData.shippingCost) || 0,
            commission: parseFloat(formData.commission) || 0,
            otherFees: parseFloat(formData.otherFees) || 0,
            profit: profit,
            status: 'sold'
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="card w-full max-w-lg relative">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-secondary hover:text-primary"
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-1">Označit jako prodané</h2>
                <p className="text-secondary text-sm mb-6">
                    {item.name} (Koupeno za {parseFloat(item.purchasePrice).toFixed(0)} Kč)
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-secondary mb-1">Prodejní cena</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-secondary">Kč</span>
                                <input
                                    type="number"
                                    step="1"
                                    required
                                    className="input pl-10"
                                    placeholder="0"
                                    value={formData.salePrice}
                                    onChange={e => setFormData({ ...formData, salePrice: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-secondary mb-1">Datum prodeje</label>
                            <input
                                type="date"
                                required
                                className="input"
                                value={formData.saleDate}
                                onChange={e => setFormData({ ...formData, saleDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-secondary mb-1">Platforma</label>
                        <select
                            className="input"
                            required
                            value={formData.salePlatform}
                            onChange={e => setFormData({ ...formData, salePlatform: e.target.value })}
                        >
                            <option value="">Vyberte platformu...</option>
                            <option value="Vinted">Vinted</option>
                            <option value="eBay">eBay</option>
                            <option value="Facebook Marketplace">Facebook Marketplace</option>
                            <option value="Depop">Depop</option>
                            <option value="Other">Jiné</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-secondary mb-1">Doprava</label>
                            <input
                                type="number"
                                step="1"
                                className="input"
                                placeholder="0"
                                value={formData.shippingCost}
                                onChange={e => setFormData({ ...formData, shippingCost: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-secondary mb-1">Provize</label>
                            <input
                                type="number"
                                step="1"
                                className="input"
                                placeholder="0"
                                value={formData.commission}
                                onChange={e => setFormData({ ...formData, commission: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-secondary mb-1">Ostatní</label>
                            <input
                                type="number"
                                step="1"
                                className="input"
                                placeholder="0"
                                value={formData.otherFees}
                                onChange={e => setFormData({ ...formData, otherFees: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg mt-2 flex justify-between items-center ${profit >= 0 ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
                        }`}>
                        <div className="flex items-center gap-2">
                            <Calculator size={20} className={profit >= 0 ? 'text-success' : 'text-error'} />
                            <span className="font-medium">Odhadovaný zisk</span>
                        </div>
                        <span className={`text-xl font-bold ${profit >= 0 ? 'text-success' : 'text-error'}`}>
                            {profit.toFixed(0)} Kč
                        </span>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Zrušit
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <DollarSign size={18} />
                            Potvrdit prodej
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
