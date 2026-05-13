"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  mousePosition: { x: number; y: number };
}

export function CameraController({ mousePosition }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 1, 8));
  const targetLookAt = useRef(new THREE.Vector3(2, 0, 0));
  const time = useRef(0);
  const noiseOffset = useRef({ x: Math.random() * 100, y: Math.random() * 100 });

  useFrame((state, delta) => {
    time.current += delta;

    // Cinematic floating camera drift
    const driftX = Math.sin(time.current * 0.1) * 0.3;
    const driftY = Math.cos(time.current * 0.15) * 0.15;
    const driftZ = Math.sin(time.current * 0.08) * 0.2;

    // Subtle handheld camera shake (very subtle)
    const shakeX = (Math.sin(time.current * 3 + noiseOffset.current.x) * 0.01);
    const shakeY = (Math.cos(time.current * 2.5 + noiseOffset.current.y) * 0.008);

    // Mouse-based parallax (subtle)
    const parallaxX = mousePosition.x * 0.5;
    const parallaxY = mousePosition.y * 0.3;

    // Target camera position
    targetPosition.current.set(
      driftX + parallaxX + shakeX,
      1 + driftY + parallaxY * 0.5 + shakeY,
      8 + driftZ
    );

    // Target look at point (slightly towards the hologram)
    targetLookAt.current.set(
      2 + parallaxX * 0.3,
      0.5 + parallaxY * 0.2,
      0
    );

    // Smooth camera movement with lerp
    camera.position.lerp(targetPosition.current, 0.02);

    // Create a temporary vector for lookAt interpolation
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);

    currentLookAt.lerp(targetLookAt.current, 0.02);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
