import React, { useState, useMemo, useEffect } from 'react';

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_InventoryManagement = "ecommerce-inventory-updatestockandsetalert";
export const PASSWORD_InventoryManagement = "CATALYST";  

// --- TYPES ---
interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    alert: boolean;
    threshold: number;
}

interface Order {
    id: string;
    customerName: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    date: string;
    items: number;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
    lastOrder: string;
    status: 'active' | 'inactive';
}

// --- TASK DEFINITION ---
const taskDefinition = {
    productName: 'Classic Leather Wallet',
    initialStock: 10,
    updatedStock: 8,
    alertThreshold: 5,
};

// --- DUMMY DATA FOR UI REALISM ---
const initialInventory: Product[] = [
    { id: 'p1', name: 'Classic Leather Wallet', sku: 'LW-001', price: 75.00, stock: 10, alert: false, threshold: 10 },
    { id: 'p2', name: 'Canvas Tote Bag', sku: 'TB-004', price: 45.00, stock: 25, alert: true, threshold: 5 },
    { id: 'p3', name: 'Silk Scarf', sku: 'SS-002', price: 60.00, stock: 15, alert: false, threshold: 10 },
    { id: 'p4', name: 'Stainless Steel Watch', sku: 'SW-007', price: 250.00, stock: 8, alert: true, threshold: 10 },
];

const mockOrders: Order[] = [
    { id: 'ORD-001', customerName: 'John Smith', total: 125.50, status: 'pending', date: '2024-01-15', items: 2 },
    { id: 'ORD-002', customerName: 'Sarah Johnson', total: 75.00, status: 'processing', date: '2024-01-15', items: 1 },
    { id: 'ORD-003', customerName: 'Mike Chen', total: 310.00, status: 'shipped', date: '2024-01-14', items: 3 },
    { id: 'ORD-004', customerName: 'Emma Davis', total: 60.00, status: 'delivered', date: '2024-01-14', items: 1 },
    { id: 'ORD-005', customerName: 'Alex Wilson', total: 195.00, status: 'processing', date: '2024-01-13', items: 2 },
];

const mockCustomers: Customer[] = [
    { id: 'CUST-001', name: 'John Smith', email: 'john.smith@email.com', totalOrders: 12, totalSpent: 1250.00, lastOrder: '2024-01-15', status: 'active' },
    { id: 'CUST-002', name: 'Sarah Johnson', email: 'sarah.j@email.com', totalOrders: 8, totalSpent: 890.50, lastOrder: '2024-01-15', status: 'active' },
    { id: 'CUST-003', name: 'Mike Chen', email: 'mike.chen@email.com', totalOrders: 15, totalSpent: 2100.75, lastOrder: '2024-01-14', status: 'active' },
    { id: 'CUST-004', name: 'Emma Davis', email: 'emma.davis@email.com', totalOrders: 5, totalSpent: 425.00, lastOrder: '2024-01-14', status: 'active' },
    { id: 'CUST-005', name: 'Alex Wilson', email: 'alex.wilson@email.com', totalOrders: 3, totalSpent: 195.00, lastOrder: '2024-01-13', status: 'inactive' },
];

const dashboardStats = {
    totalRevenue: 15750.25,
    totalOrders: 127,
    totalCustomers: 89,
    trendingProducts: 3,
    pendingOrders: 8,
    averageOrderValue: 124.02,
    topSellingProduct: 'Classic Leather Wallet',
    monthlyGrowth: 12.5,
};
const colorPalettes = [
    { primary: 'indigo', secondary: 'amber' },
    { primary: 'blue', secondary: 'rose' },
    { primary: 'teal', secondary: 'orange' },
];

// --- UI SUB-COMPONENTS ---
const Header: React.FC = () => (
    <header className="w-full p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">ShopFlow</h1>
            <div className="text-right text-gray-600 text-sm">
                <p><span className="font-semibold text-gray-800">Today's Revenue:</span> ${useMemo(() => (Math.random() * 5000 + 10000).toLocaleString('en-US', {minimumFractionDigits: 2}), [])}</p>
                <p><span className="font-semibold text-gray-800">Open Orders:</span> {useMemo(() => Math.floor(Math.random() * 20) + 15, [])}</p>
            </div>
        </div>
    </header>
);

