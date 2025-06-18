import { useEffect, useState, useMemo, useCallback } from "react";

// id, size, x, y, opacity, animationDuration
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Memoize star generation to prevent recalculation on every render
  const stars = useMemo(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return [];
    
    // Significantly increase number of stars for better visibility
    const numberOfStars = Math.min(
      Math.floor((windowSize.width * windowSize.height) / 15000), // Much smaller divisor for many more stars
      60 // Increased from 25 to 60 stars max
    );

    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2.5 + 1, // Increased size range from 0.5-2 to 1-3.5
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.4, // Increased opacity range from 0.2-0.4 to 0.4-0.8
        animationDuration: Math.random() * 2 + 2,
        animationDelay: Math.random() * 3, // Random delay for varied twinkling
      });
    }
    return newStars;
  }, [windowSize.width, windowSize.height]);

  // Memoize meteor generation - increased number
  const meteors = useMemo(() => {
    const numberOfMeteors = 3; // Increased from 1 to 3 meteors
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 1.2 + 0.8, // Slightly larger meteors
        x: Math.random() * 100,
        y: Math.random() * 40, // Increased vertical range
        delay: -Math.random() * 4, // Increased delay range for better distribution
        animationDuration: Math.random() * 1.5 + 1.5, // Slightly longer duration
      });
    }
    return newMeteors;
  }, []);

  // Throttled resize handler
  const handleResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200);
    };
  }, []);

  useEffect(() => {
    // Set initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const throttledResize = handleResize();
    window.addEventListener("resize", throttledResize);

    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, [handleResize]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`,
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 0 6px 1px rgba(255, 255, 255, 0.3)",
            position: "absolute",
            willChange: "opacity, transform, filter",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 20 + "px",
            height: meteor.size * 1 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
            transform: "rotate(215deg) translateX(0)",
            position: "absolute",
            overflow: "visible",
          }}
        >
          {/* Fire head - enhanced for better visibility */}
          <div
            className="meteor-head"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: meteor.size * 3 + "px",
              height: meteor.size * 3 + "px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffd700 0%, #ff8800 60%, transparent 100%)",
              boxShadow: "0 0 6px 3px #ff8800, 0 0 12px 6px #ffd700",
              opacity: 0.7, // Slightly increased opacity for better visibility
              filter: "blur(0.3px)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
        </div>
      ))}
    </div>
  );
};