import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiGrid } from 'react-icons/fi';
import { FaDatabase, FaTable, FaCube, FaCloudDownloadAlt, FaServer, FaChartLine } from 'react-icons/fa';
import { SiGooglecloud, SiPostgresql, SiFirebase } from 'react-icons/si';
import GradientRing from '../components/ui/GradientRing';

const ServiceNotFoundPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  
  // Auto-redirect after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // Upcoming services to showcase
  const upcomingServices = [
    { 
      name: 'Advanced Analytics', 
      icon: <FaChartLine className="h-12 w-12" />,
      description: 'Unlock actionable insights from your data with our advanced analytics solutions.'
    },
    { 
      name: 'Serverless Computing', 
      icon: <FaServer className="h-12 w-12" />,
      description: 'Scale effortlessly with our serverless architecture tailored for modern applications.'
    },
    { 
      name: 'Real-time Data Streams', 
      icon: <FaTable className="h-12 w-12" />,
      description: 'Process and analyze data in real-time for immediate business intelligence.'
    },
  ];
  
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
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6">
                  <span className="text-white">Coming Soon</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                  {serviceId ? 
                    `The "${serviceId}" service is currently under development.` : 
                    'This service is currently under development.'} 
                  <span className="hidden sm:inline"> We're working hard to bring you cutting-edge solutions that transform your data infrastructure.</span>
                </p>
                
                {/* Mobile CTA button - only visible on small screens */}
                <div className="mt-6 md:hidden">
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={() => document.getElementById('upcoming-services').scrollIntoView({ behavior: 'smooth' })}
                  >
                    See Upcoming Services
                  </button>
                </div>
              </div>
              
              {/* Right side for database icon illustrations - populated by the background */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      
     
    </div>
  );
};

export default ServiceNotFoundPage;
