import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const videos = [
    {
      src: '/videos/data-streams.mp4',
      title: 'Data Organization'
    },
    {
      src: '/videos/network-convergence.mp4',
      title: 'Network Convergence'
    },
    {
      src: '/videos/data-highways.mp4',
      title: 'Data Flow'
    },
    {
      src: '/videos/particle-flow.mp4',
      title: 'Particle Systems'
    }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [videos.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setIsVideoLoaded(false);
      video.load();
    }
  }, [currentVideoIndex]);

  return (
    <div className="video-background">
      <div className="video-overlay"></div>
      <video
        ref={videoRef}
        className={`hero-video ${isVideoLoaded ? 'loaded' : ''}`}
        autoPlay
        muted
        playsInline
        preload="metadata"
      >
        <source src={videos[currentVideoIndex].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Navigation Dots */}
      <div className="video-navigation">
        {videos.map((video, index) => (
          <button
            key={index}
            className={`video-dot ${index === currentVideoIndex ? 'active' : ''}`}
            onClick={() => setCurrentVideoIndex(index)}
            aria-label={`Play ${video.title}`}
            title={video.title}
          />
        ))}
      </div>

      {/* Loading indicator */}
      {!isVideoLoaded && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;