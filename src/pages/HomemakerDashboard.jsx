import React, { useState } from 'react';
import { 
  ChefHat, 
  Utensils, 
  IndianRupee, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Power,
  X,
  TrendingUp,
  Image as ImageIcon,
  LogOut,
  Upload
} from 'lucide-react';
import { useNavigate } from "react-router-dom"
// --- Mock Data ---
const INITIAL_ORDERS = [
  { id: '101', customerName: 'Rohan Sharma', items: ['Gujarati Thali', 'Extra Chaas'], totalAmount: 180, status: 'pending', time: '12:30 PM', specialNote: 'Less spicy please' },
  { id: '102', customerName: 'Priya Patel', items: ['Dal Bati', 'Sev Tameta'], totalAmount: 220, status: 'cooking', time: '12:45 PM' },
  { id: '103', customerName: 'Amit Shah', items: ['Mini Thali'], totalAmount: 120, status: 'ready', time: '01:00 PM' },
];

const INITIAL_MENU = [
  { id: 'm1', name: 'Gujarati Full Thali', price: 150, isAvailable: true, description: 'Dal, Rice, Roti, Shaak, Sweet', image: null, dietType: 'veg' },
  { id: 'm2', name: 'Kathiyawadi Special', price: 180, isAvailable: true, description: 'Spicy garlic chutney, Bajra Rotla', image: null, dietType: 'veg' },
];

