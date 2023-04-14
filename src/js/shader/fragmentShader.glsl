varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform sampler2D uTex;

// uniform vec2 uResolution;
// uniform vec2 uTexResolution;

void main() {
  vec2 uv = vUv;

  // vec2 ratio = vec2(
  //   min((uResolution.x / uResolution.y) / (uTexResolution.x / uTexResolution.y), 1.0),
  //   min((uResolution.y / uResolution.x) / (uTexResolution.y / uTexResolution.x), 1.0)
  // );
  // uv = vec2(
  //   vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
  //   vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  // );
  // vec3 color = texture2D(uTex, uv).rgb;
  // vec3 color = texture2D(uTex, uv + vDistortion).rgb;
  
  float r = texture2D(uTex, uv).r;
  float g = texture2D(uTex, uv + vDistortion).g;
  float b = texture2D(uTex, uv + vDistortion).b;
  vec3 color = vec3(r, g, b);

  // vec3 color = mix(RED, BLUE, 0.5);
  gl_FragColor = vec4(color, 1.0);
}