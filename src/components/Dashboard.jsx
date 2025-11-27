import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Package, DollarSign, ShoppingBag } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export function Dashboard({ items }) {
    const stats = useMemo(() => {
        const soldItems = items.filter(i => i.status === 'sold');
        const totalProfit = soldItems.reduce((acc, i) => acc + (i.profit || 0), 0);
        const totalSales = soldItems.reduce((acc, i) => acc + (i.salePrice || 0), 0);
        const totalCost = soldItems.reduce((acc, i) => acc + (i.purchasePrice || 0), 0);
        const margin = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0;

        return {
            totalProfit,
            totalSales,
            soldCount: soldItems.length,
            activeCount: items.length - soldItems.length,
            margin
        };
    }, [items]);

    const chartData = useMemo(() => {
        const soldItems = items.filter(i => i.status === 'sold');

        // Group by platform
        const platformCounts = {};
        soldItems.forEach(item => {
            const p = item.salePlatform || 'Jiné';
            platformCounts[p] = (platformCounts[p] || 0) + 1;
        });

        // Last 7 days profit
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const dailyProfits = last7Days.map(date => {
            return soldItems
                .filter(i => i.saleDate === date)
                .reduce((acc, i) => acc + (i.profit || 0), 0);
        });

        return {
            platforms: {
                labels: Object.keys(platformCounts),
                datasets: [{
                    data: Object.values(platformCounts),
                    backgroundColor: [
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                    ],
                    borderWidth: 0
                }]
            },
            daily: {
                labels: last7Days.map(d => new Date(d).toLocaleDateString('cs-CZ', { weekday: 'short' })),
                datasets: [{
                    label: 'Zisk (Kč)',
                    data: dailyProfits,
                    backgroundColor: 'rgba(139, 92, 246, 0.5)',
                    borderColor: '#8b5cf6',
                    borderWidth: 2,
                    borderRadius: 4
                }]
            }
        };
    }, [items]);

    return (
        <div className="grid gap-6 animate-fade-in">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard
                    title="Celkový zisk"
                    value={`${stats.totalProfit.toFixed(0)} Kč`}
                    icon={<TrendingUp size={20} className="text-success" />}
                    trend={`${stats.margin}% Marže`}
                />
                <SummaryCard
                    title="Celkové prodeje"
                    value={`${stats.totalSales.toFixed(0)} Kč`}
                    icon={<DollarSign size={20} className="text-blue-400" />}
                />
                <SummaryCard
                    title="Prodané předměty"
                    value={stats.soldCount}
                    icon={<ShoppingBag size={20} className="text-pink-400" />}
                />
                <SummaryCard
                    title="Aktivní zásoby"
                    value={stats.activeCount}
                    icon={<Package size={20} className="text-violet-400" />}
                />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                    <h3 className="text-lg font-bold mb-4">Zisk (Posledních 7 dní)</h3>
                    <div className="h-64">
                        <Bar
                            data={chartData.daily}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
                                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-bold mb-4">Prodeje dle platformy</h3>
                    <div className="h-64 flex justify-center">
                        <Doughnut
                            data={chartData.platforms}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { position: 'right', labels: { color: '#94a3b8' } } },
                                cutout: '70%'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({ title, value, icon, trend }) {
    return (
        <div className="card p-4">
            <div className="flex justify-between items-start mb-2">
                <span className="text-secondary text-sm">{title}</span>
                <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
            </div>
            <div className="text-2xl font-bold">{value}</div>
            {trend && <div className="text-xs text-success mt-1">{trend}</div>}
        </div>
    );
}
