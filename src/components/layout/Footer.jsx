import { Link } from 'react-router-dom';
import { navData } from '../../data/navData';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const mapRef = useRef(null);
  
  // Initialize Google Maps
  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGixKMw0bYA6maAItO7IhqpirrVLyX_lQ&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    // Initialize the map
    const initMap = () => {
      if (!mapRef.current) return;
      
      // Create map centered between the two locations
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 3,
        center: { lat: 48.8583, lng: -97.2264 }, // Center point between Wyoming and Calgary
        styles: [
          {
            "elementType": "geometry",
            "stylers": [{"color": "#212121"}]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#757575"}]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#212121"}]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{"color": "#757575"}]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9e9e9e"}]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#bdbdbd"}]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#757575"}]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{"color": "#181818"}]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#616161"}]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#2c2c2c"}]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#8a8a8a"}]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{"color": "#373737"}]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"color": "#3c3c3c"}]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{"color": "#4e4e4e"}]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#000000"}]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#3d3d3d"}]
          }
        ]
      });

      // Add markers for offices
      const locations = [
        {
          position: { lat: 41.1399, lng: -104.8202 }, // Cheyenne, WY
          title: "Cheyenne, WY, USA",
          label: "A"
        },
        {
          position: { lat: 51.0447, lng: -114.0719 }, // Calgary, Alberta
          title: "Calgary, Alberta, Canada",
          label: "B"
        }
      ];

      // Create markers with red color
      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: location.position,
          map: map,
          title: location.title,
          label: {
            text: location.label,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '10px'
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#EF4444', // Tailwind red-500
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 1,
            scale: 10
          }
        });

        // Add info window with black text
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="color: #000000; padding: 8px;"><strong>${location.title}</strong></div>`
        });
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    };

    loadGoogleMapsScript();

    // Cleanup
    return () => {
      window.initMap = null;
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Logo and Map Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                className="h-10 w-auto"
                src="/assets/images/logo.png"
                alt="Authsoriser"
              />
            </Link>
            
            {/* Google Maps with both office locations */}
            <div className="rounded-lg overflow-hidden w-full h-[260px] border border-gray-700 relative">
              <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
              
              {/* Location labels */}
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-80 text-white text-xs p-2 rounded z-10">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">A</div>
                  <span>Cheyenne, WY, USA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">B</div>
                  <span>Calgary, Alberta, Canada</span>
                </div>
              </div>
            </div>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to={navData.googleWorkspace.items[0].path} className="text-gray-300 hover:text-white text-sm transition-colors">
                  Google Workspace
                </Link>
              </li>
              <li>
                <Link to={navData.googleCloud.items[0].path} className="text-gray-300 hover:text-white text-sm transition-colors">
                  Google Cloud Platform
                </Link>
              </li>
              <li>
                <Link to="/services/google-vertex-ai" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Google Vertex AI
                </Link>
              </li>
              <li>
                <Link to="/services/google-gemini" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Google Gemini
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Authsoriser Section */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Follow Authsoriser</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://cloud.google.com/find-a-partner/partner/authsoriser" target='_blank' className="text-gray-300 hover:text-white text-sm transition-colors">
                  Google Partners
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/authsoriser" target='_blank' className="text-gray-300 hover:text-white text-sm transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://youtube.com/authsoriser" target='_blank' className="text-gray-300 hover:text-white text-sm transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://instagram.com/authsoriser" target='_blank' className="text-gray-300 hover:text-white text-sm transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Join Experience Section */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">Join The Authsoriser Experience</h3>
            <p className="text-sm text-gray-300 mb-4">
              Transforming your digital landscape with top-tier cloud migration and management services and solutions.
            </p>
            <div className="mt-2">
              <a href="mailto:hello@authsoriser.io" className="flex items-center text-gray-300 hover:text-white text-sm group">
                <svg className="h-5 w-5 mr-2 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 7L12 14L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                hello@authsoriser.io
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright Line */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-500">
            Authsoriser, Inc {currentYear}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;