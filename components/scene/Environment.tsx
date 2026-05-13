"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fogVertexShader, fogFragmentShader } from "./shaders/hologram";

export function CyberpunkEnvironment() {
  return (
    <>
      {/* Distant city structures */}
      <CityStructures />

      {/* Ground with neon reflections */}
      <Ground />

      {/* Volumetric fog layers */}
      <FogLayers />

      {/* Neon lights in the distance */}
      <NeonLights />

      {/* Rails and bridges */}
      <IndustrialStructures />
    </>
  );
}

function CityStructures() {
  const buildings = useMemo(() => {
    const items = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 60 - 10;
      const z = -Math.random() * 40 - 10;
      const height = 5 + Math.random() * 15;
      const width = 1 + Math.random() * 3;

      items.push({ x, z, height, width, id: i });
    }
    return items;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <mesh key={b.id} position={[b.x, b.height / 2, b.z]}>
          <boxGeometry args={[b.width, b.height, b.width]} />
          <meshBasicMaterial
            color="#0a0a15"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Building window lights */}
      {buildings.slice(0, 15).map((b) => (
        <group key={`lights-${b.id}`}>
          {[...Array(Math.floor(b.height / 2))].map((_, i) => (
            <mesh
              key={i}
              position={[
                b.x + (Math.random() - 0.5) * b.width * 0.8,
                i * 2 + 1,
                b.z + b.width / 2 + 0.01,
              ]}
            >
              <planeGeometry args={[0.3, 0.5]} />
              <meshBasicMaterial
                color={Math.random() > 0.5 ? "#ff1493" : "#00bfff"}
                transparent
                opacity={0.3 + Math.random() * 0.4}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Ground() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        0.1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#050510"
        roughness={0.3}
        metalness={0.8}
        emissive="#ff1493"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function FogLayers() {
  const fogRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#1a0a20") },
      uDensity: { value: 0.4 },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <>
      {/* Ground fog */}
      <mesh
        ref={fogRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <shaderMaterial
          vertexShader={fogVertexShader}
          fragmentShader={fogFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmospheric haze layers */}
      {[0, 2, 5, 8].map((y, i) => (
        <mesh
          key={i}
          position={[0, y, -20]}
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[100, 10]} />
          <meshBasicMaterial
            color="#1a0520"
            transparent
            opacity={0.15 - i * 0.03}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

function NeonLights() {
  const lights = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 40,
          Math.random() * 8 + 2,
          -Math.random() * 30 - 5,
        ] as [number, number, number],
        color: Math.random() > 0.5 ? "#ff1493" : "#00bfff",
        intensity: 0.5 + Math.random() * 0.5,
        id: i,
      });
    }
    return items;
  }, []);

  return (
    <>
      {lights.map((light) => (
        <pointLight
          key={light.id}
          position={light.position}
          color={light.color}
          intensity={light.intensity}
          distance={15}
        />
      ))}

      {/* Main hologram area light */}
      <pointLight
        position={[5, 3, 2]}
        color="#ff1493"
        intensity={2}
        distance={10}
      />
      <pointLight
        position={[2, 1, 3]}
        color="#8b00ff"
        intensity={1.5}
        distance={8}
      />
    </>
  );
}

function IndustrialStructures() {
  return (
    <group>
      {/* Horizontal rails */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={`rail-${i}`}
          position={[-20, 3 + i * 3, -15 - i * 5]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[80, 0.1, 0.1]} />
          <meshBasicMaterial color="#1a1a2e" />
        </mesh>
      ))}

      {/* Vertical supports */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={`support-${i}`}
          position={[-30 + i * 10, 5, -20]}
        >
          <boxGeometry args={[0.2, 15, 0.2]} />
          <meshBasicMaterial color="#0f0f1a" />
        </mesh>
      ))}

      {/* Bridge structure */}
      <mesh position={[15, 8, -25]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[30, 0.5, 4]} />
        <meshBasicMaterial color="#0a0a15" transparent opacity={0.7} />
      </mesh>

      {/* Bridge supports */}
      {[...Array(4)].map((_, i) => (
        <mesh
          key={`bridge-support-${i}`}
          position={[5 + i * 8, 4, -25]}
        >
          <boxGeometry args={[0.5, 8, 0.5]} />
          <meshBasicMaterial color="#0a0a15" />
        </mesh>
      ))}

      {/* Neon accent lines on structures */}
      <mesh position={[15, 8.3, -25]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[30, 0.05, 0.05]} />
        <meshBasicMaterial color="#ff1493" />
      </mesh>
    </group>
  );
}
