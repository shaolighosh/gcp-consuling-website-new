import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const videoUrl = "https://www.authsoriser.io/home-page-video.mp4";
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Create an Image element to test the video URL
    const testVideo = document.createElement('video');
    testVideo.src = videoUrl;
    
    // Set a timeout to handle the case where the video doesn't load
    const timeoutId = setTimeout(() => {
      if (!testVideo.readyState) {
        console.error("Video load timed out");
        setVideoError(true);
      }
    }, 5000);
    
    testVideo.onloadeddata = () => {
      clearTimeout(timeoutId);
      setVideoError(false);
    };
    
    testVideo.onerror = () => {
      clearTimeout(timeoutId);
      console.error("Video load error");
      setVideoError(true);
    };
    
    return () => {
      clearTimeout(timeoutId);
      testVideo.onloadeddata = null;
      testVideo.onerror = null;
    };
  }, [videoUrl]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video or Fallback Background */}
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900"></div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Secure and Transparent<br />
              Authoriser Permissions<br />
              at Scale
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 max-w-2xl">
              Empower your applications with real-time Authoriser permission insights and robust authorization controls.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium inline-block transition-colors duration-300"
              >
                Request a Demo
              </Link>
              <Link 
                to="/get-started" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-md text-lg font-medium inline-block transition-colors duration-300"
              >
                Get Started For Free
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-white opacity-70" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;