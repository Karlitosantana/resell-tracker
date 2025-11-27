import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ItemForm } from './components/ItemForm';
import { InventoryList } from './components/InventoryList';
import { SellItemModal } from './components/SellItemModal';
import { Dashboard } from './components/Dashboard';
import { useItems } from './hooks/useItems';

function App() {
  const { items, addItem, updateItem, deleteItem } = useItems();
  const [activeTab, setActiveTab] = useState('inventory');
  const [editingItem, setEditingItem] = useState(null);
  const [sellingItem, setSellingItem] = useState(null);

  const handleSaveItem = (data) => {
    if (editingItem) {
      updateItem(editingItem.id, data);
      setEditingItem(null);
    } else {
      addItem(data);
    }
    setActiveTab('inventory');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setActiveTab('add');
  };

  const handleDelete = (id) => {
    if (confirm('Opravdu chcete smazat tento předmět?')) {
      deleteItem(id);
    }
  };

  const handleSellClick = (item) => {
    setSellingItem(item);
  };

  const handleSellConfirm = (saleData) => {
    if (sellingItem) {
      updateItem(sellingItem.id, saleData);
      setSellingItem(null);
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'add' && (
        <ItemForm
          onSave={handleSaveItem}
          onCancel={() => {
            setEditingItem(null);
            setActiveTab('inventory');
          }}
          initialData={editingItem || {}}
        />
      )}

      {activeTab === 'inventory' && (
        <InventoryList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSell={handleSellClick}
        />
      )}

      {activeTab === 'dashboard' && (
        <Dashboard items={items} />
      )}

      {sellingItem && (
        <SellItemModal
          item={sellingItem}
          onSave={handleSellConfirm}
          onCancel={() => setSellingItem(null)}
        />
      )}
    </Layout>
  );
}

export default App;
