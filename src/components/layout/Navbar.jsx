import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navData } from '../../data/navData';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    // Also close any open dropdowns when changing routes
    setActiveDropdown(null);
  }, [location]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if we clicked on a dropdown item/link
      const isDropdownContent = event.target.closest('.dropdown-content');
      const isDropdownTrigger = event.target.closest('.dropdown-trigger');
      
      // Close if we clicked outside dropdown content and trigger
      if (activeDropdown && !isDropdownContent && !isDropdownTrigger) {
        setActiveDropdown(null);
      }
    };

    // Only add the event listener if a dropdown is active
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };
  
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // For mobile menu toggle (click behavior)
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {scrolled ? (
                <img 
                  src="/assets/images/logo-black.png" 
                  alt="Authsoriser" 
                  className="h-8 transition-transform duration-300 transform hover:scale-110"
                />
              ) : (
                <img 
                src="/assets/images/logo.png" 
                alt="Authsoriser" 
                className="h-8 transition-transform duration-300 transform hover:scale-110"
              />
              )}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* Google Cloud Dropdown */}
            <div 
              className="relative group" 
              onMouseEnter={() => handleMouseEnter('googleCloud')} 
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`dropdown-trigger inline-flex items-center font-medium ${scrolled ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
              >
                Google Cloud
                <svg
                  className="ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeDropdown === 'googleCloud' && (
                <div className="absolute left-0 top-full w-72 z-50">
                  {/* Invisible bridge to prevent hover gap issues */}
                  <div className="h-3 w-full bg-transparent"></div>
                  <div className="dropdown-content rounded-md shadow-lg bg-white ring-1 ring-gray-200 overflow-hidden">
                    <div className="py-3 px-4">
                      <div className="border-b border-gray-200 pb-2 mb-3">
                        <h3 className="text-lg font-semibold text-black">Google Cloud</h3>
                      </div>
                      <div className="space-y-1">
                        {navData.googleCloud.items.map((item) => (
                          <Link
                            key={item.id}
                            to={item.path}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black rounded-md transition-all duration-200"
                          >
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Google Workspace Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('googleWorkspace')} 
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`dropdown-trigger inline-flex items-center font-medium ${scrolled ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
              >
                Google Workspace
                <svg
                  className="ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeDropdown === 'googleWorkspace' && (
                <div className="absolute left-0 top-full w-72 z-50">
                  {/* Invisible bridge to prevent hover gap issues */}
                  <div className="h-3 w-full bg-transparent"></div>
                  <div className="dropdown-content rounded-md shadow-lg bg-white ring-1 ring-gray-200 overflow-hidden">
                    <div className="py-3 px-4">
                      <div className="border-b border-gray-200 pb-2 mb-3">
                        <h3 className="text-lg font-semibold text-black">Google Workspace</h3>
                      </div>
                      <div className="space-y-1">
                        {navData.googleWorkspace.items.map((item) => (
                          <Link
                            key={item.id}
                            to={item.path}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black rounded-md transition-all duration-200"
                          >
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI & ML Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('aimlServices')} 
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`dropdown-trigger inline-flex items-center font-medium ${scrolled ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
              >
                AI & ML Services
                <svg
                  className="ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeDropdown === 'aimlServices' && (
                <div className="absolute left-0 top-full w-72 z-50">
                  {/* Invisible bridge to prevent hover gap issues */}
                  <div className="h-3 w-full bg-transparent"></div>
                  <div className="dropdown-content rounded-md shadow-lg bg-white ring-1 ring-gray-200 overflow-hidden">
                    <div className="py-3 px-4">
                      <div className="border-b border-gray-200 pb-2 mb-3">
                        <h3 className="text-lg font-semibold text-black">AI & ML Services</h3>
                      </div>
                      <div className="space-y-1">
                        {navData.aimlServices.items.map((item) => (
                          <Link
                            key={item.id}
                            to={item.path}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black rounded-md transition-all duration-200"
                          >
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <Link
              to="/contact"
              className={`hidden md:block px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                scrolled 
                ? 'bg-black text-white border border-black hover:bg-transparent hover:text-black' 
                : 'bg-white text-black border border-white hover:bg-transparent hover:text-white'
              }`}
            >
              Contact Us
            </Link>
            
            {/* Mobile menu button */}
            <button
              type="button"
              className={`ml-4 inline-flex items-center justify-center p-2 rounded-md focus:outline-none md:hidden ${
                scrolled ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-200'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className={`pt-2 pb-3 space-y-1 px-4 rounded-b-lg ${scrolled ? 'bg-white shadow-md' : 'bg-black bg-opacity-95 backdrop-blur-lg'}`}>
          {/* Mobile menu items */}
          {Object.keys(navData).map((key) => (
            <div key={key} className="py-1 border-b border-gray-700 last:border-b-0">
              <button
                onClick={() => toggleDropdown(key)}
                className={`flex justify-between items-center w-full px-4 py-3 rounded-md text-base font-medium text-left transition-all duration-200 ${
                  scrolled 
                  ? 'text-black hover:bg-gray-100' 
                  : 'text-white hover:bg-gray-800'
                }`}
              >
                <span>{navData[key].title}</span>
                <svg
                  className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === key ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === key ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
              >
                <div className="pl-4 py-1 ml-2 border-l-2 border-gray-500">
                  {navData[key].items.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`block px-4 py-2 rounded-md text-base transition-colors duration-200 ${
                        scrolled 
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-black' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="py-4 px-2 mt-2">
            <Link
              to="/contact"
              className={`block py-3 rounded-md text-base font-medium text-center transition-all duration-300 ${
                scrolled 
                ? 'bg-black text-white border border-black hover:bg-transparent hover:text-black' 
                : 'bg-white text-black border border-white hover:bg-transparent hover:text-white'
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;