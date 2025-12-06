import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

const collageItems = [
  {
    id: 'monash-badge',
    type: 'university-badge',
    university: 'Monash University',
    degree: 'B.S. Computer Science',
    logo: '/images/collage/monash-logo.svg',
    link: 'https://www.monash.edu/study/courses/find-a-course/computer-science-c2001',
    initialPosition: { x: 190, y: 80 },
    rotation: -3,
    zIndex: 10,
  },
  {
    id: 'profile',
    type: 'image',
    src: '/images/profile/big/profile1.png',
    alt: 'Rian Kawahara',
    initialPosition: { x: 660, y: 60 },
    size: { width: 200, height: 'auto' },
    rotation: 2,
    zIndex: 15,
  },
  {
    id: 'hackathon-badge',
    type: 'achievement',
    image: '/images/collage/hackathon-badge.png',
    title: 'Tokyo Open Data Hackathon',
    subtitle: 'Business Award 2024',
    link: 'https://www.openbadge-global.com/ns/portal/openbadge/public/assertions/detail/MTd5VzlKSHE1ZkxrQ0lNY0xpTjdsQT09',
    initialPosition: { x: 1040, y: 420 },
    rotation: 4,
    zIndex: 14,
  },
  {
    id: 'article-card',
    type: 'article-card',
    image: '/images/collage/diamondhead-article.webp',
    logo: '/images/collage/diamondhead-logo.jpeg',
    title: 'Featured in Diamondhead',
    subtitle: 'Intern Article',
    link: 'https://note.com/diamondhead/n/n4a1f53c731f4',
    initialPosition: { x: 190, y: 380 },
    rotation: -4,
    zIndex: 9,
  },
  {
    id: 'littlehelp-badge',
    type: 'company-badge',
    logo: '/images/collage/littlehelp-logo.jpeg',
    company: 'Little Help Agency',
    role: 'Software Engineer',
    link: 'https://www.littlehelp.co.jp/',
    initialPosition: { x: 1080, y: 140 },
    rotation: 3,
    zIndex: 11,
  },
  {
    id: 'location',
    type: 'location-tag',
    text: 'Tokyo, Japan',
    initialPosition: { x: 700, y: 460 },
    rotation: 0,
    zIndex: 10,
  },
];

const CollageItem = ({ item, onDragStart, onDragStop }) => {
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [zIndex, setZIndex] = useState(item.zIndex);

  const handleStart = () => {
    setIsDragging(true);
    setHasDragged(false);
    setZIndex(100);
    onDragStart?.(item.id);
  };

  const handleDrag = () => {
    setHasDragged(true);
  };

  const handleStop = () => {
    setIsDragging(false);
    setZIndex(item.zIndex);
    onDragStop?.(item.id);
  };

  const handleClick = () => {
    if (!hasDragged && item.link) {
      window.open(item.link, '_blank');
    }
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
              background: '#fff',
              padding: '16px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              width: '200px',
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '14px',
                  pointerEvents: 'none',
                }}
                draggable={false}
              />
            )}
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#37352F',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '4px',
            }}>
              {item.title}
            </div>
            <div style={{
              fontSize: '13px',
              color: '#787774',
              fontFamily: 'Inter, sans-serif',
            }}>
              {item.subtitle} →
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
              padding: '16px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              width: '280px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {item.logo && (
              <div style={{
                background: '#003C6C',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <img
                  src={item.logo}
                  alt={item.university}
                  style={{
                    height: '50px',
                    pointerEvents: 'none',
                    filter: 'brightness(0) invert(1)',
                  }}
                  draggable={false}
                />
              </div>
            )}
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#37352F',
              marginBottom: '6px',
            }}>
              {item.degree}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#787774',
            }}>
              {item.university} →
            </div>
          </div>
        );

      case 'article-card':
        return (
          <div
            style={{
              ...baseStyle,
              background: '#fff',
              padding: '16px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              width: '320px',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '14px',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              {item.logo && (
                <img
                  src={item.logo}
                  alt=""
                  style={{
                    width: '28px',
                    height: '28px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                  }}
                  draggable={false}
                />
              )}
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#37352F',
                fontFamily: 'Inter, sans-serif',
              }}>
                {item.title}
              </div>
            </div>
            <div style={{
              fontSize: '14px',
              color: '#787774',
              fontFamily: 'Inter, sans-serif',
            }}>
              {item.subtitle} →
            </div>
          </div>
        );

      case 'company-badge':
        return (
          <div
            style={{
              ...baseStyle,
              background: '#fff',
              padding: '14px 24px',
              boxShadow: isDragging
                ? '0 20px 40px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              border: '1px solid #E5E5E5',
              minWidth: '260px',
            }}
          >
            <img
              src={item.logo}
              alt={item.company}
              style={{
                width: '44px',
                height: '44px',
                objectFit: 'contain',
                borderRadius: '8px',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#37352F',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '2px',
              }}>
                {item.company}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#787774',
                fontFamily: 'Inter, sans-serif',
              }}>
                {item.role} →
              </div>
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
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent"
    >
      <div ref={nodeRef} style={{ position: 'absolute' }} onClick={handleClick}>
        {renderContent()}
      </div>
    </Draggable>
  );
};

const DraggableCollage = ({ name, jobTitle }) => {
  const containerRef = useRef(null);

  return (
    <div className="collage-hero">
      <div
        ref={containerRef}
        className="collage-container"
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Centered name/title */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <h1 className="collage-name">{name}</h1>
          <p className="collage-title">{jobTitle}</p>
        </div>

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
