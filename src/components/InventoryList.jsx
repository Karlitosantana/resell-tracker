import React from 'react';
import { Edit, Trash2, DollarSign } from 'lucide-react';

export function InventoryList({ items, onEdit, onDelete, onSell }) {
    if (items.length === 0) {
        return (
            <div className="card text-center py-12">
                <p className="text-secondary text-lg">Zatím žádné předměty.</p>
                <p className="text-sm text-secondary mt-2">Přidejte předmět a začněte sledovat!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {items.map(item => (
                <div key={item.id} className="card flex flex-col md:flex-row justify-between gap-4 animate-fade-in">
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'sold'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                {item.status.toUpperCase()}
                            </span>
                        </div>
                        <div className="text-sm text-secondary mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                            <p>Koupeno: {new Date(item.purchaseDate).toLocaleDateString('cs-CZ')}</p>
                            <p>Zdroj: {item.purchaseSource || 'N/A'}</p>
                            <p className="text-white">Cena: {parseFloat(item.purchasePrice).toFixed(0)} Kč</p>
                            {item.status === 'sold' && (
                                <p className="text-success font-bold">Zisk: {parseFloat(item.profit).toFixed(0)} Kč</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                        {item.status !== 'sold' && (
                            <button
                                onClick={() => onSell(item)}
                                className="btn btn-primary text-sm"
                                title="Označit jako prodané"
                            >
                                <DollarSign size={16} />
                                Prodat
                            </button>
                        )}
                        <button
                            onClick={() => onEdit(item)}
                            className="btn btn-secondary p-2"
                            title="Edit"
                        >
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="btn btn-secondary p-2 hover:text-error hover:border-error"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
