import React from 'react';
import { Link } from 'react-router-dom';
import { navData } from '../../data/navData';
import Slider from './Slider';

const SlideCard = ({ image, title, navKey }) => {
  // Get the relevant navigation items based on the key
  const features = navKey && navData[navKey] ? navData[navKey].items : [];
  
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl h-[600px] max-w-[1800px] w-full mx-auto">
      {/* Service Image */}
      <div className="relative h-full w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-8 transition-all duration-500 group-hover:bg-black/90 group-hover:from-black group-hover:to-black/90">
          <h3 className="text-3xl font-bold text-white mb-3 transition-all group-hover:opacity-0">{title}</h3>
          <p className="text-white/80 line-clamp-3 text-base group-hover:opacity-0 transition-opacity duration-300">
            {navData[navKey]?.description || "Explore our comprehensive services"}
          </p>
        </div>
        
        {/* Services list that appears on hover */}
        <div className="absolute inset-0 p-8 grid grid-cols-2 gap-4 content-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="col-span-2">
            <h3 className="text-3xl font-bold text-white mb-6">{title}</h3>
          </div>
          
          {features.map((item) => (
            <Link 
              key={item.id}
              to={item.path}
              className="text-white hover:text-red-400 text-lg font-medium transition-colors duration-300 flex items-center py-2.5"
              onClick={() => window.scrollTo(0, 0)}
            >
              <span className="mr-2 text-red-500 text-xl">›</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Service cards with slider */}
        <div className="relative mt-8 mb-16 w-full max-w-[2200px] mx-auto">
          <Slider
            slides={[
              <SlideCard
                key="slide1"
                image="/assets/images/googlecloud.png"
                title="Google Cloud"
                navKey="googleCloud"
              />,
              <SlideCard
                key="slide2"
                image="/assets/images/smartworkspace.png"
                title="Google Workspace"
                navKey="googleWorkspace"
              />,
              <SlideCard
                key="slide3"
                image="/assets/images/realtime.png"
                title="AI & ML Services"
                navKey="aimlServices"
              />
            ]}
            autoplaySpeed={6000}
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;