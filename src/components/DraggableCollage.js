import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

// Reference dimensions the original layout was designed for
const REFERENCE_WIDTH = 1400;
const REFERENCE_HEIGHT = 700;
const MOBILE_BREAKPOINT = 768;

// Positions as percentages of reference dimensions
const collageItems = [
  {
    id: 'monash-badge',
    type: 'university-badge',
    university: 'Monash University',
    degree: 'B.S. Computer Science',
    logo: '/images/collage/monash-logo.svg',
    link: 'https://www.monash.edu/study/courses/find-a-course/computer-science-c2001',
    // x: 180/1400 = 0.129, y shifted up
    positionPercent: { x: 0.129, y: 0.09 },
    rotation: -3,
    zIndex: 10,
  },
  {
    id: 'profile',
    type: 'image',
    src: '/images/profile/big/profile1.png',
    alt: 'Rian Kawahara',
    // centered horizontally with slight offset to right, shifted up
    positionPercent: { x: 0.5, y: 0.06 },
    centerX: true,
    centerOffset: 15,
    elementWidth: 216,
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
    // x: 950/1400 = 0.679
    positionPercent: { x: 0.679, y: 0.614 },
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
    // x: 180/1400 = 0.129, y: 390/700 = 0.557 (shifted up 20px more)
    positionPercent: { x: 0.129, y: 0.557 },
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
    // x: 990/1400 = 0.707, y shifted up
    positionPercent: { x: 0.707, y: 0.17 },
    rotation: 3,
    zIndex: 11,
  },
  {
    id: 'location',
    type: 'location-tag',
    text: 'Tokyo, Japan',
    // centered horizontally, moved up
    positionPercent: { x: 0.5, y: 0.6 },
    centerX: true,
    elementWidth: 130,
    rotation: 0,
    zIndex: 10,
  },
];

