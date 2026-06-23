/*
 * Grainient — vanilla port of reactbits' Grainient (JS-CSS variant).
 * Animated grainy-gradient WebGL2 background. No build step required:
 * ogl is loaded on-demand from a CDN as an ES module.
 *
 * Usage (module):
 *   import { mountGrainient } from './grainient.js';
 *   const g = mountGrainient(containerEl, { color1:'#FF9FFC', timeSpeed:0.25, ... });
 *   g.update({ zoom: 1.1 });   // change params at runtime
 *   g.destroy();               // tear down
 *
 * Usage (no JS, declarative): give any element data-grainient and an optional
 * JSON params blob, it auto-mounts on DOMContentLoaded:
 *   <div class="grainient-bg" data-grainient
 *        data-grainient-options='{"color1":"#FF9FFC","zoom":1.1}'></div>
 *
 * Also exposes window.mountGrainient for use from classic (non-module) scripts.
 */

const OGL_URL = 'https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm';

let oglPromise = null;
const loadOGL = () => (oglPromise ||= import(/* @vite-ignore */ OGL_URL));

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return [1, 1, 1];
  return [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255];
};

const DEFAULTS = {
  timeSpeed: 0.25,
  colorBalance: 0.0,
  warpStrength: 1.0,
  warpFrequency: 5.0,
  warpSpeed: 2.0,
  warpAmplitude: 50.0,
  blendAngle: 0.0,
  blendSoftness: 0.05,
  rotationAmount: 500.0,
  noiseScale: 2.0,
  grainAmount: 0.1,
  grainScale: 2.0,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1.0,
  saturation: 1.0,
  centerX: 0.0,
  centerY: 0.0,
  zoom: 0.9,
  color1: '#FF9FFC',
  color2: '#5227FF',
  color3: '#B497CF'
};

/*
 * Named presets. Both differ from DEFAULTS only in the three colors + timeSpeed.
 *   'dark'  — for dark page sections (e.g. #moat, the service scene, footer area)
 *   'light' — for light page sections (e.g. hero, white content blocks)
 * Use via data-grainient="dark" | "light", or mountGrainient(el, 'dark'),
 * or mountGrainient(el, { preset:'dark', zoom:1.1 }) to override single params.
 */
export const PRESETS = {
  dark: { color1: '#16161A', color2: '#2A0B4C', color3: '#4c4c4c', timeSpeed: 1.25 },
  light: { color1: '#e2cff6', color2: '#FFE5F1', color3: '#ada1c4', timeSpeed: 1.25 }
};

// Accept: undefined | object | preset-name string | { preset, ...overrides }
function resolveOptions(input) {
  if (!input) return {};
  if (typeof input === 'string') return { ...(PRESETS[input] || {}) };
  if (input.preset) {
    const { preset, ...rest } = input;
    return { ...(PRESETS[preset] || {}), ...rest };
  }
  return input;
}

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

function applyUniforms(u, o) {
  u.uTimeSpeed.value = o.timeSpeed;
  u.uColorBalance.value = o.colorBalance;
  u.uWarpStrength.value = o.warpStrength;
  u.uWarpFrequency.value = o.warpFrequency;
  u.uWarpSpeed.value = o.warpSpeed;
  u.uWarpAmplitude.value = o.warpAmplitude;
  u.uBlendAngle.value = o.blendAngle;
  u.uBlendSoftness.value = o.blendSoftness;
  u.uRotationAmount.value = o.rotationAmount;
  u.uNoiseScale.value = o.noiseScale;
  u.uGrainAmount.value = o.grainAmount;
  u.uGrainScale.value = o.grainScale;
  u.uGrainAnimated.value = o.grainAnimated ? 1.0 : 0.0;
  u.uContrast.value = o.contrast;
  u.uGamma.value = o.gamma;
  u.uSaturation.value = o.saturation;
  u.uCenterOffset.value = new Float32Array([o.centerX, o.centerY]);
  u.uZoom.value = o.zoom;
  u.uColor1.value = new Float32Array(hexToRgb(o.color1));
  u.uColor2.value = new Float32Array(hexToRgb(o.color2));
  u.uColor3.value = new Float32Array(hexToRgb(o.color3));
}

/**
 * Mount an animated Grainient background into `container`.
 * Returns a handle { update(opts), destroy() }. Async-safe: the canvas appears
 * once ogl loads; the handle works immediately (update() is queued if needed).
 */
