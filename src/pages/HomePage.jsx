import React from 'react';
import { Link } from 'react-router-dom';
import { navData } from '../data/navData';
import ImprovedVideoBackground from '../components/ui/ImprovedVideoBackground';
import GradientRing from '../components/ui/GradientRing';
import Slider from '../components/ui/Slider';
import SlideCard from '../components/ui/SlideCard';
import ServiceSection from '../components/ui/ServiceSection';

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Video Background */}
      <ImprovedVideoBackground videoSrc="https://www.authsoriser.io/home-page-video.mp4">
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Secure and Transparent<br />
            Authoriser Permissions<br />
            at Scale
          </h1>
          <p className="max-w-3xl text-xl md:text-2xl mb-8">
            Empower your applications with real-time Authsoriser permission insights and robust authorization controls.
          </p>
          <div>
            <Link 
              to="/contact" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium inline-block"
            >
              Get Started For Free
            </Link>
          </div>
        </div>
      </ImprovedVideoBackground>

      {/* Google Workspace Section */}
      <section className="py-20 bg-white overflow-hidden relative">
        {/* Custom Gradient Ring Component */}
        <GradientRing 
          position="left-0 top-1/2"
          size="500px"
          thickness={15}
          fromColor="red-200"
          toColor="red-100"
          opacity={70}
          transform="-translate-x-1/2 -translate-y-1/2"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">Google<br />Workspace</h2>
              <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed max-w-xl">
                Google Workspace is Google's integrated suite of cloud-based tools that enables seamless communication, collaboration, and productivity from anywhere. Featuring Gmail, Drive, Docs, Meet, and more, it helps teams work smarter with real-time collaboration, secure data management, and powerful admin controls—perfect for businesses of any size.
              </p>
              {/* <Link 
                to="/services/collaboration" 
                className="text-red-600 hover:text-red-700 font-medium inline-flex items-center text-lg"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link> */}
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="/assets/images/Google_Workspace.png" 
                  alt="Google Workspace" 
                  className="rounded-lg w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
     
     <ServiceSection />

     

     

      {/* Partners Section with Horizontal Scrolling - Contained in Box with Animation */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Trusted Partners</h2>
          </div> */}
          <div className="rounded-2xl p-8 bg-white">
            <div className="relative overflow-hidden">
              <div className="animate-marquee flex items-center space-x-20 whitespace-nowrap py-6" style={{ animationDuration: '15s' }}>
                <img 
                  src="/assets/images/google.png" 
                  alt="Google" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
                <img 
                  src="/assets/images/microsoft.png" 
                  alt="Microsoft" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
                <img 
                  src="/assets/images/github.png" 
                  alt="GitHub" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
                <img 
                  src="/assets/images/slack.png" 
                  alt="Slack" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
                <img 
                  src="/assets/images/google.png" 
                  alt="Google" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
                <img 
                  src="/assets/images/microsoft.png" 
                  alt="Microsoft" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
                <img 
                  src="/assets/images/github.png" 
                  alt="GitHub" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
                <img 
                  src="/assets/images/slack.png" 
                  alt="Slack" 
                  className="h-12 w-24 object-contain filter grayscale brightness-0 opacity-75" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-[750px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/home-contact.png" 
            alt="Contact Background" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
            <div className="max-w-lg">
              <h2 className="text-5xl font-bold text-black mb-8 leading-tight">Ready to Enhance Your Authsoriser Security?</h2>
              <Link
                to="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-md text-base font-medium inline-block transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
