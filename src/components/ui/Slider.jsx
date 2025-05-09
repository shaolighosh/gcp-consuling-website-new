import { useState, useEffect, useRef } from 'react';

const Slider = ({ slides, autoplaySpeed = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  // Get the actual slide indices for display (previous, current, next)
  const getVisibleSlideIndices = () => {
    const previousIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    return [previousIndex, currentIndex, nextIndex];
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide();
      }, autoplaySpeed);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isHovered, autoplaySpeed]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [prevSlideIndex, currentSlideIndex, nextSlideIndex] = getVisibleSlideIndices();

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={sliderRef}
    >
      {/* Full-width slider with clear gaps between slides */}
      <div className="flex justify-center items-center w-full relative h-full">
        {/* On desktop: Container for slider with all cards */}
        <div className="w-full flex justify-center items-center">
          {/* Previous slide (left) with overflow and clear gap */}
          <div className="hidden md:block w-1/3 h-full pr-6 relative transition-all duration-700 ease-in-out transform translate-x-6 opacity-80">
            {slides[prevSlideIndex]}
          </div>

          {/* Current slide (center) with higher z-index and animation */}
          <div className="w-full md:w-1/3 h-full z-20 transform transition-all duration-700 ease-in-out px-2 md:px-6 animate-slideUpFade">
            {slides[currentSlideIndex]}
          </div>

          {/* Next slide (right) with overflow and clear gap */}
          <div className="hidden md:block w-1/3 h-full pl-6 relative transition-all duration-700 ease-in-out transform -translate-x-6 opacity-80">
            {slides[nextSlideIndex]}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all z-30"
        onClick={prevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all z-30"
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
