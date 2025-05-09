import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { serviceData } from '../data/serviceData';
import { Link } from 'react-router-dom';

// Import components
import GradientRing from '../components/ui/GradientRing';
import SlideCard from '../components/ui/SlideCard';
import Slider from '../components/ui/Slider';
import ServiceNotFoundPage from './ServiceNotFoundPage';
import ImprovedVideoBackground from '../components/ui/ImprovedVideoBackground';
import IconProvider from '../components/ui/IconProvider';

const ServicePage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  
  useEffect(() => {
    // Find the service data based on the URL parameter
    if (serviceId && serviceData[serviceId]) {
      setService(serviceData[serviceId]);
    }
  }, [serviceId]);

  if (!service) {
    return <ServiceNotFoundPage />;
  }

  // Function to render icons using the IconProvider component
  const renderIcon = (iconName) => {
    return <IconProvider name={iconName} size="lg" />;
  };

  // Render the hero section based on the background type (video or gif)
  const renderHeroSection = () => {
    if (service.heroBackground.type === 'video') {
      return (
        <ImprovedVideoBackground 
          videoSrc={service.heroBackground.src} 
          posterImage={service.heroBackground.poster || ''}
        >
          <div className="max-w-6xl mx-auto text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">{service.title}</h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl">
              {service.heroDescription}
            </p>
            
            <div className="mt-8">
              <Link 
                to="#service-details" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium inline-block transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('service-details').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore {service.title.split(' ')[0]} Options
              </Link>
            </div>
          </div>
        </ImprovedVideoBackground>
      );
    } else {
      // Default is GIF background
      return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-green-900">
          <div className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full pt-16 sm:pt-12 md:pt-8">
            {/* Decorative background elements */}
            <div 
              className="absolute inset-0 bg-repeat-x bg-center hidden md:block" 
              style={{ backgroundImage: `url('${service.heroBackground.src}')` }}
            ></div>
            
            {/* Mobile background with gradient */}
            <div className="absolute inset-0 md:hidden bg-gradient-to-br from-blue-800 to-blue-900 opacity-60"></div>
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-blue-900/60 md:to-transparent"></div>
            
            {/* Content container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mt-8 sm:mt-4 md:mt-0">
                {/* Left text content */}
                <div className="max-w-xl lg:max-w-2xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-6">{service.title}</h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed line-clamp-4 sm:line-clamp-none">
                    {service.heroDescription}
                  </p>
                  
                  {/* Mobile CTA button - only visible on small screens */}
                  <div className="mt-4 md:hidden">
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                      onClick={() => document.getElementById('service-details').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore Options
                    </button>
                  </div>
                </div>
                
                {/* Right side for illustrations - populated by the background */}
                <div className="hidden lg:block"></div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  // Calculate the number of rows needed for the cards
  const calculateCardRows = (cards) => {
    const cardsPerRow = 3; // For lg screens
    const numCards = cards.length;
    const numFullRows = Math.floor(numCards / cardsPerRow);
    const hasPartialRow = numCards % cardsPerRow > 0;
    
    return numFullRows + (hasPartialRow ? 1 : 0);
  };

  // Render the service cards
  const renderServiceCards = () => {
    if (!service.cards || service.cards.length === 0) return null;
    
    const numRows = calculateCardRows(service.cards);
    const cardsPerRow = 3; // For lg screens
    
    const rows = [];
    
    for (let i = 0; i < numRows; i++) {
      const startIndex = i * cardsPerRow;
      const endIndex = Math.min(startIndex + cardsPerRow, service.cards.length);
      const rowCards = service.cards.slice(startIndex, endIndex);
      
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {rowCards.map((card, index) => (
            <div key={`card-${startIndex + index}`} className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
              <div className="text-red-600 mb-4">
                {renderIcon(card.icon)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      );
    }
    
    return rows;
  };

  const renderOverviewSection = () => {
    if (!service.overview || service.overview.length === 0) return null;
    
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{service.overviewTitle}</h2>
            <p className="text-2xl font-semibold text-red-600 mb-6">
              {service.overviewSubtitle}
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
              {service.overviewDescription}
            </p>
          </div>
          
          {/* Training cards with alternating layout */}
          <div className="space-y-10 md:space-y-16">
            {service.overview.map((item, index) => (
              <div 
                key={`overview-${index}`} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-6 md:gap-8 shadow-lg rounded-2xl p-6 md:p-8 bg-white`}
              >
                <div className="w-full md:w-1/2 max-w-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-red-600 font-medium mb-4">
                    {item.duration}
                  </p>
                  <ul className="space-y-2 text-gray-600 list-disc pl-5">
                    {item.features.map((feature, i) => (
                      <li key={`feature-${index}-${i}`} className="leading-relaxed">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2 max-w-lg mt-6 md:mt-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };



  // Render the slider section
  const renderSlider = () => {
    if (!service.slider || service.slider.length === 0) return null;
    
    return (
      <section className="py-16 bg-white">
        <div className="w-full">
          
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{service.sliderTitle}</h2>
            <p className="text-3xl font-semibold text-red-600 max-w-3xl mx-auto">
              {service.sliderSubTitle}
            </p>
          </div>
          </div>
          <Slider
            slides={service.slider.map((slide, index) => (
              <SlideCard
                key={`slide-${index}`}
                image={slide.image}
                title={slide.title}
                description={slide.description}
                path={slide.path}
              />
            ))}
            autoplaySpeed={6000}
          />
        </div>
      </section>
    );
  };

  // Render Feature Section

  const renderFeature = () => {
    if (!service.features || service.features.length === 0) return null;
    
    return (
      <section className="py-16 bg-white">
        <div className="w-full">
          
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{service.featureTitle}</h2>
            <p className="text-3xl font-semibold text-red-600 max-w-3xl mx-auto">
              {service.featureSubTitle}
            </p>
          </div>
          </div>
          <Slider
            slides={service.features.map((feature, index) => (
              <SlideCard
                key={`slide-${index}`}
                image={feature.image}
                title={feature.title}
                description={feature.description}
                path={feature.path}
              />
            ))}
            autoplaySpeed={6000}
          />
        </div>
      </section>
    );
  };


  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
  
  const CrossIcon = () => (
    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );


  const renderPricingPlans = () => {
    if (!service.pricingPlans) return null;
    
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-red-50 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-50 rounded-full opacity-70 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 right-0 w-24 h-24 bg-red-100 rounded-full opacity-50 translate-x-1/2"></div>
        <div className="absolute bottom-1/3 left-0 w-32 h-32 bg-gray-50 rounded-full opacity-60 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{service.pricingPlans.heading}</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-2xl font-semibold text-red-600 mb-5">{service.pricingPlans.subheading}</p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">{service.pricingPlans.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {service.pricingPlans.plans.map((plan, index) => (
              <div 
                key={`plan-${index}`} 
                className={`rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  index === 2 ? 'bg-white ring-2 ring-red-400 ring-opacity-50' : 'bg-white'
                }`}
              >
                {/* Plan header */}
                <div className={`py-8 px-6 ${
                  index === 2 ? 'bg-gradient-to-r from-red-600 to-red-700' : 
                  index === 1 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                  'bg-gradient-to-r from-red-400 to-red-500'
                }`}>
                  <h3 className="text-2xl font-bold text-white text-center">{plan.title}</h3>
                  {index === 2 && (
                    <div className="bg-white text-red-600 text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mt-2 mx-auto">
                      RECOMMENDED
                    </div>
                  )}
                </div>
                
                {/* Response time highlight */}
                <div className="py-6 px-8 bg-white border-b border-gray-100">
                  <p className="font-medium text-center">Response Time: <span className="font-bold text-red-600 ml-1">{plan.responseTime}</span></p>
                </div>
                
                {/* Features list */}
                <div className="p-8 bg-white">
                  <ul className="space-y-5">
                    {plan.features.map((feature, i) => (
                      <li key={`feature-${index}-${i}`} className="flex items-start">
                        {feature.included ? 
                          <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div> : 
                          <div className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        }
                        <span className="text-gray-700 leading-tight">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="p-8 bg-white border-t border-gray-100">
                  <Link 
                    to="/contact" 
                    className={`block text-center py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                      index === 2 ? 
                      'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg' : 
                      'bg-white border-2 border-red-400 hover:border-red-500 hover:bg-red-50 text-red-600'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  

  const renderSupportPlans = () => {
    if (!service.supportPlans) return null;
    
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-red-50 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-50 rounded-full opacity-70 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 right-0 w-24 h-24 bg-red-100 rounded-full opacity-50 translate-x-1/2"></div>
        <div className="absolute bottom-1/3 left-0 w-32 h-32 bg-gray-50 rounded-full opacity-60 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{service.supportPlans.heading}</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-2xl font-semibold text-red-600 mb-5">{service.supportPlans.subheading}</p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">{service.supportPlans.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {service.supportPlans.plans.map((plan, index) => (
              <div 
                key={`plan-${index}`} 
                className={`rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  index === 2 ? 'bg-white ring-2 ring-red-400 ring-opacity-50' : 'bg-white'
                }`}
              >
                {/* Plan header */}
                <div className={`py-8 px-6 ${
                  index === 2 ? 'bg-gradient-to-r from-red-600 to-red-700' : 
                  index === 1 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                  'bg-gradient-to-r from-red-400 to-red-500'
                }`}>
                  <h3 className="text-2xl font-bold text-white text-center">{plan.title}</h3>
                  {index === 2 && (
                    <div className="bg-white text-red-600 text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mt-2 mx-auto">
                      RECOMMENDED
                    </div>
                  )}
                </div>
                
                {/* Response time highlight */}
                <div className="py-6 px-8 bg-white border-b border-gray-100">
                  {/* <p className="font-medium text-center">Response Time: <span className="font-bold text-red-600 ml-1">{plan.responseTime}</span></p> */}
                </div>
                
                {/* Features list */}
                <div className="p-8 bg-white">
                  <ul className="space-y-5">
                    {plan.features.map((feature, i) => (
                      <li key={`feature-${index}-${i}`} className="flex items-start">
                        {feature.included ? 
                          <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div> : 
                          <div className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        }
                        <span className="text-gray-700 leading-tight">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="p-8 bg-white border-t border-gray-100">
                  <Link 
                    to="/contact" 
                    className={`block text-center py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                      index === 2 ? 
                      'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg' : 
                      'bg-white border-2 border-red-400 hover:border-red-500 hover:bg-red-50 text-red-600'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  
  // Render the CTA section
  const renderCTA = () => {
    if (!service.cta) return null;
    
    return (
      <section className="py-16 md:py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="block">{service.cta.title}</span>
              <span className="block text-red-600 mt-2">{service.cta.subtitle}</span>
            </h2>
            
            <div className="mt-8 mb-10 text-sm sm:text-base md:text-lg text-black max-w-3xl mx-auto space-y-4">
              {service.cta.description.map((paragraph, index) => (
                <p key={`cta-p-${index}`}>{paragraph}</p>
              ))}
            </div>
            
            <Link
              to={service.cta.buttonLink}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-base sm:text-lg font-medium inline-block transition-colors"
            >
              {service.cta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      {/* Hero Section with dynamic background */}
      {renderHeroSection()}


      {renderPricingPlans()}

      {renderSupportPlans()}

      {/* Overview Section - New addition with training cards */}
      {renderOverviewSection()}

      {/* Service Details Section */}
      {service.cardTitle && service.cardDescription && service.cards &&


      <section id="service-details" className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Decorative background circles */}
        <GradientRing 
          position="left-0 top-0.8"
          size="500px"
          thickness={15}
          fromColor="red-200"
          toColor="red-100"
          opacity={70}
          transform="-translate-x-1/2 -translate-y-1/2"
        />     

        <GradientRing 
          position="right-0 bottom-10"
          size="500px"
          thickness={15}
          fromColor="red-200"
          toColor="red-100"
          opacity={70}
          transform="-translate-x-1/2 -translate-y-1/2"
        />        
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{service.cardTitle}</h2>
            <p className="text-3xl font-semibold text-red-600 max-w-3xl mx-auto">
              {service.cardDescription}
            </p>
          </div>
          
          {/* Service Cards - Dynamic Grid Based on Service Data */}
          {renderServiceCards()}
        </div>
      </section>
      }


      {/* Slider with Cards Section - Dynamic Based on Service Data */}
      {renderSlider()}

      {/* Feature Section - Dynamic Based on Service Data */}
      {renderFeature()}

      {/* CTA Section - Dynamic Based on Service Data */}
      {renderCTA()}

      
    </div>
  );
};

export default ServicePage;