const CollageItem = ({ item, calculatedPosition, scale = 1, onDragStart, onDragStop }) => {
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
    transform: `rotate(${item.rotation}deg) scale(${scale})`,
    transformOrigin: 'top left',
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
      defaultPosition={calculatedPosition}
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

// Mobile Carousel Component
const MobileCarousel = ({ items, name, jobTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCardClick = (item) => {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  const renderCard = (item, index) => {
    const offset = index - currentIndex;
    const isActive = offset === 0;

    return (
      <div
        key={item.id}
        onClick={() => isActive && handleCardClick(item)}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translateX(${offset * 85}%) scale(${isActive ? 1 : 0.85}) rotate(${item.rotation * 0.5}deg)`,
          opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.3,
          transition: 'all 0.3s ease-out',
          zIndex: 10 - Math.abs(offset),
          cursor: isActive && item.link ? 'pointer' : 'default',
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '14px 14px 44px 14px',
            borderRadius: '4px',
            boxShadow: isActive
              ? '0 10px 40px rgba(0,0,0,0.2)'
              : '0 4px 20px rgba(0,0,0,0.1)',
            width: '300px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {renderCardContent(item)}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            fontSize: '11px',
            color: '#787774',
            textAlign: 'center',
          }}>
            {item.link && '↑ Tap to view'}
          </div>
        </div>
      </div>
    );
  };

  const renderCardContent = (item) => {
    switch (item.type) {
      case 'image':
        return (
          <img
            src={item.src}
            alt={item.alt}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '2px',
            }}
            draggable={false}
          />
        );

      case 'achievement':
        return (
          <div>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '14px',
                  borderRadius: '2px',
                }}
                draggable={false}
              />
            )}
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#37352F', marginBottom: '6px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '14px', color: '#787774' }}>
              {item.subtitle}
            </div>
          </div>
        );

      case 'university-badge':
        return (
          <div>
            {item.logo && (
              <div style={{
                background: '#003C6C',
                padding: '20px',
                borderRadius: '6px',
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <img
                  src={item.logo}
                  alt={item.university}
                  style={{ height: '50px', filter: 'brightness(0) invert(1)' }}
                  draggable={false}
                />
              </div>
            )}
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#37352F', marginBottom: '6px' }}>
              {item.degree}
            </div>
            <div style={{ fontSize: '15px', color: '#787774' }}>
              {item.university}
            </div>
          </div>
        );

      case 'article-card':
        return (
          <div>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginBottom: '12px',
              }}
              draggable={false}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              {item.logo && (
                <img src={item.logo} alt="" style={{ width: '28px', height: '28px', borderRadius: '4px' }} draggable={false} />
              )}
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#37352F' }}>
                {item.title}
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#787774' }}>
              {item.subtitle}
            </div>
          </div>
        );

      case 'company-badge':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0' }}>
            <img
              src={item.logo}
              alt={item.company}
              style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '10px' }}
              draggable={false}
            />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#37352F', marginBottom: '4px' }}>
                {item.company}
              </div>
              <div style={{ fontSize: '14px', color: '#787774' }}>
                {item.role}
              </div>
            </div>
          </div>
        );

      case 'location-tag':
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '20px 0' }}>
            <span style={{ fontSize: '24px' }}>📍</span>
            <span style={{ fontSize: '18px', color: '#37352F', fontWeight: 500 }}>
              {item.text}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  // Filter out location and reorder: profile first, hackathon last
  const carouselItems = items
    .filter(item => item.type !== 'location-tag')
    .sort((a, b) => {
      // Profile (image type) comes first
      if (a.type === 'image') return -1;
      if (b.type === 'image') return 1;
      // Hackathon (achievement type) comes last
      if (a.id === 'hackathon-badge') return 1;
      if (b.id === 'hackathon-badge') return -1;
      return 0;
    });

  return (
    <div className="collage-hero mobile-carousel-hero">
      {/* Name and title at top */}
      <div style={{
        textAlign: 'center',
        paddingTop: '60px',
        paddingBottom: '20px',
        zIndex: 20,
      }}>
        <h1 className="collage-name" style={{ fontSize: '2rem' }}>{name}</h1>
        <p className="collage-title" style={{ fontSize: '1rem' }}>{jobTitle}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
          <span style={{ fontSize: '14px' }}>📍</span>
          <span style={{ fontSize: '13px', color: '#787774' }}>Tokyo, Japan</span>
        </div>
      </div>

      {/* Carousel */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          minHeight: '400px',
          marginTop: '-50px',
        }}
      >
        {carouselItems.map((item, index) => renderCard(item, index))}
      </div>

      {/* Dots indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        paddingBottom: '30px',
      }}>
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: index === currentIndex ? '#37352F' : '#E5E5E5',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <div style={{
        textAlign: 'center',
        paddingBottom: '20px',
        fontSize: '12px',
        color: '#787774',
        opacity: 0.7,
      }}>
        ← Swipe to explore →
      </div>
    </div>
  );
};

const DraggableCollage = ({ name, jobTitle }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: REFERENCE_WIDTH, height: REFERENCE_HEIGHT });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    // Initial size
    updateSize();

    // Update on resize
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate actual pixel positions based on container size
  const calculatePosition = (item) => {
    const { positionPercent, centerX, elementWidth, centerOffset = 0 } = item;

    // Scale x based on container width
    let x = positionPercent.x * containerSize.width;

    // For y: blend between full container height and aspect-ratio-locked height
    // This prevents items from spreading too much on tall screens while keeping them centered
    const aspectLockedHeight = REFERENCE_HEIGHT * (containerSize.width / REFERENCE_WIDTH);
    // Use 70% of the extra height to allow some spread but not full spread
    const effectiveHeight = aspectLockedHeight + (containerSize.height - aspectLockedHeight) * 0.7;
    const yOffset = (containerSize.height - effectiveHeight) / 2;
    let y = yOffset + (positionPercent.y * effectiveHeight);

    // On larger screens (16"+), push top elements down a bit more
    if (containerSize.width > 1400 && positionPercent.y < 0.3) {
      const extraOffset = ((containerSize.width - 1400) / 400) * 40; // up to 40px extra on 1800px+
      y += extraOffset;
    }

    // If centerX is true, center the element by subtracting half its width
    if (centerX && elementWidth) {
      x = (containerSize.width / 2) - (elementWidth / 2) + centerOffset;
    }

    return { x, y };
  };

  // Calculate scale factor based on screen width
  // 14" laptop (~1400-1512px) = 1.0, 16" laptop (~1728px+) = larger
  const getScale = () => {
    const width = containerSize.width;
    if (width <= 1400) return 1;
    if (width >= 1800) return 1.25;
    // Linear interpolation between 1400 and 1800
    return 1 + ((width - 1400) / 400) * 0.25;
  };

  const itemScale = getScale();

  // Render mobile carousel on small screens
  if (isMobile) {
    return <MobileCarousel items={collageItems} name={name} jobTitle={jobTitle} />;
  }

  // Desktop: render draggable collage
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
          <CollageItem
            key={`${item.id}-${Math.round(containerSize.width)}`}
            item={item}
            calculatedPosition={calculatePosition(item)}
            scale={itemScale}
          />
        ))}

      </div>
    </div>
  );
};

export default DraggableCollage;
