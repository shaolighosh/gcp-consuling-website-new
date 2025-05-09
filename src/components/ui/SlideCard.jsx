import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SlideCard = ({ image, title, description, path }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Add a slight delay for the animation effect
  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => {
        setIsActive(true);
      }, 50);
    } else {
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <Link 
      to={path}
      className="block relative rounded-lg overflow-hidden h-96 shadow-xl transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image layer with darker effect and micro-animations on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? 'opacity-85 saturate-125' : 'opacity-100'}`}
          style={{ 
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out, filter 0.6s ease-out'
          }}
        />
      </div>
      
      {/* Animated border effect on hover */}
      <div className={`absolute inset-0 border-2 rounded-lg transition-all duration-500 ${isHovered ? 'border-white opacity-30' : 'border-transparent opacity-0'}`}></div>
      
      {/* Main title bar always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent pt-16 pb-6 px-6 z-10">
        <h3 className={`text-2xl font-bold text-white transition-all duration-300 ${isHovered ? 'transform translate-y-1 opacity-85' : ''}`}>{title}</h3>
      </div>

      {/* Overlay sub-card with details that appears on hover (positioned higher) */}
      {isHovered && (
        <div 
          className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] bg-black bg-opacity-85 rounded-lg p-5 flex flex-col justify-center items-center shadow-2xl border border-gray-700 transform transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ maxHeight: '80%' }}
        >
          <h3 className="text-xl font-bold text-white mb-3 animate-fadeInDown">{title}</h3>
          <p className="text-white text-center text-sm mb-4 animate-fadeInUp overflow-hidden">{description}</p>
          
        </div>
      )}
    </Link>
  );
};

export default SlideCard;
