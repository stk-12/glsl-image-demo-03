varying vec2 vUv;
uniform float uTime;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d);

void main() {
  vUv = uv;
  vec3 pos = position;

  float distortion = pnoise((pos + uTime * 10.0), vec3(10.0) * 1.5) * 50.0;
  pos.z += distortion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}