import { assignInlineVars } from "@vanilla-extract/dynamic";

import * as styles from "./photo-atmosphere.css";
import {
  particleDelay,
  particleDriftX,
  particleDriftY,
  particleDuration,
  particleLeft,
  particleSize,
  particleTop,
} from "./photo-style-vars.css";

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
    <div className={styles.root} aria-hidden="true">
      <div className={styles.viewport} data-photo-part="atmosphere">
        <span
          className={`${styles.glow} ${styles.primaryGlow}`}
          data-photo-part="atmosphere-glow"
        />
        <span
          className={`${styles.glow} ${styles.secondaryGlow}`}
          data-photo-part="atmosphere-glow"
        />

        <div className={styles.particles}>
          {particles.map((particle, index) => (
            <span
              className={styles.particle}
              data-photo-part="atmosphere-particle"
              key={index}
              style={assignInlineVars({
                [particleDelay]: particle.delay,
                [particleDriftX]: particle.driftX,
                [particleDriftY]: particle.driftY,
                [particleDuration]: particle.duration,
                [particleLeft]: particle.left,
                [particleSize]: particle.size,
                [particleTop]: particle.top,
              })}
            />
          ))}
        </div>

        <svg
          className={styles.wire}
          data-photo-part="atmosphere-wire"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <path
            className={styles.wireBase}
            d="M -80 760 C 150 570 250 920 470 650 S 720 270 1080 410"
            pathLength="1"
          />
          <path
            className={styles.wireEnergy}
            data-photo-part="atmosphere-wire-energy"
            d="M -80 760 C 150 570 250 920 470 650 S 720 270 1080 410"
            pathLength="1"
          />
        </svg>
      </div>
    </div>
  );
}
