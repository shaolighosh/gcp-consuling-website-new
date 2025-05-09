import React from 'react';
import PropTypes from 'prop-types';

// Helper function to map Tailwind color classes to actual color values
const getTailwindColor = (colorClass) => {
  const colorMap = {
    'red-50': '#fef2f2',
    'red-100': '#fee2e2',
    'red-200': '#fecaca',
    'red-300': '#fca5a5',
    'red-400': '#f87171',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    'blue-50': '#eff6ff',
    'blue-100': '#dbeafe',
    'blue-200': '#bfdbfe',
    'blue-300': '#93c5fd',
    'blue-400': '#60a5fa',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'blue-800': '#1e40af',
    'blue-900': '#1e3a8a'
  };
  
  return colorMap[colorClass] || '#fecaca'; // Default to red-200 if color not found
};

/**
 * A customizable gradient ring component that can be used as a decorative element
 * @param {Object} props - Component props
 * @param {string} props.position - Position class for the ring (e.g., "left-0 top-1/2")
 * @param {string} props.size - Size of the outer ring (e.g., "450px")
 * @param {string} props.mobileSize - Size for mobile devices
 * @param {string} props.tabletSize - Size for tablet devices
 * @param {string} props.desktopSize - Size for desktop devices
 * @param {number} props.thickness - Thickness of the ring (percentage of the size)
 * @param {string} props.fromColor - Starting gradient color
 * @param {string} props.toColor - Ending gradient color
 * @param {number} props.opacity - Opacity of the ring (0-100)
 * @param {string} props.transform - CSS transform class (e.g., "-translate-x-1/2 -translate-y-1/2")
 * @param {number} props.zIndex - z-index value
 * @param {boolean} props.multipleRings - Whether to show multiple rings
 * @param {string} props.className - Additional CSS classes
 */
const GradientRing = ({
  position = "left-0 top-1/2",
  size = "450px",
  mobileSize,
  tabletSize,
  desktopSize,
  thickness = 18, // thickness as percentage
  fromColor = "red-200",
  toColor = "red-100",
  opacity = 70,
  transform = "-translate-x-1/2 -translate-y-1/2",
  zIndex = 0,
  multipleRings = false,
  className = "",
}) => {
  // Parse size and make it responsive
  let sizeValue = size;
  if (typeof size === 'string' && size.includes('px')) {
    sizeValue = size;
  }
  
  // Calculate inner circle size based on thickness
  const sizePixels = typeof sizeValue === 'string' && sizeValue.includes('px') 
    ? parseInt(sizeValue) 
    : parseInt(sizeValue);
  const thicknessPixels = sizePixels * (thickness / 100);
  const innerSize = `${sizePixels - (thicknessPixels * 2)}px`;
  
  // Calculate sizes for multiple rings if enabled
  const secondRingSize = multipleRings ? `${parseInt(size) * 0.75}px` : null;
  const secondRingInnerSize = multipleRings ? `${parseInt(secondRingSize) - (thicknessPixels * 1.5)}px` : null;
  
  return (
    <div className={`${className} absolute ${position} overflow-visible`} style={{ zIndex }}>
      {/* Main outer ring */}
      <div 
        className={`absolute rounded-full ${transform}`}
        style={{ 
          width: size, 
          height: size, 
          background: `linear-gradient(to bottom right, ${getTailwindColor(fromColor)}, ${getTailwindColor(toColor)})`,
          opacity: opacity / 100
        }}
      >
        {/* Inner circle to create ring effect */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ width: innerSize, height: innerSize }}
        />
      </div>
      
      {/* Second ring if multipleRings is true */}
      {multipleRings && (
        <div 
          className={`absolute rounded-full ${transform}`}
          style={{ 
            width: secondRingSize, 
            height: secondRingSize,
            top: '60%',
            left: '20%',
            background: `linear-gradient(to top right, ${getTailwindColor(fromColor)}, ${getTailwindColor(toColor)})`,
            opacity: opacity / 100
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{ width: secondRingInnerSize, height: secondRingInnerSize }}
          />
        </div>
      )}
    </div>
  );
};

GradientRing.propTypes = {
  position: PropTypes.string,
  size: PropTypes.string,
  thickness: PropTypes.number,
  fromColor: PropTypes.string,
  toColor: PropTypes.string,
  opacity: PropTypes.number,
  transform: PropTypes.string,
  zIndex: PropTypes.number,
  multipleRings: PropTypes.bool,
  className: PropTypes.string,
};

export default GradientRing;
