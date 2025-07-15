import { useEffect, useState, memo, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// BlackHoleButton component
const BlackHoleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const centerx = w / 2;
    const centery = h / 2;
    const maxorbit = w / 2 - 8;
    const starCount = 200;
    const stars: {
      orbital: number;
      speed: number;
      rotation: number;
      startRotation: number;
      color: string;
      prevR: number;
      prevX: number;
      prevY: number;
    }[] = [];
    for (let i = 0; i < starCount; i++) {
      const rands = [Math.random() * (maxorbit / 2) + 1, Math.random() * (maxorbit / 2) + maxorbit];
      const orbital = rands.reduce((p, c) => p + c, 0) / rands.length;
      const speed = (Math.random() * 2.5 + 1.5) * Math.PI / 180;
      const startRotation = (Math.random() * 360) * Math.PI / 180;
      const color = `rgba(255,255,255,${1 - orbital / w})`;
      stars.push({
        orbital,
        speed,
        rotation: 0,
        startRotation,
        color,
        prevR: startRotation,
        prevX: centerx,
        prevY: centery + orbital,
      });
    }
    let startTime = Date.now();
    let animationId: number;
    function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
      const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
    }
    function draw() {
      if (!ctx) return;
      const now = Date.now();
      const currentTime = (now - startTime) / 50;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(25,25,25,0.2)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.rotation = star.startRotation + (currentTime * star.speed);
        const x = centerx;
        const y = centery + star.orbital;
        ctx.save();
        ctx.strokeStyle = star.color;
        ctx.beginPath();
        const [oldX, oldY] = rotate(centerx, centery, star.prevX, star.prevY, -star.prevR);
        ctx.moveTo(oldX, oldY);
        ctx.translate(centerx, centery);
        ctx.rotate(star.rotation);
        ctx.translate(-centerx, -centery);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();
        star.prevR = star.rotation;
        star.prevX = x;
        star.prevY = y;
      }
      // Draw black hole core
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.beginPath();
      ctx.arc(centerx, centery, 9, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.shadowColor = '#a78bfa';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
      // Draw accretion disk
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerx, centery, 16, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(167,139,250,0.5)';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex flex-col items-center cursor-pointer absolute inset-0 justify-center"
      onClick={onClick}
      title="Curious? Click the black hole!"
      style={{ zIndex: 2 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        className="mb-2"
      >
        <ChevronDown className="h-7 w-7 text-purple-400 drop-shadow-lg animate-pulse" />
      </motion.div>
      <canvas ref={canvasRef} width={72} height={72} style={{ borderRadius: '50%', background: 'rgba(25,25,25,0.8)', boxShadow: '0 0 16px 4px #a78bfa', display: 'block' }} />
    </motion.div>
  );
};

export const footerObserverId = 'footer-observer-anchor';

export const PerformanceMonitor: React.FC = memo(() => {
  const [metrics, setMetrics] = useState<{ fps: number; loadTime: number; memoryUsage?: number }>({ fps: 0, loadTime: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [screenSize, setScreenSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    // Find the footer element by tag or class
    const footer = document.querySelector('footer');
    footerRef.current = footer as HTMLElement;
    function checkFooter() {
      if (!footerRef.current) return setIsAboveFooter(false);
      const rect = footerRef.current.getBoundingClientRect();
      // If the footer is visible in the viewport, position black hole above it
      setIsAboveFooter(rect.top < window.innerHeight);
    }
    window.addEventListener('scroll', checkFooter);
    window.addEventListener('resize', checkFooter);
    checkFooter();
    return () => {
      window.removeEventListener('scroll', checkFooter);
      window.removeEventListener('resize', checkFooter);
    };
  }, []);

  // Hide the component when nearing the footer
  const [isNearFooter, setIsNearFooter] = useState(false);
  
  useEffect(() => {
    function checkNearFooter() {
      if (!footerRef.current) return setIsNearFooter(false);
      const rect = footerRef.current.getBoundingClientRect();
      // Hide when footer is within 200px of viewport bottom
      setIsNearFooter(rect.top < window.innerHeight + 200);
    }
    window.addEventListener('scroll', checkNearFooter);
    window.addEventListener('resize', checkNearFooter);
    checkNearFooter();
    return () => {
      window.removeEventListener('scroll', checkNearFooter);
      window.removeEventListener('resize', checkNearFooter);
    };
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      setIsVisible(true);
    }
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime }));
    let frameCount = 0;
    let lastTime = performance.now();
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(measureFPS);
    };
    requestAnimationFrame(measureFPS);
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        if (memory) {
          setMetrics(prev => ({ ...prev, memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024) }));
        }
      };
      const memoryInterval = setInterval(updateMemory, 1000);
      return () => clearInterval(memoryInterval);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onResize = () => setScreenSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cpuCores = navigator.hardwareConcurrency;
  const networkType = (navigator as any).connection?.effectiveType;

  if (!isVisible || !isDesktop) return null;

  // Always float above footer with high z-index
  const blackHoleStyle = {
    position: 'fixed' as const,
    left: 24,
    bottom: 300, // Fixed position that's always above footer
    width: 160,
    height: 160,
    zIndex: 9999, // Extremely high z-index to ensure it's above everything
  };

  const loadDisplay = metrics.loadTime > 1000 ? `${(metrics.loadTime / 1000).toFixed(2)}s` : `${Math.round(metrics.loadTime)}ms`;
  const uptimeDisplay = uptime > 60 ? `${Math.floor(uptime / 60)}m ${uptime % 60}s` : `${uptime}s`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={blackHoleStyle}
      >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <AnimatePresence initial={false}>
              {!showStats && (
                <BlackHoleButton key="blackhole" onClick={() => setShowStats(true)} />
              )}
              {showStats && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="bg-black/80 text-white p-2 rounded-lg text-[11px] font-mono border border-gray-600 cursor-pointer absolute inset-0 flex flex-col justify-center min-w-[120px] max-w-[180px]"
                  title="Click to hide nerd stats and return to the black hole"
                  onClick={() => setShowStats(false)}
                  style={{ zIndex: 3 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ChevronDown className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-semibold">Nerd Stats</span>
                  </div>
                  <div className="space-y-1 max-h-[110px] overflow-y-auto pr-1">
                    <div className="flex justify-between gap-2">
                      <span>FPS:</span>
                      <span className={metrics.fps >= 50 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>{metrics.fps}</span>
                    </div>
                    {metrics.memoryUsage && (
                      <div className="flex justify-between gap-2">
                        <span>Memory:</span>
                        <span className="text-blue-400 break-all">{metrics.memoryUsage}MB</span>
                      </div>
                    )}
                    <div className="flex justify-between gap-2">
                      <span>Load:</span>
                      <span className="text-purple-400 break-all">{loadDisplay}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Uptime:</span>
                      <span className="text-orange-300 break-all">{uptimeDisplay}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Screen:</span>
                      <span className="text-cyan-300">{screenSize.w}x{screenSize.h}</span>
                    </div>
                    {cpuCores && (
                      <div className="flex justify-between gap-2">
                        <span>CPU Cores:</span>
                        <span className="text-lime-300">{cpuCores}</span>
                      </div>
                    )}
                    {networkType && (
                      <div className="flex justify-between gap-2">
                        <span>Network:</span>
                        <span className="text-fuchsia-300 break-all">{networkType}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}); 