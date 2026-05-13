"use client";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
  ToneMapping,
  DepthOfField,
} from "@react-three/postprocessing";

import {
  BlendFunction,
  ToneMappingMode,
} from "postprocessing";

import { Vector2 } from "three";

interface PostProcessingEffectsProps {
  quality?: "low" | "medium" | "high";
}

export function PostProcessingEffects({
  quality = "high",
}: PostProcessingEffectsProps) {
  /* ---------------- QUALITY ---------------- */

  const isLow = quality === "low";
  const isMedium = quality === "medium";

  /* Bloom */
  const bloomIntensity = isLow
    ? 0.42
    : isMedium
    ? 0.75
    : 1.05;

  /* Noise */
  const noiseOpacity = isLow
    ? 0.018
    : isMedium
    ? 0.028
    : 0.04;

  /* Chromatic */
  const chromaticOffset = isLow
    ? 0.0006
    : isMedium
    ? 0.001
    : 0.0014;

  /* Vignette */
  const vignetteDarkness = isLow
    ? 0.45
    : isMedium
    ? 0.58
    : 0.72;

  /* DOF */
  const dofBokehScale = isLow
    ? 1.4
    : isMedium
    ? 2.2
    : 3;

  return (
    <EffectComposer multisampling={isLow ? 0 : 4}>
      {/* Bloom */}
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.16}
        luminanceSmoothing={0.92}
        mipmapBlur
        radius={0.72}
      />

      {/* Depth Of Field */}
      {!isLow && (
        <DepthOfField
          focusDistance={0.018}
          focalLength={0.024}
          bokehScale={dofBokehScale}
          height={480}
        />
      )}

      {/* Chromatic Aberration */}
      <ChromaticAberration
        offset={
          new Vector2(
            chromaticOffset,
            chromaticOffset
          )
        }
        radialModulation={true}
        modulationOffset={0.12}
      />

      {/* Film Noise */}
      <Noise
        premultiply={true}
        opacity={noiseOpacity}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />

      {/* Vignette */}
      <Vignette
        offset={0.24}
        darkness={vignetteDarkness}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Tone Mapping */}
      <ToneMapping
        mode={ToneMappingMode.ACES_FILMIC}
      />
    </EffectComposer>
  );
}