export function mountGrainient(container, options = {}) {
  if (!container) throw new Error('mountGrainient: container is required');

  let opts = { ...DEFAULTS, ...resolveOptions(options) };
  let disposed = false;
  let ctx = null; // { renderer, program, mesh, gl, canvas, cleanup }
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  loadOGL()
    .then(({ Renderer, Program, Mesh, Triangle }) => {
      if (disposed) return;

      let renderer;
      try {
        renderer = new Renderer({
          webgl: 2,
          alpha: true,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
      } catch (e) {
        // WebGL2 unavailable — leave any CSS fallback background in place.
        container.setAttribute('data-grainient-status', 'unsupported');
        console.warn('[grainient] WebGL2 unavailable, skipping:', e);
        return;
      }

      const gl = renderer.gl;
      const canvas = gl.canvas;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uTimeSpeed: { value: 0.25 },
          uColorBalance: { value: 0.0 },
          uWarpStrength: { value: 1.0 },
          uWarpFrequency: { value: 5.0 },
          uWarpSpeed: { value: 2.0 },
          uWarpAmplitude: { value: 50.0 },
          uBlendAngle: { value: 0.0 },
          uBlendSoftness: { value: 0.05 },
          uRotationAmount: { value: 500.0 },
          uNoiseScale: { value: 2.0 },
          uGrainAmount: { value: 0.1 },
          uGrainScale: { value: 2.0 },
          uGrainAnimated: { value: 0.0 },
          uContrast: { value: 1.5 },
          uGamma: { value: 1.0 },
          uSaturation: { value: 1.0 },
          uCenterOffset: { value: new Float32Array([0, 0]) },
          uZoom: { value: 0.9 },
          uColor1: { value: new Float32Array([1, 1, 1]) },
          uColor2: { value: new Float32Array([1, 1, 1]) },
          uColor3: { value: new Float32Array([1, 1, 1]) }
        }
      });

      const mesh = new Mesh(gl, { geometry, program });
      applyUniforms(program.uniforms, opts);

      const setSize = () => {
        const rect = container.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        renderer.setSize(w, h);
        const res = program.uniforms.iResolution.value;
        res[0] = gl.drawingBufferWidth;
        res[1] = gl.drawingBufferHeight;
        renderer.render({ scene: mesh });
      };

      const ro = new ResizeObserver(setSize);
      ro.observe(container);
      setSize();

      let raf = 0;
      let isVisible = true;
      let isPageVisible = !document.hidden;
      const t0 = performance.now();

      const loop = (t) => {
        program.uniforms.iTime.value = (t - t0) * 0.001;
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };
      const tryStart = () => { if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop); };
      const tryStop = () => { if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; } };

      const io = new IntersectionObserver(
        ([entry]) => { isVisible = entry.isIntersecting; isVisible ? tryStart() : tryStop(); },
        { threshold: 0 }
      );
      io.observe(container);

      const onVisibility = () => { isPageVisible = !document.hidden; isPageVisible ? tryStart() : tryStop(); };
      document.addEventListener('visibilitychange', onVisibility);

      if (reduceMotion) {
        // Respect reduced-motion: render a single static frame, don't animate.
        renderer.render({ scene: mesh });
      } else {
        tryStart();
      }

      container.setAttribute('data-grainient-status', 'ready');

      ctx = {
        renderer, program, mesh, gl, canvas,
        cleanup: () => {
          tryStop();
          ro.disconnect();
          io.disconnect();
          document.removeEventListener('visibilitychange', onVisibility);
          try { container.removeChild(canvas); } catch (_) { /* ignore */ }
        }
      };
    })
    .catch((e) => {
      container.setAttribute('data-grainient-status', 'error');
      console.warn('[grainient] failed to load ogl:', e);
    });

  return {
    update(next = {}) {
      opts = { ...opts, ...next };
      if (ctx) applyUniforms(ctx.program.uniforms, opts);
    },
    destroy() {
      disposed = true;
      if (ctx) { ctx.cleanup(); ctx = null; }
    },
    get options() { return { ...opts }; }
  };
}

// Convenience for classic (non-module) scripts.
if (typeof window !== 'undefined') window.mountGrainient = mountGrainient;

// Declarative auto-mount: <div data-grainient data-grainient-options='{...}'>
function readDeclarativeOpts(el) {
  // data-grainient="dark" | "light" selects a preset; data-grainient-options
  // (JSON) layers on top to override individual params.
  const presetName = (el.getAttribute('data-grainient') || '').trim();
  let opts = presetName && PRESETS[presetName] ? { ...PRESETS[presetName] } : {};
  const raw = el.getAttribute('data-grainient-options');
  if (raw) {
    try { opts = { ...opts, ...JSON.parse(raw) }; }
    catch (e) { console.warn('[grainient] bad data-grainient-options JSON on', el, e); }
  }
  return opts;
}

function autoMount() {
  const els = document.querySelectorAll('[data-grainient]');
  if (!els.length) return;
  // Lazy mount / offscreen-unmount: only keep WebGL contexts for elements within
  // ~1 viewport of the fold, so a page with many grainient sections never exceeds
  // the browser's WebGL context limit (~16). The CSS fallback gradient (same tone)
  // covers the brief gap on re-mount. rootMargin gives a generous keep-alive band.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const el = e.target;
      if (e.isIntersecting) {
        if (!el.__grainient) el.__grainient = mountGrainient(el, readDeclarativeOpts(el));
      } else if (el.__grainient) {
        el.__grainient.destroy();
        el.__grainient = null;
      }
    });
  }, { rootMargin: '100% 0px' });
  els.forEach((el) => io.observe(el));
}
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoMount);
  else autoMount();
}

export { DEFAULTS };
