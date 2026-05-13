import { Object3DNode } from "@react-three/fiber";
import { ShaderMaterial } from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      shaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
    }
  }
}

declare module "three" {
  interface ShaderMaterial {
    uniforms: {
      [uniform: string]: { value: unknown };
    };
  }
}
