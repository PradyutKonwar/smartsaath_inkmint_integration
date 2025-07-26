import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Palette, Building2, ShoppingCart, Phone, Mail, User, Plus, Minus } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface CartItem {
  service: Service;
  quantity: number;
}

interface UserData {
  name: string;
  whatsapp: string;
  email: string;
}

const App: React.Component = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userData, setUserData] = useState<UserData>({ name: '', whatsapp: '', email: '' });
  const [currentGradient, setCurrentGradient] = useState(0);

  // Color gradients based on your specifications
  const gradients = [
    'bg-gradient-to-br from-yellow-400 via-red-400 to-pink-300',
    'bg-gradient-to-tr from-green-400 via-yellow-400 to-red-400',
    'bg-gradient-to-bl from-red-400 via-pink-400 to-yellow-300',
    'bg-gradient-to-tl from-yellow-500 via-green-400 to-white',
    'bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400'
  ];

  // Auto-rotate gradients
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Services data
  const services = {
    students: [
      { id: 's1', name: 'Digital Project Report', category: 'Academic Docs', description: 'Professional project reports delivered digitally via WhatsApp' },
      { id: 's2', name: 'Printed Project Report', category: 'Academic Docs', description: 'High-quality printed and spiral-bound project reports' },
      { id: 's3', name: 'Digital Assignment/Notes', category: 'Academic Docs', description: 'Well-formatted assignments and notes in PDF format' },
      { id: 's4', name: 'Printed Assignment/Notes', category: 'Academic Docs', description: 'Printed assignments and notes with spiral binding' },
      { id: 's5', name: 'Academic Combo Kit', category: 'Academic Docs', description: 'Complete package with all documents printed and bound' },
      { id: 's6', name: 'Resume (PDF)', category: 'Career Docs', description: 'Professional resume design in PDF format' },
      { id: 's7', name: 'Resume + Print', category: 'Career Docs', description: 'Professional resume with high-quality printing' },
      { id: 's8', name: 'Color Eco Print', category: 'Print Services', description: 'Affordable color printing on 70-90 gsm paper' },
      { id: 's9', name: 'High Quality Color Print', category: 'Print Services', description: 'Premium color printing on 100 gsm paper' },
      { id: 's10', name: 'B/W Printouts', category: 'Print Services', description: 'Economic black and white printing' },
      { id: 's11', name: 'Spiral Binding', category: 'Print Services', description: 'Professional spiral binding up to 80 pages' }
    ],
    inkmint: [
      { id: 'i1', name: 'Standard Digital Visiting Card', category: 'Visiting Cards', description: 'Professional digital visiting cards in PDF/JPG format' },
      { id: 'i2', name: 'Premium Visiting Card (3 styles)', category: 'Visiting Cards', description: 'Premium designs with bilingual support including Assamese' },
      { id: 'i3', name: 'WhatsApp Clickable Add-on', category: 'Visiting Cards', description: 'Mobile-enabled clickable visiting cards' },
      { id: 'i4', name: 'Premium Poster (≤20 words)', category: 'Posters & Reels', description: 'Eye-catching posters with up to 20 words' },
      { id: 'i5', name: 'Poster Text Add-on', category: 'Posters & Reels', description: 'Additional text for longer messages (10+ words)' },
      { id: 'i6', name: 'Poster + Reels Bundle', category: 'Posters & Reels', description: 'Combined poster and reel content package' },
      { id: 'i7', name: 'Language Adaptation', category: 'Localization', description: 'Assamese language adaptation for your content' },
      { id: 'i8', name: 'Basic Logo Design', category: 'Branding', description: 'Professional logo design with complete branding kit' }
    ]
  };

  const addToCart = (service: Service) => {
    const existingItem = cart.find(item => item.service.id === service.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.service.id === service.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { service, quantity: 1 }]);
    }
    
    // Track analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        event_category: 'ecommerce',
        event_label: service.name,
        custom_parameter: service.category
      });
    }
  };

  const updateQuantity = (serviceId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.service.id === serviceId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleCheckout = () => {
    if (userData.name && userData.whatsapp && userData.email) {
      // Prepare WhatsApp message
      const cartItems = cart.map(item => `${item.service.name} (Qty: ${item.quantity})`).join('\n');
      const message = `Hi! I'm ${userData.name}.\n\nEmail: ${userData.email}\nWhatsApp: ${userData.whatsapp}\n\nI'd like to order:\n${cartItems}\n\nPlease share the quotation. Thank you!`;
      
      // Store data in Google Sheets (you'll need to implement the actual API call)
      const leadData = {
        timestamp: new Date().toISOString(),
        name: userData.name,
        whatsapp: userData.whatsapp,
        email: userData.email,
        cart: cartItems,
        source: 'website_checkout'
      };
      
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase_intent', {
          event_category: 'ecommerce',
          event_label: 'whatsapp_checkout',
          value: cart.length
        });
      }
      
      // Open WhatsApp
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/917002122703?text=${encodedMessage}`, '_blank');
      
      // Clear cart and close modals
      setCart([]);
      setShowCheckout(false);
      setShowCart(false);
      setUserData({ name: '', whatsapp: '', email: '' });
    }
  };

  const openModal = (vertical: string) => {
    setActiveModal(vertical);
    // Track launcher clicks
    if (typeof gtag !== 'undefined') {
      gtag('event', 'launcher_click', {
        event_category: 'navigation',
        event_label: vertical
      });
    }
  };

  const ServiceModal = ({ vertical, services }: { vertical: string, services: Service[] }) => {
    const categories = [...new Set(services.map(s => s.category))];
    
    const getVerticalInfo = (vertical: string) => {
      switch(vertical) {
        case 'students':
          return { title: 'SmartSaathi Students', tagline: 'Affordable Student Helpdesk & Print Services' };
        case 'inkmint':
          return { title: 'SmartSaathi Inkmint', tagline: 'Minting Creativity, Digitally.' };
        case 'bridge':
          return { title: 'SmartSaathi Bridge', tagline: 'Business Documents & Financial Helpdesk – Coming Soon' };
        default:
          return { title: '', tagline: '' };
      }
    };

    const verticalInfo = getVerticalInfo(vertical);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{verticalInfo.title}</h2>
                <p className="text-gray-600 mt-1">{verticalInfo.tagline}</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {vertical === 'bridge' ? (
            <div className="p-6 text-center">
              <div className="bg-gray-50 rounded-xl p-8">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  SmartSaathi Bridge will provide document services for new & existing entrepreneurs — 
                  including Loan Files, Form Fillups, MSME Templates, and Financial Reports.
                </p>
                <div className="max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email for updates"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button className="w-full mt-3 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    Notify Me When Live
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {categories.map(category => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.filter(s => s.category === category).map(service => (
                      <div key={service.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                        <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        <button
                          onClick={() => addToCart(service)}
                          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-[3000ms] ease-in-out ${gradients[currentGradient]}`}>
      {/* Header */}
      <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => {setActiveModal(null); setShowCart(false); setShowCheckout(false);}}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://github.com/PradyutKonwar/smartsaathi/blob/main/logo.jpeg?raw=true" 
                alt="SmartSaathi Logo" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SmartSaathi</h1>
                <p className="text-sm text-gray-600">Your Digital Assistant</p>
              </div>
            </button>
            
            {cart.length > 0 && (
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
            Welcome to SmartSaathi
          </h2>
          <p className="text-xl md:text-2xl text-white drop-shadow-md mb-8">
            Your one-stop solution for academic, creative, and business needs
          </p>
          
          {/* Promotional Content Area */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Get Started Today!</h3>
                <p className="text-white mb-6">
                  Choose from our three specialized services designed to meet all your requirements. 
                  From student assistance to creative design and business solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => openModal('students')}
                    className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                  >
                    Explore Student Services
                  </button>
                  <button
                    onClick={() => openModal('inkmint')}
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
                  >
                    Discover Inkmint Studio
                  </button>
                </div>
              </div>
              <div className="text-right">
                <img 
                  src="https://github.com/PradyutKonwar/smartsaathi/blob/main/WP_QR.jpg?raw=true"
                  alt="WhatsApp QR Code"
                  className="w-48 h-48 mx-auto rounded-xl shadow-lg"
                />
                <p className="text-white mt-4 font-medium">Scan to connect instantly!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Launchers */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-4 z-30">
        <button
          onClick={() => openModal('students')}
          className="group bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-l-2xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center"
        >
          <GraduationCap className="w-6 h-6" />
          <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-0 group-hover:max-w-xs overflow-hidden">
            Students
          </span>
        </button>
        
        <button
          onClick={() => openModal('inkmint')}
          className="group bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-l-2xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center"
        >
          <Palette className="w-6 h-6" />
          <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-0 group-hover:max-w-xs overflow-hidden">
            Inkmint
          </span>
        </button>
        
        <button
          onClick={() => openModal('bridge')}
          className="group bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-l-2xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center relative"
        >
          <Building2 className="w-6 h-6" />
          <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-0 group-hover:max-w-xs overflow-hidden">
            Bridge
          </span>
          <span className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Soon
          </span>
        </button>
      </div>

      {/* Service Modals */}
      {activeModal === 'students' && (
        <ServiceModal vertical="students" services={services.students} />
      )}
      {activeModal === 'inkmint' && (
        <ServiceModal vertical="inkmint" services={services.inkmint} />
      )}
      {activeModal === 'bridge' && (
        <ServiceModal vertical="bridge" services={[]} />
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.service.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.service.name}</h4>
                          <p className="text-sm text-gray-600">{item.service.category}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.service.id, -1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.service.id, 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Proceed to Order on WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Required for order processing</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={userData.whatsapp}
                  onChange={(e) => setUserData({...userData, whatsapp: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your WhatsApp number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={!userData.name || !userData.whatsapp || !userData.email}
                className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium mt-6"
              >
                Continue to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

export default App