import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Palette, Building2, ShoppingCart, Phone, Mail, User, Plus, Minus, MapPin, Facebook, ExternalLink, Download, CheckCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  mrp?: number;
  finalRate?: number;
  introPrice?: number;
  basePrice?: number;
  minQuantity?: number;
  unit?: string;
}

interface CartItem {
  service: Service;
  quantity: number;
}

interface UserData {
  name: string;
  whatsapp: string;
  email: string;
  projectDetails?: string;
}

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [userData, setUserData] = useState<UserData>({ name: '', whatsapp: '', email: '', projectDetails: '' });
  const [currentGradient, setCurrentGradient] = useState(0);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bridgeNotifyData, setBridgeNotifyData] = useState({ name: '', whatsapp: '', email: '' });

  // Dynamic color gradients based on specifications
  const gradients = [
    'bg-gradient-to-br from-yellow-400 via-red-400 to-pink-300',
    'bg-gradient-to-tr from-yellow-500 via-green-400 to-white',
    'bg-gradient-to-bl from-red-400 via-pink-400 to-yellow-300',
    'bg-gradient-to-tl from-yellow-600 via-red-500 to-pink-400',
    'bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400'
  ];

  // Auto-rotate gradients with buttery smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Services data with complete pricing logic
  const services = {
    students: [
      // Academic Documents
      { id: 's1', name: 'Digital Project Report (PDF)', category: 'Academic Documents', description: 'Professional project reports delivered digitally via WhatsApp', mrp: 199, finalRate: 149 },
      { id: 's2', name: 'Printed Project Report (Eco)', category: 'Academic Documents', description: 'High-quality printed and spiral-bound project reports', mrp: 349, finalRate: 299 },
      { id: 's3', name: 'Digital Assignment / Notes', category: 'Academic Documents', description: 'Well-formatted assignments and notes in PDF format', mrp: 149, finalRate: 99 },
      { id: 's4', name: 'Printed Assignment / Notes', category: 'Academic Documents', description: 'Printed assignments and notes with spiral binding', mrp: 249, finalRate: 199 },
      { id: 's5', name: 'Combo Kit: Project + Notes + CV', category: 'Academic Documents', description: 'Complete package with all documents printed and bound', mrp: 549, finalRate: 499 },
      
      // Career Documents
      { id: 's6', name: 'Resume / CV Design (PDF)', category: 'Career Documents', description: 'Professional resume design in PDF format', mrp: 119, finalRate: 89 },
      { id: 's7', name: 'Resume + Color Print', category: 'Career Documents', description: 'Professional resume with high-quality printing', mrp: 159, finalRate: 139 },
      
      // Printing Services
      { id: 's8', name: 'Color Printouts (Eco Mode)', category: 'Printing Services', description: 'Affordable color printing on 70-90 gsm paper', mrp: 10, finalRate: 8, unit: 'per page', minQuantity: 2 },
      { id: 's9', name: 'High Quality Color Print', category: 'Printing Services', description: 'Premium color printing on 100 gsm paper', mrp: 12, finalRate: 12, unit: 'per page' },
      { id: 's10', name: 'B/W Printouts (Eco Mode)', category: 'Printing Services', description: 'Economic black and white printing', mrp: 2.5, finalRate: 2.5, unit: 'per page', minQuantity: 4 },
      { id: 's11', name: 'Spiral Binding (Standard)', category: 'Printing Services', description: 'Professional spiral binding up to 80 pages', mrp: 84, finalRate: 69 },
      
      // Delivery Services
      { id: 's12', name: 'Hostel/Home Delivery (Standard)', category: 'Delivery Services', description: '9:30 AM – 8:00 PM (Local)', mrp: 59, finalRate: 49 },
      { id: 's13', name: 'Urgent Express Delivery', category: 'Delivery Services', description: '6:30–11:30 AM & 8:30–11:30 PM (Local)', mrp: 99, finalRate: 89 },
      
      // Add-ons & Support
      { id: 's14', name: 'Urgent Digital Delivery Add-on', category: 'Add-ons & Support', description: 'Within 1 day (PDF only)', mrp: 99, finalRate: 99 },
      { id: 's15', name: 'WhatsApp Order Support', category: 'Add-ons & Support', description: 'Chat-based, instant support', mrp: 0, finalRate: 0 }
    ],
    inkmint: [
      { id: 'i1', name: 'Digital Visiting Card (Standard/Basic)', category: 'Visiting Cards', description: 'Simple layout, clean design, no custom graphics', basePrice: 149, introPrice: 119 },
      { id: 'i2', name: 'Premium Visiting Card Design (3 Options)', category: 'Visiting Cards', description: 'Choose your favourite design – bilingual (Assamese + English)', basePrice: 375, introPrice: 299 },
      { id: 'i3', name: 'WhatsApp-Clickable Version (Add-on)', category: 'Visiting Cards', description: 'Makes your card instantly shareable and mobile-friendly', basePrice: 79, introPrice: 63 },
      { id: 'i4', name: 'Premium Poster (≤20 words)', category: 'Posters & Reels', description: 'High-quality symbolic design with aesthetic layout', basePrice: 349, introPrice: 279 },
      { id: 'i5', name: '+10 Words (Text Add-on)', category: 'Posters & Reels', description: 'Cheaper extension for longer messages (per 10 words)', basePrice: 50, introPrice: 40 },
      { id: 'i6', name: 'Logo/Symbol Add-on (min)', category: 'Branding', description: 'Low-cost branding addition', basePrice: 50, introPrice: 40 },
      { id: 'i7', name: 'Logo/Symbol Add-on (max)', category: 'Branding', description: 'Reduced rate for complex logos or branding', basePrice: 100, introPrice: 80 },
      { id: 'i8', name: 'Reels + Poster Combo', category: 'Posters & Reels', description: 'Dynamic content add-on at a lower bundled price', basePrice: 149, introPrice: 119 },
      { id: 'i9', name: 'Language Adaptation (e.g., Assamese)', category: 'Localization', description: 'Localize your design affordably', basePrice: 49, introPrice: 39 },
      { id: 'i10', name: 'Basic Logo Design (Standalone)', category: 'Branding', description: 'Standalone professional logo at value price', basePrice: 499, introPrice: 399 }
    ]
  };

  // Google Analytics tracking
  const trackEvent = (eventName: string, parameters: any) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
  };

  // Calculate total price with complex pricing logic
  const calculateTotal = () => {
    let total = 0;
    
    cart.forEach(item => {
      const service = item.service;
      const quantity = item.quantity;
      
      if (service.id.startsWith('s')) {
        // Students pricing - use finalRate
        const rate = service.finalRate || 0;
        if (service.minQuantity && quantity < service.minQuantity) {
          total += rate * service.minQuantity;
        } else {
          total += rate * quantity;
        }
      } else if (service.id.startsWith('i')) {
        // Inkmint pricing - use introPrice with bulk discounts for posters
        const rate = service.introPrice || 0;
        let itemTotal = rate * quantity;
        
        // Apply bulk discount for posters
        if (service.id === 'i4' && quantity >= 5) {
          const basePrice = service.basePrice || 0;
          let bulkDiscount = 0;
          if (quantity >= 20) bulkDiscount = 0.15;
          else if (quantity >= 10) bulkDiscount = 0.10;
          else if (quantity >= 5) bulkDiscount = 0.05;
          
          const discountAmount = basePrice * quantity * bulkDiscount;
          itemTotal -= discountAmount;
        }
        
        total += itemTotal;
      }
    });
    
    return Math.round(total * 100) / 100;
  };

  // Add/remove service from cart
  const toggleService = (service: Service) => {
    const isSelected = selectedServices.has(service.id);
    
    if (isSelected) {
      // Remove from cart and selection
      setSelectedServices(prev => {
        const newSet = new Set(prev);
        newSet.delete(service.id);
        return newSet;
      });
      setCart(prev => prev.filter(item => item.service.id !== service.id));
      
      trackEvent('service_selected', {
        event_category: 'Service Selection',
        event_action: 'Remove from Cart',
        event_label: service.name
      });
    } else {
      // Add to cart and selection
      setSelectedServices(prev => new Set(prev).add(service.id));
      setCart(prev => [...prev, { service, quantity: service.minQuantity || 1 }]);
      
      trackEvent('service_selected', {
        event_category: 'Service Selection',
        event_action: 'Add to Cart',
        event_label: service.name
      });
    }
  };

  // Update quantity in cart
  const updateQuantity = (serviceId: string, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.service.id === serviceId) {
        const newQuantity = Math.max(item.service.minQuantity || 1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Submit to Google Sheets
  const submitToGoogleSheets = async (data: any) => {
    try {
      // This would be implemented with Google Apps Script or similar
      console.log('Submitting to Google Sheets:', data);
      // Placeholder for actual implementation
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return false;
    }
  };

  // Handle order submission
  const handleOrderSubmission = async () => {
    if (!userData.name || !userData.whatsapp || !userData.email) return;
    
    setIsSubmitting(true);
    
    const orderData = {
      timestamp: new Date().toISOString(),
      name: userData.name,
      phone: userData.whatsapp,
      email: userData.email,
      details: userData.projectDetails || 'N/A',
      services: cart.map(item => `${item.service.name} (x${item.quantity})`).join(', '),
      total: calculateTotal()
    };
    
    // Submit to Google Sheets
    await submitToGoogleSheets(orderData);
    
    // Track event
    trackEvent('order_form_submitted', {
      event_category: 'Lead Capture',
      event_action: 'Form Submitted',
      user_name: userData.name,
      user_phone: userData.whatsapp,
      user_email: userData.email,
      selected_services: cart.map(item => ({ name: item.service.name, quantity: item.quantity }))
    });
    
    setIsSubmitting(false);
    
    // Prepare WhatsApp message
    const servicesText = cart.map(item => `${item.service.name} (x${item.quantity})`).join('\n');
    const message = `Hello! I'm ${userData.name}.\n\nContact: ${userData.whatsapp}\nEmail: ${userData.email}\n${userData.projectDetails ? `\nProject Details: ${userData.projectDetails}` : ''}\n\nI'd like to order:\n${servicesText}\n\nTotal: ₹${calculateTotal()}\n\nPlease confirm and share payment details. Thank you!`;
    
    // Track WhatsApp redirect
    trackEvent('whatsapp_order_initiated', {
      event_category: 'Order',
      event_action: 'WhatsApp Redirect'
    });
    
    // Open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917002122703?text=${encodedMessage}`, '_blank');
    
    // Reset form
    setCart([]);
    setSelectedServices(new Set());
    setShowOrderSummary(false);
    setUserData({ name: '', whatsapp: '', email: '', projectDetails: '' });
  };

  // Handle Bridge notify me
  const handleBridgeNotify = async () => {
    if (!bridgeNotifyData.name || !bridgeNotifyData.whatsapp || !bridgeNotifyData.email) return;
    
    const notifyData = {
      timestamp: new Date().toISOString(),
      name: bridgeNotifyData.name,
      phone: bridgeNotifyData.whatsapp,
      email: bridgeNotifyData.email,
      details: 'Bridge Interest',
      services: 'Bridge Interest',
      total: 'Bridge Interest'
    };
    
    await submitToGoogleSheets(notifyData);
    
    trackEvent('bridge_notify_me_submitted', {
      event_category: 'Lead Capture',
      event_action: 'Notify Me Submitted',
      user_name: bridgeNotifyData.name,
      user_phone: bridgeNotifyData.whatsapp,
      user_email: bridgeNotifyData.email
    });
    
    setBridgeNotifyData({ name: '', whatsapp: '', email: '' });
    alert('Thank you! We\'ll notify you when SmartSaathi Bridge goes live.');
  };

  const openModal = (vertical: string) => {
    setActiveModal(vertical);
    trackEvent('launcher_click', {
      event_category: 'Navigation',
      event_action: 'Click',
      event_label: vertical
    });
  };

  const ServiceModal = ({ vertical, services }: { vertical: string, services: Service[] }) => {
    const categories = [...new Set(services.map(s => s.category))];
    
    const getVerticalInfo = (vertical: string) => {
      switch(vertical) {
        case 'students':
          return { 
            title: 'SmartSaathi Students', 
            tagline: 'Affordable Student Helpdesk & Print Services',
            gradient: 'bg-gradient-to-br from-teal-50 to-blue-100'
          };
        case 'inkmint':
          return { 
            title: 'SmartSaathi Inkmint', 
            tagline: 'Minting Creativity, Digitally.',
            gradient: 'bg-gradient-to-br from-purple-50 to-pink-100'
          };
        case 'bridge':
          return { 
            title: 'SmartSaathi Bridge', 
            tagline: 'Business Documents & Financial Helpdesk – Coming Soon',
            gradient: 'bg-gradient-to-br from-gray-50 to-orange-100'
          };
        default:
          return { title: '', tagline: '', gradient: 'bg-white' };
      }
    };

    const verticalInfo = getVerticalInfo(vertical);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className={`${verticalInfo.gradient} rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20`}>
          <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-6 rounded-t-3xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 text-lifted-strong">{verticalInfo.title}</h2>
                <p className="text-gray-700 mt-2 text-lifted">{verticalInfo.tagline}</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-3 hover:bg-white/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {vertical === 'bridge' ? (
            <div className="p-8 text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <Building2 className="w-20 h-20 text-gray-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-lifted">Coming Soon</h3>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Launching soon: SmartSaathi Bridge will provide essential document services for new & existing entrepreneurs — 
                  including Loan Files, Form Fillups, MSME Templates, and Financial Reports. Stay tuned for expert support.
                </p>
                
                <div className="max-w-md mx-auto bg-white/80 rounded-xl p-6 shadow-lg">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 text-lifted">Notify Me When Live</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={bridgeNotifyData.name}
                      onChange={(e) => setBridgeNotifyData({...bridgeNotifyData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Number"
                      value={bridgeNotifyData.whatsapp}
                      onChange={(e) => setBridgeNotifyData({...bridgeNotifyData, whatsapp: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={bridgeNotifyData.email}
                      onChange={(e) => setBridgeNotifyData({...bridgeNotifyData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
                    />
                    <button
                      onClick={handleBridgeNotify}
                      disabled={!bridgeNotifyData.name || !bridgeNotifyData.whatsapp || !bridgeNotifyData.email}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lifted shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {categories.map(category => (
                <div key={category} className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4 text-lifted">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.filter(s => s.category === category).map(service => (
                      <div 
                        key={service.id} 
                        className={`relative bg-white/70 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 ${
                          selectedServices.has(service.id) 
                            ? 'border-green-500 bg-green-50/80 shadow-lg' 
                            : 'border-transparent hover:border-blue-300'
                        }`}
                        onClick={() => toggleService(service)}
                      >
                        {selectedServices.has(service.id) && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                        )}
                        <h4 className="font-bold text-gray-900 mb-3 text-lifted">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                        {service.unit && (
                          <p className="text-xs text-blue-600 font-medium">Price {service.unit}</p>
                        )}
                        {service.minQuantity && (
                          <p className="text-xs text-orange-600 font-medium">Min: {service.minQuantity} {service.unit || 'items'}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-6 rounded-b-3xl">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setShowOrderSummary(true);
                      trackEvent('cart_viewed', {
                        event_category: 'Cart Action',
                        event_action: 'View Summary'
                      });
                    }}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 font-bold text-lifted shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {vertical === 'students' ? 'Order on WhatsApp' : 'Get Started on WhatsApp'}
                  </button>
                  {vertical === 'inkmint' && (
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lifted shadow-lg hover:shadow-xl transform hover:scale-105">
                      Explore Designs
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-[8000ms] ease-in-out ${gradients[currentGradient]}`}>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => {setActiveModal(null); setShowCart(false); setShowOrderSummary(false);}}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity group"
            >
              <img 
                src="https://github.com/smartsaathi-dbr/smartsaathihub/blob/main/SMARTSAATHI_HUB_logo.jpeg?raw=true" 
                alt="SmartSaathi Hub Logo" 
                className="w-14 h-14 rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div>
                <h1 className="text-3xl font-bold text-white text-lifted-strong drop-shadow-lg">SmartSaathi Hub</h1>
                <p className="text-white/90 text-lifted drop-shadow-md">Your Digital Assistant</p>
              </div>
            </button>
            
            {cart.length > 0 && (
              <button
                onClick={() => {
                  setShowOrderSummary(true);
                  trackEvent('cart_viewed', {
                    event_category: 'Cart Action',
                    event_action: 'View Summary'
                  });
                }}
                className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white text-lifted-strong drop-shadow-2xl mb-8 leading-tight">
            Welcome to SmartSaathi Hub
          </h2>
          <p className="text-2xl md:text-3xl text-white text-lifted drop-shadow-lg mb-12 leading-relaxed">
            Your Partner in Academic & Creative Success
          </p>
          
          {/* Dynamic Hero Content Area */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl border border-white/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold text-white mb-6 text-lifted-strong">Get Started Today!</h3>
                <p className="text-white/90 mb-8 text-lg leading-relaxed text-lifted">
                  Choose from our three specialized services designed to meet all your requirements. 
                  From student assistance to creative design and business solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => openModal('students')}
                    className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-bold text-lifted shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Explore Student Services
                  </button>
                  <button
                    onClick={() => openModal('inkmint')}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold text-lifted shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Discover Inkmint Studio
                  </button>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="https://github.com/PradyutKonwar/smartsaathi/blob/main/WP_QR.jpg?raw=true"
                  alt="WhatsApp QR Code"
                  className="w-56 h-56 mx-auto rounded-2xl shadow-2xl border-4 border-white/30"
                />
                <p className="text-white mt-6 font-bold text-lg text-lifted">Scan to connect instantly!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Launchers */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-4 z-30">
        <button
          onClick={() => openModal('students')}
          className="group bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white p-4 rounded-l-2xl shadow-xl transition-all duration-300 hover:scale-110 flex items-center border-2 border-white/20"
        >
          <GraduationCap className="w-7 h-7" />
          <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 max-w-0 group-hover:max-w-xs overflow-hidden font-bold text-lifted">
            SmartSaathi Students
          </span>
        </button>
        
        <button
          onClick={() => openModal('inkmint')}
          className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 rounded-l-2xl shadow-xl transition-all duration-300 hover:scale-110 flex items-center border-2 border-white/20"
        >
          <Palette className="w-7 h-7" />
          <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 max-w-0 group-hover:max-w-xs overflow-hidden font-bold text-lifted">
            SmartSaathi Inkmint
          </span>
        </button>
        
        <button
          onClick={() => openModal('bridge')}
          className="group bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white p-4 rounded-l-2xl shadow-xl transition-all duration-300 hover:scale-110 flex items-center relative border-2 border-white/20"
        >
          <Building2 className="w-7 h-7" />
          <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 max-w-0 group-hover:max-w-xs overflow-hidden font-bold text-lifted">
            SmartSaathi Bridge
          </span>
          <span className="absolute -top-3 -left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
            Soon
          </span>
        </button>
      </div>

      {/* Universal Order Now Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowOrderSummary(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300 font-bold text-lifted shadow-2xl hover:shadow-3xl transform hover:scale-110 z-40 border-2 border-white/30"
        >
          Order Now
        </button>
      )}

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

      {/* Universal Order Summary Modal */}
      {showOrderSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 text-lifted-strong">Order Summary</h2>
                <button
                  onClick={() => setShowOrderSummary(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.service.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center shadow-lg">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lifted">{item.service.name}</h4>
                          <p className="text-sm text-gray-600">{item.service.category}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.service.id, -1)}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.service.id, 1)}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* User Information Form */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-lifted">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 text-lifted">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 text-lifted">
                          <Phone className="w-4 h-4 inline mr-2" />
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          value={userData.whatsapp}
                          onChange={(e) => setUserData({...userData, whatsapp: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90"
                          placeholder="Enter your WhatsApp number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 text-lifted">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      {cart.some(item => item.service.id.startsWith('s')) && (
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 text-lifted">
                            Topic/Details of Project/Assignment
                          </label>
                          <textarea
                            value={userData.projectDetails}
                            onChange={(e) => setUserData({...userData, projectDetails: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90"
                            placeholder="Just give us the topic, we will do the rest."
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* WhatsApp Integration */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 text-lifted">Complete Your Order</h3>
                      <img 
                        src="https://github.com/PradyutKonwar/smartsaathi/blob/main/WP_QR.jpg?raw=true"
                        alt="WhatsApp QR Code"
                        className="w-16 h-16 rounded-lg shadow-lg hidden md:block"
                      />
                    </div>
                    
                    <button
                      onClick={handleOrderSubmission}
                      disabled={!userData.name || !userData.whatsapp || !userData.email || isSubmitting}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lifted shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting Order...
                        </>
                      ) : (
                        'Proceed to WhatsApp'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-md text-white mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="https://github.com/smartsaathi-dbr/smartsaathihub/blob/main/SMARTSAATHI_HUB_logo.jpeg?raw=true" 
                  alt="SmartSaathi Hub Logo" 
                  className="w-12 h-12 rounded-lg object-cover shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-lifted">SmartSaathi Hub</h3>
                  <p className="text-gray-300 text-lifted">Your Digital Assistant</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering students, creators, and businesses with comprehensive digital solutions. 
                From academic support to creative design and business documentation.
              </p>
              <img 
                src="https://github.com/PradyutKonwar/smartsaathi/blob/main/WP_QR.jpg?raw=true"
                alt="WhatsApp QR Code"
                className="w-32 h-32 rounded-xl shadow-lg"
              />
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-lifted">Contact Us</h4>
              <div className="space-y-4">
                <a 
                  href="tel:+917002122703" 
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 7002122703</span>
                </a>
                <a 
                  href="mailto:smartsaathi.dbr@gmail.com" 
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>smartsaathi.dbr@gmail.com</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>Dibrugarh, Assam, India</span>
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-lifted">Our Services</h4>
              <div className="space-y-3">
                <button 
                  onClick={() => openModal('students')}
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                >
                  SmartSaathi Students
                </button>
                <button 
                  onClick={() => openModal('inkmint')}
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                >
                  SmartSaathi Inkmint
                </button>
                <button 
                  onClick={() => openModal('bridge')}
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                >
                  SmartSaathi Bridge (Soon)
                </button>
              </div>
              
              <div className="mt-8">
                <h5 className="font-bold mb-4 text-lifted">Follow Us</h5>
                <div className="flex space-x-4">
                  <a 
                    href="https://g.co/kgs/eDGCYjg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61577854696171" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lifted">© 2025 SmartSaathi Hub. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Trusted • Reliable • Professional</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;