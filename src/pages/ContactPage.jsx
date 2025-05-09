import { useState, useEffect, useRef } from 'react';
import GradientRing from '../components/ui/GradientRing';
import { FiExternalLink } from 'react-icons/fi';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const formContainerRef = useRef(null);

  // Add useEffect to load the Typeform embed script
  useEffect(() => {
    // Add CSS for minimal scrolling
    const style = document.createElement('style');
    style.textContent = `
      .tf-v1-widget {
        height: auto !important;
      }
      .tf-v1-widget iframe {
        height: 1000px !important; /* Tall enough to show the entire form */
        max-height: none !important;
        scrolling: none !important;
        overflow: visible !important;
      }
    `;
    document.head.appendChild(style);
    
    // Create script element for Typeform
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    
    // Set up loading state handler
    script.onload = () => {
      // Wait for the iframe to be injected and modify it
      const observer = new MutationObserver(() => {
        const iframe = document.querySelector('.typeform-container iframe');
        if (iframe) {
          iframe.scrolling = 'no';
          iframe.style.overflow = 'visible';
          iframe.style.height = '1500px';
          setIsLoading(false);
          observer.disconnect();
        }
      });
      
      // Start observing for the iframe
      if (formContainerRef.current) {
        observer.observe(formContainerRef.current, { childList: true, subtree: true });
      }
    };
    
    // Append script to body
    document.body.appendChild(script);
    
    // Cleanup function to remove script and style when component unmounts
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      {/* Hero Section - modern office design with overlay */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/contact-hero.jpg)' }}>
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50"></div>
        
        {/* Content positioned to the left side */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">Contact Us</h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-xl">Have questions? We're here to help—contact us anytime.</p>
            </div>
          </div>
        </div>
      </section>

            {/* Contact Form Section with decorative elements */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative gradient rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GradientRing 
                   position="left-0 top-1/2"
                   size="700px"
                   thickness={15}
                   fromColor="red-200"
                   toColor="red-100"
                   opacity={70}
                   transform="-translate-x-1/2 -translate-y-1/2"
                 />
          
          
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Get In Touch With Us</h2>
          </div>
          
          {/* Typeform Container */}
          <div className="bg-transparent rounded-md max-w-4xl mx-auto relative overflow-hidden p-6 sm:p-8">
            {/* Typeform Embed with Loading State */}
              <div className="relative">
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-lg" style={{ height: '1500px' }}>
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-t-red-600 border-r-red-400 border-b-red-200 border-l-transparent mb-4"></div>
                    <p className="text-gray-700">Loading form...</p>
                  </div>
                </div>
              )}
              
              {/* Form Container */}
              <div 
                ref={formContainerRef}
                className="typeform-container w-full min-h-[1000px] rounded-lg overflow-visible shadow-sm"
              >
                <div 
                  data-tf-live="01JTR9YJ5T35KBCHKBDFEKGVKX" 
                  data-tf-medium="embed-xl"
                  data-tf-iframe-props="style=border:none;"
                  className="h-full"
                ></div>
              </div>
              
              {/* White Button with Red Shine at Bottom */}
              <div className="mt-6 text-center">
                <a 
                  href="https://form.typeform.com/to/hzJG9kzA" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group relative overflow-hidden"
                >
                  {/* Shining effect */}
                  <span className="absolute -inset-full skew-x-12 bg-gradient-to-r from-transparent via-red-100 to-transparent group-hover:animate-shine" />
                  <span className="relative flex items-center">
                    Open Form in New Tab
                    <FiExternalLink className="ml-2 h-5 w-5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ContactPage;