const Sidebar: React.FC<{ activeView: string, setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
    const links = [ { id: 'dashboard', name: 'Dashboard', icon: '📊' }, { id: 'orders', name: 'Orders', icon: '📦' }, { id: 'inventory', name: 'Inventory', icon: '📝' }, { id: 'customers', name: 'Customers', icon: '👥' } ];
    return (
        <aside className="w-64 bg-white p-6 border-r border-gray-200 h-screen sticky top-[89px]">
            <nav className="space-y-2">
                {links.map(link => (
                    <button key={link.id} onClick={() => setActiveView(link.id)}
                           className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-semibold transition-colors ${activeView === link.id ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <span className="text-xl">{link.icon}</span>
                        {link.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

// --- MAIN COMPONENT ---
const InventoryManagementExperience: React.FC = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [inventory, setInventory] = useState<Product[]>(initialInventory);
    // Store editing fields as string for stock and threshold
    const [editingProduct, setEditingProduct] = useState<(Product & { stockStr?: string; thresholdStr?: string }) | null>(null);
    const [formError, setFormError] = useState('');
    const [isTaskComplete, setIsTaskComplete] = useState(false);
    const [isTaskSuccessful, setIsTaskSuccessful] = useState(false);
    
    const selectedPalette = useMemo(() => colorPalettes[Math.floor(Math.random() * colorPalettes.length)], []);
    const randomizedInventory = useMemo(() => [...inventory].sort(() => 0.5 - Math.random()), [inventory]);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', `var(--color-${selectedPalette.primary})`);
        root.style.setProperty('--color-primary-dark', `var(--color-${selectedPalette.primary}-dark)`);
        root.style.setProperty('--color-primary-light', `var(--color-${selectedPalette.primary}-light)`);
    }, [selectedPalette]);

    const handleEditClick = (product: Product) => {
        setEditingProduct({ 
            ...product, 
            stockStr: String(product.stock),
            thresholdStr: String(product.threshold)
        });
    };

    // Helper to strip leading zeros except for '0'
    const stripLeadingZeros = (val: string) => {
        if (val === '') return '';
        if (val === '0') return '0';
        return val.replace(/^0+/, '') || '0';
    };

    const handleUpdateField = (field: keyof Product, value: string | number | boolean) => {
        if (!editingProduct) return;
        if (field === 'stock') {
            let strVal = typeof value === 'string' ? value : String(value);
            strVal = stripLeadingZeros(strVal);
            setEditingProduct(prev => prev ? { ...prev, stockStr: strVal } : null);
        } else if (field === 'threshold') {
            let strVal = typeof value === 'string' ? value : String(value);
            strVal = stripLeadingZeros(strVal);
            setEditingProduct(prev => prev ? { ...prev, thresholdStr: strVal } : null);
        } else {
            setEditingProduct(prev => prev ? ({ ...prev, [field]: value }) : null);
        }
    };

    const handleSaveChanges = () => {
        if (!editingProduct) return;
        // Convert string fields to numbers
        const stock = Number(editingProduct.stockStr ?? editingProduct.stock);
        const threshold = Number(editingProduct.thresholdStr ?? editingProduct.threshold);
        if (editingProduct.alert && (threshold <= 0 || isNaN(threshold))) {
            setFormError('Alert threshold must be a positive number.');
            return;
        }
        setFormError('');
        const updatedProduct: Product = {
            ...editingProduct,
            stock,
            threshold,
        };
        const isStockCorrect = updatedProduct.stock === taskDefinition.updatedStock;
        const isAlertCorrect = updatedProduct.alert === true && updatedProduct.threshold === taskDefinition.alertThreshold;
        if (updatedProduct.name === taskDefinition.productName && isStockCorrect && isAlertCorrect) {
            setIsTaskSuccessful(true);
        }
        setInventory(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setIsTaskComplete(true);
        setEditingProduct(null);
    };

    const handleClosePanel = () => {
        if (editingProduct) {
            // Save changes on close
            handleSaveChanges();
        }
        setFormError('');
        setEditingProduct(null);
    };
    
    
    
    const renderMainView = () => {
        switch(activeView) {
            case 'dashboard':
                return (
                    <div className="animate-fade-in space-y-8">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Dashboard Overview</h2>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                        <p className="text-3xl font-bold text-[var(--color-primary)]">${dashboardStats.totalRevenue.toLocaleString()}</p>
                                    </div>
                                    <div className="text-3xl">💰</div>
                                </div>
                                <p className="text-sm text-green-600 mt-2">+{dashboardStats.monthlyGrowth}% from last month</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                        <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
                                    </div>
                                    <div className="text-3xl">📦</div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{dashboardStats.pendingOrders} pending</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Customers</p>
                                        <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalCustomers}</p>
                                    </div>
                                    <div className="text-3xl">👥</div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Active users</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Trending Products</p>
                                        <p className="text-3xl font-bold text-red-500">{dashboardStats.trendingProducts}</p>
                                    </div>
                                    <div className="text-3xl">🔥</div>
                                </div>
                                <p className="text-sm text-red-600 mt-2">High Demand</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                                <div className="space-y-3">
                                    {mockOrders.slice(0, 5).map(order => (
                                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                                <p className="text-sm text-gray-600">{order.id} • {order.items} items</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h3>
                                <div className="space-y-3">
                                    {mockCustomers.slice(0, 5).map(customer => (
                                        <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{customer.name}</p>
                                                <p className="text-sm text-gray-600">{customer.totalOrders} orders</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">${customer.totalSpent.toFixed(2)}</p>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {customer.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            
            case 'orders':
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Orders Management</h2>
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                                            {mockOrders.filter(o => o.status === 'pending').length} Pending
                                        </span>
                                        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                            {mockOrders.filter(o => o.status === 'processing').length} Processing
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-semibold">Order ID</th>
                                        <th className="p-4 font-semibold">Customer</th>
                                        <th className="p-4 font-semibold">Items</th>
                                        <th className="p-4 font-semibold">Total</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockOrders.map(order => (
                                        <tr key={order.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                                            <td className="p-4 font-mono text-sm">{order.id}</td>
                                            <td className="p-4 font-medium">{order.customerName}</td>
                                            <td className="p-4 text-gray-600">{order.items}</td>
                                            <td className="p-4 font-mono font-bold">${order.total.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
                
            case 'customers':
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Customer Management</h2>
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">All Customers</h3>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                                            {mockCustomers.filter(c => c.status === 'active').length} Active
                                        </span>
                                        <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                                            {mockCustomers.filter(c => c.status === 'inactive').length} Inactive
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-semibold">Name</th>
                                        <th className="p-4 font-semibold">Email</th>
                                        <th className="p-4 font-semibold">Orders</th>
                                        <th className="p-4 font-semibold">Total Spent</th>
                                        <th className="p-4 font-semibold">Last Order</th>
                                        <th className="p-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockCustomers.map(customer => (
                                        <tr key={customer.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                                            <td className="p-4 font-medium">{customer.name}</td>
                                            <td className="p-4 text-gray-600">{customer.email}</td>
                                            <td className="p-4 font-bold text-[var(--color-primary)]">{customer.totalOrders}</td>
                                            <td className="p-4 font-mono font-bold">${customer.totalSpent.toFixed(2)}</td>
                                            <td className="p-4 text-gray-600">{new Date(customer.lastOrder).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
                
            case 'inventory':
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Product Inventory</h2>
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">All Products</h3>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                                            {inventory.filter(p => p.alert && p.stock <= p.threshold).length} Low Stock
                                        </span>
                                        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                                            {inventory.filter(p => p.stock > p.threshold).length} In Stock
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-semibold">Product Name</th>
                                        <th className="p-4 font-semibold">SKU</th>
                                        <th className="p-4 font-semibold">Price</th>
                                        <th className="p-4 font-semibold">Stock</th>
                                        <th className="p-4 font-semibold">Alert</th>
                                        <th className="p-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {randomizedInventory.map(item => (
                                        <tr key={item.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                                            <td className="p-4 font-medium">{item.name}</td>
                                            <td className="p-4 text-gray-500 font-mono">{item.sku}</td>
                                            <td className="p-4 font-mono font-bold">${item.price.toFixed(2)}</td>
                                            <td className={`p-4 font-bold ${item.stock <= item.threshold && item.alert ? 'text-red-500' : 'text-gray-800'}`}>
                                                {item.stock}
                                                {item.stock <= item.threshold && item.alert && <span className="ml-2 text-red-500">⚠️</span>}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    item.alert ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {item.alert ? 'Enabled' : 'Disabled'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button 
                                                    onClick={() => handleEditClick(item)} 
                                                    className="px-3 py-1 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-md transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            default: 
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-4xl font-extrabold text-gray-900">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
                        <p className="mt-4 text-gray-600">This is a placeholder for the {activeView} page.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            <div className="flex">
                <Sidebar activeView={activeView} setActiveView={setActiveView} />
                <main className="flex-1 p-8 relative overflow-hidden">
                    {renderMainView()}
                </main>
                
                {/* Editing Panel */}
                <div className={`fixed top-0 right-0 h-full w-96 bg-white/80 backdrop-blur-xl border-l border-gray-200 shadow-2xl transform transition-transform duration-500 ease-in-out z-20 ${editingProduct ? 'translate-x-0' : 'translate-x-full'}`}>
                    {editingProduct && (
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">Edit Product</h3>
                                <button onClick={handleClosePanel} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                            </div>
                            <div className="space-y-6 flex-grow">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                    <input type="number" min="0" value={editingProduct.stockStr ?? editingProduct.stock} onChange={e => handleUpdateField('stock', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="flex justify-between items-center cursor-pointer">
                                        <span className="font-medium text-gray-700">Enable Low Stock Alert</span>
                                        <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${editingProduct.alert ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}>
                                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${editingProduct.alert ? 'translate-x-6' : ''}`}></div>
                                        </div>
                                        <input type="checkbox" checked={editingProduct.alert} onChange={e => handleUpdateField('alert', e.target.checked)} className="hidden" />
                                    </label>
                                </div>
                                {editingProduct.alert && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Alert Threshold</label>
                                        <input type="number" min="0" value={editingProduct.thresholdStr ?? editingProduct.threshold} onChange={e => handleUpdateField('threshold', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                )}
                                {formError && <p className="text-red-500 text-sm">{formError}</p>}
                            </div>
                            <button onClick={handleSaveChanges} className="w-full py-3 font-semibold rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]">Save Changes</button>
                        </div>
                    )}
                </div>
            </div>

            {isTaskComplete && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl text-center">
                        <h2 className="text-4xl font-bold mb-4 text-green-600">
                            {isTaskSuccessful ? 'Inventory Updated!' : 'Action Completed'}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">The product details have been successfully saved.</p>
                        {isTaskSuccessful ? (
                            <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed">
                                <p className="text-sm font-semibold text-gray-500">Final Password:</p>
                                <p className="mt-2 text-3xl font-mono tracking-widest text-blue-800">{PASSWORD_InventoryManagement}</p>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            )}
            
            <div className="hidden">
                 <style>{`
                    :root {
                        --color-indigo: #6366f1; --color-indigo-dark: #4f46e5; --color-indigo-light: #e0e7ff;
                        --color-amber: #f59e0b; --color-amber-dark: #d97706; --color-amber-light: #fef3c7;
                        --color-blue: #3b82f6; --color-blue-dark: #2563eb; --color-blue-light: #dbeafe;
                        --color-rose: #f43f5e; --color-rose-dark: #e11d48; --color-rose-light: #ffe4e6;
                        --color-teal: #14b8a6; --color-teal-dark: #0d9488; --color-teal-light: #ccfbf1;
                        --color-orange: #f97316; --color-orange-dark: #ea580c; --color-orange-light: #ffedd5;
                        --color-primary: var(--color-indigo); --color-primary-dark: var(--color-indigo-dark); --color-primary-light: var(--color-indigo-light);
                    }
                `}</style>
            </div>
        </div>
    );
};

export default InventoryManagementExperience;
