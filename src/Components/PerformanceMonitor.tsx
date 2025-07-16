import React, { useEffect, useState, useCallback, useRef } from "react";

interface PerformanceMetrics {
  renderCount: number;
  renderTime: number;
  memoryUsage: number;
  oddsUpdateCount: number;
  lastUpdateTime: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    renderTime: 0,
    memoryUsage: 0,
    oddsUpdateCount: 0,
    lastUpdateTime: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Use refs to track render performance without causing re-renders
  const renderCountRef = useRef(0);
  const renderStartTimeRef = useRef(performance.now());

  // Track render performance without causing infinite loops
  const updateRenderMetrics = useCallback(() => {
    const currentTime = performance.now();
    const renderTime = currentTime - renderStartTimeRef.current;
    renderCountRef.current += 1;

    setMetrics((prev) => ({
      ...prev,
      renderCount: renderCountRef.current,
      renderTime: renderTime,
    }));

    renderStartTimeRef.current = currentTime;
  }, []);

  // Update render metrics only when component becomes visible
  useEffect(() => {
    if (isVisible) {
      updateRenderMetrics();
    }
  }, [isVisible, updateRenderMetrics]);

  // Track memory usage
  useEffect(() => {
    const updateMemoryUsage = () => {
      if ("memory" in performance) {
        const memInfo = (performance as any).memory;
        setMetrics((prev) => ({
          ...prev,
          memoryUsage: memInfo.usedJSHeapSize / 1024 / 1024, // Convert to MB
        }));
      }
    };

    const interval = setInterval(updateMemoryUsage, 4000);
    return () => clearInterval(interval);
  }, []);

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const resetMetrics = useCallback(() => {
    renderCountRef.current = 0;
    renderStartTimeRef.current = performance.now();
    setMetrics({
      renderCount: 0,
      renderTime: 0,
      memoryUsage: 0,
      oddsUpdateCount: 0,
      lastUpdateTime: 0,
    });
  }, []);

  // Only show in development mode
  if (
    !isVisible ||
    (typeof import.meta !== "undefined" && import.meta.env?.PROD)
  ) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold">Performance Monitor</h4>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="space-y-1">
        <div>Renders: {metrics.renderCount}</div>
        <div>Render Time: {metrics.renderTime.toFixed(2)}ms</div>
        <div>Memory: {metrics.memoryUsage.toFixed(2)} MB</div>
        <div>Odds Updates: {metrics.oddsUpdateCount}</div>
        <div>Last Update: {metrics.lastUpdateTime}ms ago</div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-600">
        <button
          onClick={resetMetrics}
          className="text-blue-400 hover:text-blue-300 text-xs"
        >
          Reset Metrics
        </button>
        <div className="text-gray-400 text-xs mt-1">Press Ctrl+P to toggle</div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
