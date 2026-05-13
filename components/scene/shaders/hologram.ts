export const hologramVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vNoise;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDistortion;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 pos = position;
    
    // Add subtle noise distortion
    float noise = snoise(vec3(pos.x * 2.0, pos.y * 2.0, uTime * 0.3));
    vNoise = noise;
    
    // Glitch distortion
    float glitchTime = floor(uTime * 10.0) / 10.0;
    float glitch = step(0.95, fract(sin(glitchTime * 12.9898) * 43758.5453));
    pos.x += glitch * sin(pos.y * 50.0 + uTime) * uDistortion * 0.1;
    
    // Breathing animation
    float breathing = sin(uTime * 0.5) * 0.01;
    pos *= 1.0 + breathing;
    
    // Mouse interaction ripple
    float dist = length(uMouse - vec2(pos.x, pos.y));
    float ripple = sin(dist * 10.0 - uTime * 3.0) * 0.02 * smoothstep(2.0, 0.0, dist);
    pos.z += ripple;
    
    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const hologramFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vNoise;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uOpacity;
  uniform float uScanlineIntensity;
  uniform float uRgbShift;
  uniform float uFlicker;
  
  // Random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Scanlines
    float scanline = sin(uv.y * 400.0 + uTime * 2.0) * 0.5 + 0.5;
    scanline = pow(scanline, 2.0) * uScanlineIntensity;
    
    // RGB shift / chromatic aberration
    float shift = uRgbShift * 0.01;
    float r = smoothstep(0.0, 1.0, uv.x + shift);
    float g = smoothstep(0.0, 1.0, uv.x);
    float b = smoothstep(0.0, 1.0, uv.x - shift);
    
    // Base color gradient
    vec3 color = mix(uColor1, uColor2, uv.y);
    color = mix(color, uColor3, sin(uTime * 0.5 + uv.x * 3.14159) * 0.5 + 0.5);
    
    // Apply RGB shift
    color.r *= r;
    color.g *= g;
    color.b *= b;
    
    // Edge glow (fresnel)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
    color += fresnel * uColor1 * 1.5;
    
    // Digital noise
    float noise = random(uv + uTime * 0.1) * 0.1;
    
    // Flicker effect
    float flicker = 1.0 - uFlicker * random(vec2(floor(uTime * 20.0), 0.0)) * 0.3;
    
    // Horizontal glitch lines
    float glitchLine = step(0.98, random(vec2(floor(uv.y * 50.0), floor(uTime * 5.0))));
    color.rgb = mix(color.rgb, uColor2 * 2.0, glitchLine * 0.5);
    
    // Combine all effects
    float alpha = uOpacity * (1.0 - scanline * 0.3) * flicker;
    alpha *= smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
    
    // Add noise to alpha for holographic feel
    alpha *= 0.8 + vNoise * 0.2;
    alpha += noise * 0.1;
    
    gl_FragColor = vec4(color + noise, alpha);
  }
`;

export const fogVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fogFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uDensity;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 st = vUv * 3.0;
    st.x += uTime * 0.05;
    
    float f = fbm(st + fbm(st + uTime * 0.1));
    
    vec3 color = uColor * (f * 0.5 + 0.5);
    float alpha = f * uDensity * smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
    
    gl_FragColor = vec4(color, alpha);
  }
`;
