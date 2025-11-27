import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'resell_tracker_items';

export function useItems() {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (itemData) => {
        const newItem = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            status: 'listed', // listed, sold
            ...itemData,
        };
        setItems((prev) => [newItem, ...prev]);
        return newItem;
    };

    const updateItem = (id, updates) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    const deleteItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const getItem = (id) => items.find((item) => item.id === id);

    return { items, addItem, updateItem, deleteItem, getItem };
}
