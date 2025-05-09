import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft, FiHome } from 'react-icons/fi';
import GradientRing from '../components/ui/GradientRing';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  // Auto-redirect after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div>
      {/* Hero Section with animated background and illustrations - Responsive */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-green-900">
        {/* Responsive height adjustment */}
        <div className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-repeat-x bg-center hidden md:block" 
               style={{ backgroundImage: "url('/assets/images/database.gif')" }}></div>
          
          {/* Mobile background with gradient */}
          <div className="absolute inset-0 md:hidden bg-gradient-to-br from-blue-800 to-blue-900 opacity-60"></div>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-blue-900/60 md:to-transparent"></div>
          
          {/* Content container */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
              {/* Left text content */}
              <div className="max-w-xl lg:max-w-2xl mt-20">
                <div className="mb-6 flex">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-red-900/30 rounded-full scale-110 animate-pulse"></div>
                    <div className="relative z-10 bg-red-600/20 p-3 rounded-full">
                      <FiAlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500" />
                    </div>
                  </div>
                  <h1 className="text-6xl sm:text-8xl font-bold text-white ml-4 flex items-center">
                    <span className="text-white">404</span>
                  </h1>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Page Not Found
                </h2>
                
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-6">
                  Oops! The page you're looking for doesn't exist or has been moved.
                  <span className="hidden sm:inline"> Please check the URL or navigate to another section of our site.</span>
                </p>
                
                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/"
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    <FiHome className="h-5 w-5" />
                    Back to Home
                  </Link>
                  
                  <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-2 border border-gray-300 hover:border-red-500 hover:text-red-400 text-gray-200 px-6 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    <FiArrowLeft className="h-5 w-5" />
                    Go Back
                  </button>
                </div>
                
                {/* Auto-redirect Message */}
                <div className="mt-8 text-sm text-gray-300">
                  <p>You will be automatically redirected to the homepage in 30 seconds</p>
                  <div className="w-full max-w-xs bg-gray-700/50 h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{
                      width: '100%',
                      animation: 'shrink 30s linear forwards'
                    }}></div>
                  </div>
                </div>
              </div>
              
              {/* Right side for illustrations - populated by the background */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
