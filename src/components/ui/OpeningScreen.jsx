import React, { useState, useEffect, useRef, useCallback } from 'react';

export const OpeningScreen = ({ onComplete }) => {
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [contentScale, setContentScale] = useState(1);
  const isUnlockedRef = useRef(false);
  const unlockTimestamp = useRef(0);
  const touchStartY = useRef(null);
  const rafId = useRef(null);
  const isAnimating = useRef(false);

  // Responsive scale calculation: guarantees 0 clipping on all mobile viewports (portrait iPhones, Androids, tablets)
  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // In SVG with viewBox="0 0 1000 800" and preserveAspectRatio="xMidYMid slice",
      // the visible width in viewBox units is 800 * (w / h).
      const visibleVbWidth = 800 * (w / h);

      // Total natural span of the logos and wordmark is from x=250 to x=750 (500 units wide).
      // We want this 500-unit span to fit comfortably inside visibleVbWidth with safe horizontal margins.
      const targetAvailableWidth = visibleVbWidth * 0.82;
      const scale = targetAvailableWidth / 500;

      // On desktop / wide screens, scale is clamped to 1.0 (exact original master size).
      // On narrow mobile portrait screens (e.g. 390x844), scale gracefully adjusts (~0.61) so nothing gets clipped!
      setContentScale(Math.min(1.0, Math.max(0.48, scale)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, []);

  // Preload and verify critical logo images so they render simultaneously with zero pop-in
  useEffect(() => {
    const images = [
      '/images/box-i-master.png',
      '/images/box-d-master.png',
      '/images/box-c-master.png',
      '/images/idc-text-transparent.png'
    ];
    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        loadedCount++;
        if (loadedCount === images.length) setImagesReady(true);
      } else {
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) setImagesReady(true);
        };
      }
    });

    // Fallback safety: ensure screen becomes visible even on slow network
    const timer = setTimeout(() => setImagesReady(true), 350);
    return () => clearTimeout(timer);
  }, []);

  const completeAndUnlock = useCallback(() => {
    if (isUnlockedRef.current) return;
    isUnlockedRef.current = true;
    unlockTimestamp.current = Date.now();
    setIsFadingOut(true);

    // Keep viewport rock-solid at top without scroll jumping
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Allow graceful fadeout to complete before unmounting, preventing layout flicker or shaking
    setTimeout(() => {
      setIsUnlocked(true);
      if (onComplete) onComplete();
    }, 220);
  }, [onComplete]);

  // Smooth LERP Bidirectional Physics Loop - ONLY runs when animating, 0% CPU when idle!
  const updatePhysics = useCallback(() => {
    if (isUnlockedRef.current) {
      isAnimating.current = false;
      return;
    }

    const diff = targetProgress.current - currentProgress.current;

    // Check if at rest
    if (Math.abs(diff) < 0.0001) {
      currentProgress.current = targetProgress.current;
      setProgress(targetProgress.current);
      isAnimating.current = false;

      if (targetProgress.current >= 0.72) {
        completeAndUnlock();
      }
      return; // Stop RAF loop when at rest!
    }

    // Faster, highly responsive damping (0.135 instead of 0.085)
    currentProgress.current += diff * 0.135;
    const p = Math.min(1, Math.max(0, currentProgress.current));
    setProgress(p);

    if (p >= 0.72 && targetProgress.current >= 0.72) {
      completeAndUnlock();
      isAnimating.current = false;
      return;
    }

    rafId.current = requestAnimationFrame(updatePhysics);
  }, [completeAndUnlock]);

  const wakeAnimation = useCallback(() => {
    if (isUnlockedRef.current || isAnimating.current) return;
    isAnimating.current = true;
    rafId.current = requestAnimationFrame(updatePhysics);
  }, [updatePhysics]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const touchStartTime = useRef(0);
  const touchTotalDelta = useRef(0);

  // Wheel listener: bidirectional continuous control
  // Scroll down zooms in slowly, scroll up smoothly zooms out
  useEffect(() => {
    const handleWheel = (e) => {
      if (isUnlockedRef.current) {
        if (Date.now() - unlockTimestamp.current < 500) {
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();

      const sensitivity = 0.0016;
      targetProgress.current = Math.min(1, Math.max(0, targetProgress.current + e.deltaY * sensitivity));
      wakeAnimation();
    };

    // Touch gesture listener - fast, fluid mobile scroll with momentum flick
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      touchTotalDelta.current = 0;
    };

    const handleTouchMove = (e) => {
      if (isUnlockedRef.current) {
        if (Date.now() - unlockTimestamp.current < 500) {
          e.preventDefault();
        }
        return;
      }
      if (touchStartY.current === null) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;
      touchTotalDelta.current += delta;
      touchStartY.current = currentY;

      // Fast, responsive mobile sensitivity (2.3x faster than before)
      const sensitivity = 0.0075;
      targetProgress.current = Math.min(1, Math.max(0, targetProgress.current + delta * sensitivity));
      wakeAnimation();
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
      const duration = Math.max(1, Date.now() - touchStartTime.current);
      const velocity = touchTotalDelta.current / duration; // px per millisecond

      // Natural smartphone flick momentum:
      // If user performed a quick upward flick or is already 30% through, glide seamlessly to 100%!
      if (velocity > 0.35 || targetProgress.current > 0.30) {
        targetProgress.current = 1;
        wakeAnimation();
      } else if (velocity < -0.35) {
        targetProgress.current = 0;
        wakeAnimation();
      }
    };

    // Keyboard listener (ArrowDown zooms in, ArrowUp zooms out)
    const handleKeyDown = (e) => {
      if (isUnlockedRef.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        targetProgress.current = Math.min(1, targetProgress.current + 0.14);
        wakeAnimation();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        targetProgress.current = Math.max(0, targetProgress.current - 0.14);
        wakeAnimation();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [wakeAnimation]);

  const triggerAutoFlyThrough = () => {
    targetProgress.current = 1;
    wakeAnimation();
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    completeAndUnlock();
  };

  if (isUnlocked) return null;

  // Silky smooth zoom: gracefully zooms from 1.0 up to ~3.2x
  const cameraZoom = 1 + Math.pow(progress, 1.35) * 2.2;
  const zoomFocusY = 280;

  // Gentle, elegant parallax separation
  const pillSeparation = Math.pow(progress, 1.2) * 65;
  const outerBoxOpacity = Math.max(0, 1 - Math.pow(progress, 1.2) * 1.5);

  // Smooth, graceful dissolve into the homepage
  const box2ArtworkOpacity = Math.max(0, 1 - Math.pow(progress, 1.4) * 1.35);
  const maskOpacity = Math.max(0, 1 - Math.pow(progress, 1.3) * 1.4);
  const brandOpacity = Math.max(0, 1 - progress * 2.5);

  // Smooth zoom out for the brand text
  const brandZoomScale = Math.max(0.65, 1 - progress * 0.38);

  // Dynamic vertical center for typography to maintain proportional gap on mobile screens
  const textCenterY = 280 + 193 * contentScale;

  const containerOpacity = !imagesReady ? 0 : (isFadingOut ? 0 : maskOpacity);

  return (
    <div
      onClick={triggerAutoFlyThrough}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: (progress > 0.80 || isFadingOut) ? 'none' : 'auto',
        userSelect: 'none',
        opacity: containerOpacity,
        transition: !imagesReady ? 'opacity 0.18s ease-in' : (isFadingOut ? 'opacity 0.22s ease-out' : 'none'),
        willChange: 'opacity'
      }}
    >
      {/* Top Bar with Skip Prompt - safe-area aware for mobile notches */}
      <div
        style={{
          position: 'absolute',
          top: 'max(16px, env(safe-area-inset-top, 16px))',
          right: 'max(16px, env(safe-area-inset-right, 16px))',
          zIndex: 40,
          opacity: brandOpacity
        }}
      >
        <button
          onClick={handleSkip}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            color: '#E5E7EB',
            padding: '7px 18px',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease',
            touchAction: 'manipulation'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = '#E5E7EB';
          }}
        >
          Skip Intro
        </button>
      </div>

      {/* 3D Portal Canvas - Locked directly to the middle of letter "D" */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        >
          <defs>
            {/* Cutout Mask for the 3 logo boxes: precisely scales with contentScale to stay 100% synchronized with the boxes on both mobile and desktop */}
            <mask id="boxPortalMask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
              <rect x="-10000" y="-10000" width="20000" height="20000" fill="white" />
              <g transform={`translate(500, ${zoomFocusY}) scale(${cameraZoom * contentScale}) translate(-500, -280)`}>
                {/* Window cutout for Box 1 (Letter I) */}
                <rect
                  x={260 - pillSeparation + 7}
                  y={212 + 7}
                  width="122"
                  height="122"
                  rx="2"
                  fill="black"
                />

                {/* Window cutout for Box 2 (Letter D) */}
                <rect
                  x={432 + 7}
                  y={212 + 7}
                  width="122"
                  height="122"
                  rx="2"
                  fill="black"
                />

                {/* Window cutout for Box 3 (Letter C) */}
                <rect
                  x={604 + pillSeparation + 7}
                  y={212 + 7}
                  width="122"
                  height="122"
                  rx="2"
                  fill="black"
                />
              </g>
            </mask>
          </defs>

          {/* Solid Luxury Dark Charcoal Canvas with transparent windows inside the 3 logo boxes */}
          <rect
            x="-10000"
            y="-10000"
            width="20000"
            height="20000"
            fill="#121316"
            mask="url(#boxPortalMask)"
          />

          {/* Authentic Full-Resolution IDC Letter Logos centered directly on letter "D" (500, 280) */}
          {/* Responsive contentScale prevents mobile clipping while maintaining GPU-accelerated rendering */}
          <g transform={`translate(500, ${zoomFocusY}) scale(${cameraZoom * contentScale}) translate(-500, -280)`}>
            {/* === BOX 1 (LETTER I + PENDANT LAMPS) === */}
            <g
              opacity={outerBoxOpacity}
              style={{
                filter: 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.75))',
                willChange: 'opacity'
              }}
            >
              <image
                href="/images/box-i-master.png"
                x={260 - pillSeparation}
                y="212"
                width="136"
                height="136"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            {/* === BOX 2 (LETTER D + ARCH LAMP + ARMCHAIR) - Central Zoom Portal === */}
            <g
              opacity={box2ArtworkOpacity}
              style={{
                filter: 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.75))',
                willChange: 'opacity'
              }}
            >
              <image
                href="/images/box-d-master.png"
                x="432"
                y="212"
                width="136"
                height="136"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            {/* === BOX 3 (LETTER C + ARCHITECT'S COMPASS) === */}
            <g
              opacity={outerBoxOpacity}
              style={{
                filter: 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.75))',
                willChange: 'opacity'
              }}
            >
              <image
                href="/images/box-c-master.png"
                x={604 + pillSeparation}
                y="212"
                width="136"
                height="136"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          </g>

          {/* BRAND TYPOGRAPHY: Real Official IDC Wordmark from Vector Master - Perfectly scaled on mobile with zero clipping */}
          <g
            opacity={brandOpacity}
            transform={`translate(500, ${textCenterY}) scale(${brandZoomScale * contentScale}) translate(-500, -480)`}
          >
            <image
              href="/images/idc-text-transparent.png"
              x="250"
              y="385"
              width="500"
              height="87"
              preserveAspectRatio="xMidYMid meet"
            />

            {/* Architectural Subtitle */}
            <text
              x="500"
              y="498"
              textAnchor="middle"
              fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
              fontSize="10"
              fontWeight="600"
              letterSpacing="3.5"
              fill="#C5A880"
            >
              ARCHITECTURAL INTERIORS &amp; BESPOKE FURNITURE
            </text>

            {/* Subtle URL */}
            <text
              x="500"
              y="520"
              textAnchor="middle"
              fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="500"
              letterSpacing="1.5"
              fill="#8C9098"
            >
              indiandecorcompany.in
            </text>

            {/* Scroll Down Prompt */}
            <text
              x="500"
              y="580"
              textAnchor="middle"
              fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="600"
              letterSpacing="2.5"
              fill="#E5E7EB"
            >
              SCROLL DOWN TO ENTER ↓
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
