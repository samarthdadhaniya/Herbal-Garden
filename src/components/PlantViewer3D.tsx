
import { useEffect, useRef } from 'react';

// This is a placeholder component for the 3D viewer
// In the final implementation, this would use React Three Fiber
// But for the first version, we'll show a placeholder

interface PlantViewer3DProps {
  modelUrl: string;
}

const PlantViewer3D = ({ modelUrl }: PlantViewer3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // This would be replaced with actual Three.js/React Three Fiber code
    const container = containerRef.current;
    
    // Add placeholder content
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground mb-4">
          <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
          <path d="M8 8v1c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V8"></path>
          <path d="M12 16h1"></path>
          <path d="M11 13h2"></path>
          <rect x="6" y="4" width="12" height="10" rx="2"></rect>
          <path d="M3 12a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1"></path>
          <path d="M3 14h18"></path>
        </svg>
        <p class="text-muted-foreground mb-2">3D Viewer Coming Soon</p>
        <p class="text-xs text-center text-muted-foreground max-w-md">
          The interactive 3D plant viewer will be implemented in the next version using React Three Fiber.
        </p>
      </div>
    `;
    
    return () => {
      // Cleanup function
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [modelUrl]);

  return <div ref={containerRef} className="w-full h-full min-h-[400px]"></div>;
};

export default PlantViewer3D;
