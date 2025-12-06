import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const collageItems = [
  {
    id: 'monash-badge',
    type: 'university-badge',
    university: 'Monash University',
    degree: 'B.S. Computer Science',
    initialPosition: { x: 50, y: 80 },
    rotation: -3,
    zIndex: 10,
  },
  {
    id: 'profile',
    type: 'image',
    src: '/images/profile/big/profile1.png',
    alt: 'Rian Kawahara',
    initialPosition: { x: 400, y: 60 },
    size: { width: 200, height: 'auto' },
    rotation: 2,
    zIndex: 15,
  },
  {
    id: 'tech-react',
    type: 'tech-badge',
    icon: 'devicon-react-original',
    label: 'React',
    initialPosition: { x: 280, y: 300 },
    rotation: 5,
    zIndex: 12,
  },
  {
    id: 'tech-typescript',
    type: 'tech-badge',
    icon: 'devicon-typescript-plain',
    label: 'TypeScript',
    initialPosition: { x: 150, y: 350 },
    rotation: -4,
    zIndex: 11,
  },
  {
    id: 'tech-python',
    type: 'tech-badge',
    icon: 'devicon-python-plain',
    label: 'Python',
    initialPosition: { x: 500, y: 320 },
    rotation: 3,
    zIndex: 13,
  },
  {
    id: 'tech-kotlin',
    type: 'tech-badge',
    icon: 'devicon-kotlin-plain',
    label: 'Kotlin',
    initialPosition: { x: 620, y: 180 },
    rotation: -2,
    zIndex: 11,
  },
  {
    id: 'hackathon-badge',
    type: 'achievement',
    title: 'Tokyo Hackathon',
    subtitle: 'Business Award 2024',
    initialPosition: { x: 580, y: 350 },
    rotation: 4,
    zIndex: 14,
  },
  {
    id: 'article-note',
    type: 'sticky-note',
    text: 'Featured in\nDiamondhead\nIntern Article',
    initialPosition: { x: 80, y: 280 },
    rotation: -5,
    color: '#FEF3C7',
    zIndex: 9,
  },
  {
    id: 'location',
    type: 'location-tag',
    text: 'Tokyo, Japan',
    initialPosition: { x: 350, y: 420 },
    rotation: 0,
    zIndex: 10,
  },
];

const CollageItem = ({ item, onDragStart, onDragStop }) => {
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(item.zIndex);

  const handleStart = () => {
    setIsDragging(true);
    setZIndex(100);
    onDragStart?.(item.id);
  };

  const handleStop = () => {
    setIsDragging(false);
    setZIndex(item.zIndex);
    onDragStop?.(item.id);
  };

  const baseStyle = {
    position: 'absolute',
    cursor: 'grab',
    transform: `rotate(${item.rotation}deg)`,
    transition: isDragging ? 'none' : 'box-shadow 0.2s ease, transform 0.2s ease',
    zIndex: zIndex,
    userSelect: 'none',
  };

  const renderContent = () => {
    switch (item.type) {
      case 'image':
        return (
          <div
            style={{
              ...baseStyle,
              background: '#fff',
              padding: '8px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '4px',
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              style={{
                width: item.size.width,
                height: item.size.height,
                display: 'block',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
          </div>
        );

      case 'tech-badge':
        return (
          <div
            style={{
              ...baseStyle,
              background: '#fff',
              padding: '16px 20px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #E5E5E5',
            }}
          >
            <i className={item.icon} style={{ fontSize: '28px' }}></i>
            <span style={{
              fontWeight: 500,
              fontSize: '14px',
              color: '#37352F',
              fontFamily: 'Inter, sans-serif',
            }}>
              {item.label}
            </span>
          </div>
        );

      case 'achievement':
        return (
          <div
            style={{
              ...baseStyle,
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              padding: '16px 24px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1a1a1a',
              fontFamily: 'Inter, sans-serif',
            }}>
              {item.title}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#333',
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
            }}>
              {item.subtitle}
            </div>
          </div>
        );

      case 'sticky-note':
        return (
          <div
            style={{
              ...baseStyle,
              background: item.color,
              padding: '16px 20px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '2px',
              minWidth: '120px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div style={{
              fontSize: '13px',
              color: '#37352F',
              whiteSpace: 'pre-line',
              lineHeight: 1.4,
              fontWeight: 500,
            }}>
              {item.text}
            </div>
          </div>
        );

      case 'location-tag':
        return (
          <div
            style={{
              ...baseStyle,
              background: '#fff',
              padding: '10px 16px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #E5E5E5',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span style={{ fontSize: '16px' }}>📍</span>
            <span style={{
              fontSize: '14px',
              color: '#37352F',
              fontWeight: 500,
            }}>
              {item.text}
            </span>
          </div>
        );

      case 'university-badge':
        return (
          <div
            style={{
              ...baseStyle,
              background: '#fff',
              padding: '20px 24px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              border: '2px solid #003C6C',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#003C6C',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              🎓 Education
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#003C6C',
              marginBottom: '4px',
            }}>
              {item.university}
            </div>
            <div style={{
              fontSize: '13px',
              color: '#666',
            }}>
              {item.degree}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={item.initialPosition}
      onStart={handleStart}
      onStop={handleStop}
      bounds="parent"
    >
      <div ref={nodeRef} style={{ position: 'absolute' }}>
        {renderContent()}
      </div>
    </Draggable>
  );
};

const DraggableCollage = ({ name, jobTitle }) => {
  const [containerHeight, setContainerHeight] = useState(500);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        setContainerHeight(600);
      } else {
        setContainerHeight(500);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="collage-hero">
      <div className="collage-header">
        <h1 className="collage-name">{name}</h1>
        <p className="collage-title">{jobTitle}</p>
      </div>

      <div
        ref={containerRef}
        className="collage-container"
        style={{
          position: 'relative',
          height: containerHeight,
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {collageItems.map((item) => (
          <CollageItem key={item.id} item={item} />
        ))}

        <div className="collage-hint">
          Drag items to rearrange
        </div>
      </div>
    </div>
  );
};

export default DraggableCollage;
