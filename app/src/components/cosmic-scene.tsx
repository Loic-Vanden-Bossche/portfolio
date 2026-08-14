"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function createParticlePositions() {
  const values = new Float32Array(680 * 3);
  let seed = 741;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let index = 0; index < values.length; index += 3) {
    const radius = 4 + random() * 9;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);

    values[index] = radius * Math.sin(phi) * Math.cos(theta);
    values[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
    values[index + 2] = radius * Math.cos(phi);
  }

  return values;
}

const particlePositions = createParticlePositions();

function ParticleField() {
  const points = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!points.current) return;

    points.current.rotation.y += delta * 0.012;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        blending={THREE.AdditiveBlending}
        color="#7ddcff"
        depthWrite={false}
        opacity={0.55}
        size={0.025}
        sizeAttenuation
      />
    </points>
  );
}

function AnimationDriver() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!document.hidden) invalidate();
    }, 1000 / 30);

    return () => window.clearInterval(interval);
  }, [invalidate]);

  return null;
}

export function CosmicScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      dpr={1}
      frameloop="demand"
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <AnimationDriver />
      <ParticleField />
    </Canvas>
  );
}
