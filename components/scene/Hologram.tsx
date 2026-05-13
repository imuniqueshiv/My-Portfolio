"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { hologramVertexShader, hologramFragmentShader } from "./shaders/hologram";

interface HologramProps {
  mousePosition: { x: number; y: number };
}

function HologramHead({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!meshRef.current) return;

    // Calculate target rotation based on mouse position
    targetRotation.current.x = mousePosition.y * 0.1;
    targetRotation.current.y = mousePosition.x * 0.15;

    // Smooth interpolation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 1.2, 0]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshBasicMaterial color="#ff69b4" transparent opacity={0} />
    </mesh>
  );
}

function HologramEyes({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const targetLook = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;

    // Smooth eye tracking
    targetLook.current.x = THREE.MathUtils.lerp(
      targetLook.current.x,
      mousePosition.x * 0.08,
      0.08
    );
    targetLook.current.y = THREE.MathUtils.lerp(
      targetLook.current.y,
      mousePosition.y * 0.06,
      0.08
    );

    leftEyeRef.current.position.x = -0.12 + targetLook.current.x;
    leftEyeRef.current.position.y = 1.25 + targetLook.current.y;
    rightEyeRef.current.position.x = 0.12 + targetLook.current.x;
    rightEyeRef.current.position.y = 1.25 + targetLook.current.y;
  });

  return (
    <>
      <mesh ref={leftEyeRef} position={[-0.12, 1.25, 0.3]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.12, 1.25, 0.3]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </>
  );
}

export function HologramFigure({ mousePosition }: HologramProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [blinkState, setBlinkState] = useState(1);

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      const shouldBlink = Math.random() > 0.7;
      if (shouldBlink) {
        setBlinkState(0);
        setTimeout(() => setBlinkState(1), 150);
      }
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#ff1493") },
      uColor2: { value: new THREE.Color("#8b00ff") },
      uColor3: { value: new THREE.Color("#00bfff") },
      uOpacity: { value: 0.7 },
      uScanlineIntensity: { value: 0.3 },
      uRgbShift: { value: 2.0 },
      uDistortion: { value: 1.0 },
      uFlicker: { value: 0.5 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(mousePosition.x, mousePosition.y);
    }

    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;

      // Gentle rotation towards mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.1,
        0.02
      );
    }
  });

  return (
    <group ref={groupRef} position={[3.5, 0, 0]} scale={[2, 2, 2]}>
      {/* Main body - stylized female silhouette */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 2, 32, 1, true]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={hologramVertexShader}
          fragmentShader={hologramFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.9, 16]} />
        <shaderMaterial
          vertexShader={hologramVertexShader}
          fragmentShader={hologramFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.3, 16]} />
        <shaderMaterial
          vertexShader={hologramVertexShader}
          fragmentShader={hologramFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Head */}
      <HologramHead mousePosition={mousePosition} />
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <shaderMaterial
          vertexShader={hologramVertexShader}
          fragmentShader={hologramFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.35, -0.1]}>
        <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <shaderMaterial
          vertexShader={hologramVertexShader}
          fragmentShader={hologramFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Hair strands flowing */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 8) * Math.PI * 2) * 0.25,
            1.1 - i * 0.08,
            Math.cos((i / 8) * Math.PI * 2) * 0.15 - 0.2,
          ]}
          rotation={[0.3, (i / 8) * Math.PI * 2, 0]}
        >
          <cylinderGeometry args={[0.02, 0.01, 0.4 + i * 0.1, 8]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Eyes with tracking */}
      <group scale={[1, blinkState, 1]}>
        <HologramEyes mousePosition={mousePosition} />
      </group>

      {/* Glow rings around hologram */}
      {[0, 0.5, 1, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y - 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6 + i * 0.1, 0.62 + i * 0.1, 64]} />
          <meshBasicMaterial
            color="#ff1493"
            transparent
            opacity={0.3 - i * 0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Motion trails */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={`trail-${i}`}
          position={[-0.3 - i * 0.1, 0, -0.5 - i * 0.1]}
          scale={[1 - i * 0.15, 1 - i * 0.15, 1]}
        >
          <cylinderGeometry args={[0.25, 0.45, 1.8, 32, 1, true]} />
          <meshBasicMaterial
            color="#ff1493"
            transparent
            opacity={0.1 - i * 0.02}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