export default function HomemakerDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isKitchenOpen, setIsKitchenOpen] = useState(true);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [earnings, setEarnings] = useState(1250);
  const [showToast, setShowToast] = useState(null);
  const navigate = useNavigate();

  // --- Add Item Modal State ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    imagePreview: null,
    dietType: 'veg', // veg | nonveg
  });

  // --- Helpers ---
  const triggerToast = (message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleLogout = () => {
    // Logic to clear session/token would go here
    alert("Logging out...");
    navigate('/');
  };

  const handleOrderAction = (orderId, action) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      if (action === 'accept') return { ...order, status: 'cooking' };
      if (action === 'reject') return { ...order, status: 'rejected' };
      if (action === 'cooked') return { ...order, status: 'ready' };
      if (action === 'handover') {
        setEarnings(curr => curr + order.totalAmount);
        return { ...order, status: 'completed' };
      }
      return order;
    }));

    const messages = {
      accept: "Order Accepted!",
      reject: "Order Rejected.",
      cooked: "Marked as Ready!",
      handover: "Payment Added!"
    };
    triggerToast(messages[action]);
  };

  const toggleItemAvailability = (id) => {
    setMenu(prev => prev.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
    triggerToast("Availability Updated");
  };

  // --- Image Upload Handler ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewItem({ ...newItem, image: file, imagePreview: previewUrl });
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault(); 
    
    if (!newItem.name || !newItem.price) {
        triggerToast("Please fill in Name and Price");
        return;
    }
    if (!newItem.dietType) {
        triggerToast("Please select Veg or Non-Veg");
        return;
    }

    const itemToAdd = {
        id: Date.now().toString(),
        name: newItem.name,
        price: parseFloat(newItem.price),
        description: newItem.description || 'Delicious home cooked meal',
        isAvailable: true,
        image: newItem.imagePreview, // Storing the preview URL for display
        dietType: newItem.dietType,
    };

    setMenu(prev => [itemToAdd, ...prev]); 
    setIsAddModalOpen(false); 
    setNewItem({ name: '', price: '', description: '', image: null, imagePreview: null, dietType: 'veg' }); 
    triggerToast("New Item Added to Menu!");
  };

  // --- Sub-Components ---
  const StatCard = ({ label, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4 transition-transform hover:scale-105">
      <div className={`p-4 rounded-full ${colorClass} bg-opacity-10`}>
        <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );

  const OrderCard = ({ order, actionButtons, headerColor, accentColor }) => (
    <div className={`bg-white border rounded-xl shadow-sm relative overflow-hidden flex flex-col h-full transition-all hover:shadow-md ${isKitchenOpen ? '' : 'opacity-50 pointer-events-none'}`}>
      <div className={`absolute top-0 left-0 w-1.5 h-full ${accentColor}`}></div>
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-bold text-lg text-slate-800">{order.customerName}</h4>
            <div className="flex items-center text-slate-500 text-xs mt-1">
              <Clock className="w-3 h-3 mr-1" />
              {order.time}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${headerColor}`}>
            ₹{order.totalAmount}
          </span>
        </div>
        
        <div className="bg-slate-50 p-3 rounded-lg mb-4 flex-grow border border-slate-100">
          <p className="text-slate-700 text-sm font-medium leading-relaxed">{order.items.join(', ')}</p>
          {order.specialNote && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 p-1.5 rounded border border-red-100 flex items-start">
              <AlertCircle className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
              Note: {order.specialNote}
            </div>
          )}
        </div>

        <div className="mt-auto">
          {actionButtons(order)}
        </div>
      </div>
    </div>
  );

  // --- Views ---
  const OrdersView = () => {
    const newOrders = orders.filter(o => o.status === 'pending');
    const cookingOrders = orders.filter(o => o.status === 'cooking');
    const readyOrders = orders.filter(o => o.status === 'ready');

    return (
      <div className="space-y-8 pb-24">
        {/* Kitchen Status */}
        <div className={`p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-sm border transition-colors ${isKitchenOpen ? 'bg-green-50 border-green-200' : 'bg-slate-100 border-slate-300'}`}>
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${isKitchenOpen ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {isKitchenOpen ? 'Kitchen is OPEN' : 'Kitchen is CLOSED'}
              </h2>
              <p className="text-slate-600">
                {isKitchenOpen ? 'You are visible to customers.' : 'Go online to receive orders.'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsKitchenOpen(!isKitchenOpen)}
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-lg shadow-md transition-all active:scale-95 ${
              isKitchenOpen
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {isKitchenOpen ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Today's Orders"
            value={orders.filter(o => o.status !== 'rejected').length}
            icon={ChefHat}
            colorClass="bg-orange-500"
          />
          <StatCard
            label="Pending"
            value={newOrders.length}
            icon={AlertCircle}
            colorClass="bg-orange-300"
          />
          <StatCard
            label="Completed"
            value={orders.filter(o => o.status === 'completed').length}
            icon={CheckCircle}
            colorClass="bg-green-500"
          />
          <StatCard
            label="Earnings"
            value={`₹${earnings}`}
            icon={IndianRupee}
            colorClass="bg-green-600"
          />
        </div>

        {/* KANBAN BOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center text-slate-800 border-b pb-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              New Requests ({newOrders.length})
            </h3>
            {newOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order}
                headerColor="bg-orange-100 text-orange-800"
                accentColor="bg-orange-500"
                actionButtons={(o) => (
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleOrderAction(o.id, 'reject')} className="py-2.5 rounded-lg border border-red-200 text-red-600 font-bold hover:bg-red-50 text-sm">Reject</button>
                    <button onClick={() => handleOrderAction(o.id, 'accept')} className="py-2.5 rounded-lg bg-green-600 text-white font-bold shadow-md hover:bg-green-700 text-sm">Accept</button>
                  </div>
                )}
              />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center text-slate-800 border-b pb-2">
              <span className="w-3 h-3 bg-orange-300 rounded-full mr-2"></span>
              Preparing ({cookingOrders.length})
            </h3>
            {cookingOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order}
                headerColor="bg-orange-50 text-orange-800"
                accentColor="bg-orange-300"
                actionButtons={(o) => (
                  <button
                    onClick={() => handleOrderAction(o.id, 'cooked')}
                    className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold shadow hover:bg-orange-600 flex justify-center items-center"
                  >
                    <Utensils className="w-4 h-4 mr-2" /> Mark Ready
                  </button>
                )}
              />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center text-slate-800 border-b pb-2">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Ready for Pickup ({readyOrders.length})
            </h3>
            {readyOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order}
                headerColor="bg-green-100 text-green-800"
                accentColor="bg-green-500"
                actionButtons={(o) => (
                  <button
                    onClick={() => handleOrderAction(o.id, 'handover')}
                    className="w-full py-3 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 flex justify-center items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Handed Over
                  </button>
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MenuView = () => (
    <div className="space-y-6 pb-24 relative">
       {/* Modal Overlay */}
       {isAddModalOpen && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
             <div className="p-4 border-b flex justify-between items-center bg-slate-50 sticky top-0 z-10">
               <h3 className="font-bold text-lg text-slate-800">Add New Dish</h3>
               <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full">
                 <X className="w-5 h-5 text-slate-500" />
               </button>
             </div>
             <form onSubmit={handleAddItem} className="p-6 space-y-4">
                
                {/* Image Upload Section */}
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Food Image</label>
                   <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {newItem.imagePreview ? (
                        <div className="relative h-40 w-full">
                           <img src={newItem.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                           <p className="text-xs text-center mt-2 text-green-600 font-bold">Image Selected</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-slate-400">
                           <Upload className="w-10 h-10 mb-2" />
                           <span className="text-sm">Click to upload photo</span>
                        </div>
                      )}
                   </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dish Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aloo Paratha"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 120"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea 
                      placeholder="Short description of the food..."
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-24 resize-none"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    />
                </div>

                {/* Veg / Non-Veg selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Food Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        name="dietType"
                        value="veg"
                        required
                        checked={newItem.dietType === 'veg'}
                        onChange={(e) => setNewItem({ ...newItem, dietType: e.target.value })}
                      />
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        Veg
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        name="dietType"
                        value="nonveg"
                        checked={newItem.dietType === 'nonveg'}
                        onChange={(e) => setNewItem({ ...newItem, dietType: e.target.value })}
                      />
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        Non-Veg
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                    <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 shadow-lg active:scale-95 transition-all">
                        Add to Menu
                    </button>
                </div>
             </form>
           </div>
         </div>
       )}

       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-bold text-slate-800">Menu Management</h2>
            <p className="text-slate-500 text-sm">Toggle the switch to show/hide items.</p>
         </div>
         <button 
           onClick={() => setIsAddModalOpen(true)}
           className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg font-bold flex items-center justify-center hover:bg-orange-700 active:scale-95 transition-all"
         >
           <Plus className="w-5 h-5 mr-2" /> Add New Item
         </button>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className={`bg-white p-5 rounded-2xl border shadow-sm transition-all hover:shadow-md ${!item.isAvailable ? 'opacity-75 bg-slate-50' : ''}`}>
            <div className="flex justify-between items-start mb-4">
               <div className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0 mr-4 border border-slate-100">
                   {item.image ? (
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   ) : (
                       <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                           <ImageIcon className="w-6 h-6" />
                       </div>
                   )}
               </div>
               <div className="flex flex-col items-end space-y-1">
                  {/* Veg / Non-Veg badge */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                      item.dietType === 'nonveg'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    {item.dietType === 'nonveg' ? 'Non-Veg' : 'Veg'}
                  </span>
                  <span className="font-bold text-lg text-slate-800">₹{item.price}</span>
                  <div className="mt-1 flex flex-col items-end">
                    <label className="text-xs font-bold text-slate-400 mb-1">
                      {item.isAvailable ? 'Available' : 'Sold Out'}
                    </label>
                    <button 
                        onClick={() => toggleItemAvailability(item.id)}
                        className={`w-12 h-7 rounded-full transition-colors relative ${item.isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}
                    >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${item.isAvailable ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
               </div>
            </div>
            
            <div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">{item.name}</h4>
                <p className="text-slate-500 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
   </div>
 );

  const EarningsView = () => (
    <div className="space-y-8 pb-24 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800">Earnings Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between h-64">
            <div>
                <p className="text-orange-100 font-medium mb-1">Total Balance</p>
                <h3 className="text-5xl font-bold">₹{earnings + 4500}</h3> 
            </div>
            <button 
            onClick={() => triggerToast("Payout Request Sent to Admin!")}
            className="w-full bg-white text-orange-700 font-bold py-3 rounded-lg hover:bg-orange-50 transition-colors"
            >
            Request Payout
            </button>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm h-64 overflow-y-auto">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Recent History
            </h4>
            <div className="space-y-4">
            {[1,2,3,4,5].map((_, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0">
                <div>
                    <p className="font-medium text-slate-800">Weekly Settlement</p>
                    <p className="text-xs text-slate-400">14 Dec 2025</p>
                </div>
                <span className="text-green-600 font-bold">+ ₹2,400</span>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
    {/* Home-style background glow */}
    <div className="absolute -z-10 inset-0">
      <div className="absolute top-24 left-16 w-[420px] h-[420px] bg-secondary/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-24 right-16 w-[360px] h-[360px] bg-orange-200/40 blur-3xl rounded-full"></div>
    </div>

      
      {/* Toast */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-6 py-3 rounded-full shadow-2xl z-[70] flex items-center animate-bounce">
          <CheckCircle className="w-5 h-5 mr-2 text-white" />
          {showToast}
        </div>
      )}

      {/* Responsive Navbar - FIXED OVERLAP ISSUE using z-50 and bg-white */}
      <nav className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-orange-600 tracking-tight">Ghar Ka Khana</span>
                    <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full hidden sm:inline-block">Partner App</span>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {['orders', 'menu', 'earnings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                                activeTab === tab 
                                ? 'text-orange-600 bg-orange-50' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                    {/* Logout Button Added for Desktop */}
                    <button 
                      onClick={handleLogout}
                      className="ml-4 flex items-center text-slate-500 hover:text-red-600 font-medium text-sm transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                        P
                    </div>
                </div>
                
                {/* Mobile Header Logout Icon */}
                <div className="flex md:hidden items-center">
                   <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-600">
                      <LogOut className="w-6 h-6" />
                   </button>
                </div>
            </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'menu' && <MenuView />}
        {activeTab === 'earnings' && <EarningsView />}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 md:hidden z-40 pb-safe">
        <div className="grid grid-cols-3 h-16">
            <button 
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center justify-center space-y-1 ${activeTab === 'orders' ? 'text-orange-600' : 'text-slate-400'}`}
            >
            <ChefHat className="w-6 h-6" />
            <span className="text-xs font-medium">Orders</span>
            </button>
            
            <button 
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center justify-center space-y-1 ${activeTab === 'menu' ? 'text-orange-600' : 'text-slate-400'}`}
            >
            <Utensils className="w-6 h-6" />
            <span className="text-xs font-medium">Menu</span>
            </button>
            
            <button 
            onClick={() => setActiveTab('earnings')}
            className={`flex flex-col items-center justify-center space-y-1 ${activeTab === 'earnings' ? 'text-orange-600' : 'text-slate-400'}`}
            >
            <IndianRupee className="w-6 h-6" />
            <span className="text-xs font-medium">Money</span>
            </button>
        </div>
      </div>
    </div>
  );
}