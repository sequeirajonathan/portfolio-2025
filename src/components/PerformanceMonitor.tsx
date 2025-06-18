import { useEffect, useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  loadTime: number;
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export const PerformanceMonitor: React.FC = memo(() => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    loadTime: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (import.meta.env.DEV) {
      setIsVisible(true);
    }

    // Measure initial load time
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime }));

    // FPS monitoring
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

    // Memory usage (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = (performance as PerformanceWithMemory).memory;
        if (memory) {
          setMetrics(prev => ({
            ...prev,
            memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          }));
        }
      };

      const memoryInterval = setInterval(updateMemory, 1000);
      return () => clearInterval(memoryInterval);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 border border-gray-600">
      <div className="flex items-center gap-2 mb-2">
        <ChevronDown className="h-4 w-4 text-green-400" />
        <span className="text-green-400 font-semibold">Nerd Stats</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>FPS:</span>
          <span className={metrics.fps >= 50 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
            {metrics.fps}
          </span>
        </div>
        {metrics.memoryUsage && (
          <div className="flex justify-between gap-4">
            <span>Memory:</span>
            <span className="text-blue-400">{metrics.memoryUsage}MB</span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span>Load:</span>
          <span className="text-purple-400">{Math.round(metrics.loadTime)}ms</span>
        </div>
      </div>
    </div>
  );
}); 