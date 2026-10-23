import { useEffect, useState } from 'react';

export function BackgroundAtmosphere() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Only track if device supports fine hover (desktop/mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#060608]" />

      {/* 2. Ambient Colored Nebulae (Warm Amber, Deep Indigo, Subtle Teal) */}
      {/* Top-Right Warm Amber Bloom */}
      <div className="absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full bg-amber-500/10 blur-[140px]" />
      
      {/* Mid-Left Midnight Sapphire/Indigo Bloom */}
      <div className="absolute top-[35%] -left-40 h-[650px] w-[650px] rounded-full bg-indigo-600/[0.06] blur-[160px]" />

      {/* Center-Right Faint Gold Highlight */}
      <div className="absolute top-[65%] -right-24 h-[500px] w-[500px] rounded-full bg-amber-600/[0.07] blur-[150px]" />

      {/* Bottom Subtle Violet/Slate Bloom */}
      <div className="absolute -bottom-32 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/[0.04] blur-[160px]" />

      {/* 3. Tech Dot Grid with radial mask */}
      <div
        className="absolute inset-0 bg-dots-pattern opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, black 20%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, black 20%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
        }}
      />

      {/* 4. Fine Grid Lines Accent for Hero */}
      <div
        className="absolute top-0 left-0 right-0 h-[700px] bg-grid-lines opacity-40"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      />

      {/* 5. Interactive Cursor Spotlight (Gentle ambient glow following mouse) */}
      {mousePosition && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.05), rgba(99, 102, 241, 0.02) 40%, transparent 75%)`,
          }}
        />
      )}

      {/* 6. Subtle Tactile Noise Grain Texture */}
      <div className="absolute inset-0 noise-texture opacity-40" />
    </div>
  );
}
