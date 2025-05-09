import { useState, useEffect, useRef } from 'react';

const ImprovedVideoBackground = ({ videoSrc, posterImage, children }) => {
  // State variables
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null); // For requestAnimationFrame
  
  // Function to draw the current frame to canvas
  const drawFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || video.paused) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Match canvas size to container
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    
    // Calculate how to center the video and maintain aspect ratio
    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, x, y;
    
    if (videoRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = video.videoWidth * (canvas.height / video.videoHeight);
      x = (canvas.width - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = video.videoHeight * (canvas.width / video.videoWidth);
      x = 0;
      y = (canvas.height - drawHeight) / 2;
    }
    
    // Draw the video frame
    ctx.drawImage(video, x, y, drawWidth, drawHeight);
    
    // Add semi-transparent overlay for better text readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Continue animation loop
    rafRef.current = requestAnimationFrame(drawFrame);
  };
  
  // Force draw the current frame (for paused state)
  const drawCurrentFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Match canvas size to container
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    
    // Calculate how to center the video and maintain aspect ratio
    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, x, y;
    
    if (videoRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = video.videoWidth * (canvas.height / video.videoHeight);
      x = (canvas.width - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = video.videoHeight * (canvas.width / video.videoWidth);
      x = 0;
      y = (canvas.height - drawHeight) / 2;
    }
    
    // Draw the video frame
    ctx.drawImage(video, x, y, drawWidth, drawHeight);
    
    // Add semi-transparent overlay for better text readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        drawCurrentFrame(); // Redraw on resize
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Explicitly handle video source changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Reset video state when source changes
    setIsLoading(true);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    // Set a timeout to ensure loading state isn't stuck
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Force loading to end after 5 seconds maximum
    }, 3000);
    
    // Force reload by updating the src attribute
    video.src = videoSrc;
    video.load(); // Explicitly tell the browser to load the new source
    
    return () => {
      clearTimeout(loadingTimeout); // Clean up the timeout
    };
  }, [videoSrc]);

  // Setup video and canvas
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    // Initial setup for canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Video event handlers
    const handleVideoLoad = () => {
      setIsLoading(false);
      // Start playing and drawing frames
      if (isPlaying) {
        video.play()
          .then(() => {
            rafRef.current = requestAnimationFrame(drawFrame);
          })
          .catch(error => {
            console.error('Video play error:', error);
            // Still draw at least one frame
            drawCurrentFrame();
          });
      } else {
        // If not playing, still draw the first frame
        drawCurrentFrame();
      }
    };
    
    const handleVideoError = () => {
      console.error('Video playback error');
      setIsLoading(false);
      // Fallback to displaying a static image when video fails
      const canvas = canvasRef.current;
      if (canvas && posterImage) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        };
        img.src = posterImage;
      }
    };
    
    // Add video events
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('error', handleVideoError);
    
    // Set initial muted state (required for autoplay)
    video.muted = isMuted;
    
    // Clean up
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('error', handleVideoError);
      
      // Clear video resources to prevent memory leaks
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);
  
  // Handle play/pause toggle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      // Start playing
      video.play().then(() => {
        // Start animation loop
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(drawFrame);
        }
      }).catch(err => console.error('Error playing video:', err));
    } else {
      // Pause video
      video.pause();
      
      // Cancel animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      
      // Draw the current frame when paused
      drawCurrentFrame();
    }
  }, [isPlaying]);
  
  // Handle mute/unmute toggle
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = isMuted;
  }, [isMuted]);
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Hidden video element (used as source for canvas) */}
      <video 
        ref={videoRef}
        poster={posterImage}
        loop
        playsInline
        className="hidden"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Canvas for rendering the video */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {children}
        </div>
      </div>
      
      {/* Video controls */}
      <div className="absolute bottom-6 right-6 flex space-x-4 z-30">
        <button 
          onClick={togglePlay}
          className="p-2 rounded-full bg-black bg-opacity-60 text-white hover:bg-opacity-80 transition-all"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <button 
          onClick={toggleMute} 
          className="p-2 rounded-full bg-black bg-opacity-60 text-white hover:bg-opacity-80 transition-all"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071a1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
      </div>
    </div>
  );
};

export default ImprovedVideoBackground;