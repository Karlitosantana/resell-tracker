import React from 'react';
import { LayoutDashboard, PlusCircle, List } from 'lucide-react';

export function Layout({ children, activeTab, onTabChange }) {
    return (
        <div className="container animate-fade-in">
            <header className="flex justify-between items-center" style={{ padding: '2rem 0' }}>
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-600"
                        style={{ background: 'linear-gradient(to right, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Resell Tracker
                    </h1>
                    <p className="text-secondary text-sm">Správce zisku a zásob</p>
                </div>
                <nav className="flex gap-2">
                    <button
                        onClick={() => onTabChange('dashboard')}
                        className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        <LayoutDashboard size={18} />
                        <span className="hidden-mobile">Přehled</span>
                    </button>
                    <button
                        onClick={() => onTabChange('inventory')}
                        className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        <List size={18} />
                        <span className="hidden-mobile">Sklad</span>
                    </button>
                    <button
                        onClick={() => onTabChange('add')}
                        className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        <PlusCircle size={18} />
                        <span className="hidden-mobile">Přidat</span>
                    </button>
                </nav>
            </header>

            <main className="animate-slide-in">
                {children}
            </main>
        </div>
    );
}
