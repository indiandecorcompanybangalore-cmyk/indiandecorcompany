import React, { useState, useRef, useCallback } from 'react';

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 5) position = 5;
    if (position > 95) position = 95;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        overflow: 'hidden',
        borderRadius: '12px',
        userSelect: 'none',
        cursor: 'ew-resize',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow-luxury)'
      }}
    >
      {/* "After" Image (Underneath, Full Width) */}
      <img
        src={afterImage}
        alt="Transformed Luxury Space by IDC"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(15, 16, 19, 0.75)',
          backdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: '9999px',
          letterSpacing: '0.05em',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          zIndex: 2
        }}
      >
        {afterLabel}
      </div>

      {/* "Before" Image (Clipped overlay) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${sliderPosition}%`,
          height: '100%',
          overflow: 'hidden',
          zIndex: 3
        }}
      >
        <img
          src={beforeImage}
          alt="Raw space before IDC transformation"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '1000px',
            height: '100%',
            objectFit: 'cover',
            maxWidth: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'rgba(15, 16, 19, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: '9999px',
            letterSpacing: '0.05em',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          {beforeLabel}
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          backgroundColor: '#FFFFFF',
          zIndex: 4,
          transform: 'translateX(-50%)'
        }}
      >
        {/* Circular Handle matching Mockup */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#121316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            cursor: 'grab'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
