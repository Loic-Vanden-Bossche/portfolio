import { type CSSProperties } from "react";

const particles = Array.from({ length: 18 }, (_, index) => ({
  delay: `${(index % 6) * -1.7}s`,
  driftX: `${index % 2 === 0 ? 22 + index : -18 - index}px`,
  driftY: `${index % 3 === 0 ? -28 - index : 20 + index}px`,
  duration: `${10 + (index % 5) * 2.4}s`,
  left: `${6 + ((index * 29) % 88)}%`,
  size: `${2 + (index % 4)}px`,
  top: `${5 + ((index * 43) % 88)}%`,
}));

export function PhotoAtmosphere() {
  return (
    <div className="photo-atmosphere" aria-hidden="true">
      <div className="photo-atmosphere-viewport">
        <span className="photo-atmosphere-glow photo-atmosphere-glow-primary" />
        <span className="photo-atmosphere-glow photo-atmosphere-glow-secondary" />

        <div className="photo-atmosphere-particles">
          {particles.map((particle, index) => (
            <span
              className="photo-atmosphere-particle"
              key={index}
              style={
                {
                  "--particle-delay": particle.delay,
                  "--particle-drift-x": particle.driftX,
                  "--particle-drift-y": particle.driftY,
                  "--particle-duration": particle.duration,
                  "--particle-left": particle.left,
                  "--particle-size": particle.size,
                  "--particle-top": particle.top,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <svg
          className="photo-atmosphere-wire"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <path
            className="photo-atmosphere-wire-base"
            d="M -80 760 C 150 570 250 920 470 650 S 720 270 1080 410"
            pathLength="1"
          />
          <path
            className="photo-atmosphere-wire-energy"
            d="M -80 760 C 150 570 250 920 470 650 S 720 270 1080 410"
            pathLength="1"
          />
        </svg>
      </div>
    </div>
  );
}
