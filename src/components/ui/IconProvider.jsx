import React from 'react';
import { 
  FaDatabase, FaTable, FaCube, FaMemory, FaCloudDownloadAlt, FaCloud, FaCode, 
  FaDocker, FaNetworkWired, FaShieldAlt, FaChartLine, FaCloudUploadAlt, 
  FaRocket, FaCogs, FaHandsHelping, FaEnvelope, FaCalendarAlt, FaVideo, 
  FaFileAlt, FaSlideshare, FaChartBar, FaUserShield, FaBrain, 
  FaExclamationTriangle, FaRobot, FaServer, FaWindows, FaDesktop,
  FaExchangeAlt, FaLaptopCode, FaClone, FaLock,
  FaSyncAlt, FaKey, FaLink
} from 'react-icons/fa';

import {
  SiGooglecloud, SiFirebase, SiPostgresql, SiOracle, SiRedhat
} from 'react-icons/si';

// Safe icon mapping - only include icons we know exist
const baseIcons = {
  // Basic service icons (most commonly used)
  FaServer,
  FaCloud,
  FaDatabase,
  FaWindows,
  FaDesktop,
  FaCode,
  FaShieldAlt,
  FaMemory,
  FaTable,
  FaCloudDownloadAlt,
  SiGooglecloud,
  SiRedhat,
  
  // Additional icons
  FaCube, 
  FaRocket, 
  FaCogs, 
  FaHandsHelping, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaVideo,
  FaFileAlt, 
  FaSlideshare, 
  FaChartBar, 
  FaUserShield, 
  FaBrain,
  FaExclamationTriangle, 
  FaRobot,
  FaExchangeAlt, 
  FaLaptopCode, 
  FaClone, 
  FaLock,
  FaSyncAlt, 
  FaKey, 
  FaLink,
  SiFirebase, 
  SiPostgresql, 
  SiOracle
};

// Custom mappings for service-specific icons
const customMappings = {
  // Use existing icons as fallbacks for specific services
  FaVirtualMachine: FaServer,
  FaRedhat: SiRedhat,
  SiVmware: FaServer,
  SiWindows: FaWindows,
  SiMicrosoft: FaDesktop,
  SiAmazonaws: FaCloud,
  FaMicrosoft: FaDesktop,
  FaAws: FaCloud
};

/**
 * IconProvider - A component to centralize icon management
 * 
 * @param {Object} props
 * @param {string} props.name - The name of the icon to render
 * @param {string} props.size - Size of the icon (sm, md, lg, xl)
 * @param {string} props.color - Optional color class for the icon
 * @returns {JSX.Element} The rendered icon or an image
 */
const IconProvider = ({ name, size = 'md', color = 'text-red-600', className = '' }) => {
  // Size mapping
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  // Check if this is an image path
  if (name && (name.startsWith('/') || name.startsWith('http'))) {
    return (
      <img 
        src={name} 
        alt="Icon" 
        className={`${sizeClasses[size]} ${className}`} 
      />
    );
  }
  
  // Try custom mappings first (our aliases)
  if (name && customMappings[name]) {
    const CustomIcon = customMappings[name];
    return <CustomIcon className={`${sizeClasses[size]} ${color} ${className}`} />;
  }
  
  // Try to get the icon from the base icons collection
  if (name && baseIcons[name]) {
    const IconComponent = baseIcons[name];
    return <IconComponent className={`${sizeClasses[size]} ${color} ${className}`} />;
  }
  
  // Fallback based on naming convention
  console.warn(`Icon not found: ${name}, using fallback`);
  
  // Default fallbacks
  if (!name || name === '') {
    return <FaDatabase className={`${sizeClasses[size]} ${color} ${className}`} />;
  }
  
  // Try to match by prefix
  if (name.startsWith('Fa')) {
    return <FaServer className={`${sizeClasses[size]} ${color} ${className}`} />;
  } else if (name.startsWith('Si')) {
    return <SiGooglecloud className={`${sizeClasses[size]} ${color} ${className}`} />;
  }
  
  // Final fallback for any unrecognized icon name
  return <FaDatabase className={`${sizeClasses[size]} ${color} ${className}`} />;
};

export default IconProvider;
