"use client";

import {
  useRef,
  useMemo,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
}

export function Particles({
  count = 500,
  color = "#ff69b4",
  size = 0.02,
  spread = 10,
}: ParticlesProps) {
  const points = useRef<THREE.Points>(null);

  /* ---------------- INITIAL DATA ---------------- */

  const [positions, velocities, randomness] =
    useMemo(() => {
      const pos = new Float32Array(count * 3);

      const vel = new Float32Array(count * 3);

      const rand = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        /* Initial Position */
        pos[i3] =
          (Math.random() - 0.5) * spread;

        pos[i3 + 1] =
          (Math.random() - 0.5) * spread;

        pos[i3 + 2] =
          (Math.random() - 0.5) * spread;

        /* Velocity */
        vel[i3] =
          (Math.random() - 0.5) * 0.002;

        vel[i3 + 1] =
          Math.random() * 0.004 +
          0.0015;

        vel[i3 + 2] =
          (Math.random() - 0.5) * 0.002;

        /* Random Motion Factor */
        rand[i] = Math.random();
      }

      return [pos, vel, rand];
    }, [count, spread]);

  /* ---------------- ANIMATION ---------------- */

  useFrame(({ clock }) => {
    if (!points.current) return;

    const time =
      clock.getElapsedTime();

    const geometry =
      points.current.geometry;

    const positionArray =
      geometry.attributes.position
        .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      /* Base Upward Motion */
      positionArray[i3] +=
        velocities[i3];

      positionArray[i3 + 1] +=
        velocities[i3 + 1];

      positionArray[i3 + 2] +=
        velocities[i3 + 2];

      /* Holographic Drift */
      positionArray[i3] +=
        Math.sin(
          time * 0.45 +
            randomness[i] * 10
        ) *
        0.0012;

      positionArray[i3 + 2] +=
        Math.cos(
          time * 0.35 +
            randomness[i] * 8
        ) *
        0.001;

      /* Floating Pulse */
      positionArray[i3 + 1] +=
        Math.sin(
          time * 0.8 +
            randomness[i] * 15
        ) *
        0.0008;

      /* Particle Reset */
      if (
        positionArray[i3 + 1] >
        spread / 2
      ) {
        positionArray[i3 + 1] =
          -spread / 2;

        positionArray[i3] =
          (Math.random() - 0.5) *
          spread;

        positionArray[i3 + 2] =
          (Math.random() - 0.5) *
          spread;
      }
    }

    geometry.attributes.position.needsUpdate =
      true;

    /* Entire Cloud Motion */
    points.current.rotation.y =
      time * 0.015;

    points.current.rotation.x =
      Math.sin(time * 0.08) * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={
          THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </points>
  );
}

export function HologramParticles() {
  const points =
    useRef<THREE.Points>(null);

  const count = 220;

  /* ---------------- INITIAL POSITIONS ---------------- */

  const [positions, randomness] =
    useMemo(() => {
      const pos =
        new Float32Array(count * 3);

      const rand =
        new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        /* Circular Distribution */
        const angle =
          Math.random() *
          Math.PI *
          2;

        const radius =
          1.5 +
          Math.random() * 1.7;

        pos[i3] =
          3 +
          Math.cos(angle) * radius;

        pos[i3 + 1] =
          (Math.random() - 0.3) * 4;

        pos[i3 + 2] =
          Math.sin(angle) *
          radius *
          0.5;

        rand[i] = Math.random();
      }

      return [pos, rand];
    }, []);

  /* ---------------- ANIMATION ---------------- */

  useFrame(({ clock }) => {
    if (!points.current) return;

    const time =
      clock.getElapsedTime();

    const geometry =
      points.current.geometry;

    const posArray =
      geometry.attributes.position
        .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      /* Upward Float */
      posArray[i3 + 1] +=
        0.004 +
        randomness[i] * 0.002;

      /* Circular Hologram Motion */
      posArray[i3] +=
        Math.sin(
          time * 0.8 +
            randomness[i] * 20
        ) *
        0.002;

      posArray[i3 + 2] +=
        Math.cos(
          time * 0.7 +
            randomness[i] * 15
        ) *
        0.0015;

      /* Vertical Pulse */
      posArray[i3 + 1] +=
        Math.sin(
          time * 1.2 +
            randomness[i] * 10
        ) *
        0.0012;

      /* Reset */
      if (posArray[i3 + 1] > 3) {
        posArray[i3 + 1] = -2;
      }
    }

    geometry.attributes.position.needsUpdate =
      true;

    /* Entire System Drift */
    points.current.rotation.y =
      time * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.028}
        color="#ff1493"
        transparent
        opacity={0.72}
        sizeAttenuation
        blending={
          THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </points>
  );
}