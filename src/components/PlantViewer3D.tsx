import { useEffect, useRef } from 'react';

interface PlantViewer3DProps {
  modelUrl: string;
}

const PlantViewer3D = () => {
  return (
    <div className="w-full h-screen">
      <div className="relative w-full h-3/5">
        <iframe
          title="Tulsi (Osmium, Holy Basil) Tree - Game Ready"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/c604e8f52c234f2e9259d895fe028819/embed"
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default PlantViewer3D;
