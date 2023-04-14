varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform float uProg;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d);

void main() {
  vUv = uv;
  vec3 pos = position;

  float distortion = pnoise((pos + uTime * 10.0), vec3(10.0) * 1.5) * 50.0 * uProg;
  pos.z += distortion;

  vDistortion = distortion * 0.001;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}