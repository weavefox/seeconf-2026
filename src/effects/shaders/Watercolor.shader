Shader "SEEConf/Watercolor" {
  SubShader "Default" {
    DepthState = {
      Enabled = false;
      WriteEnabled = false;
    }
    RasterState = {
      CullMode = CullMode.Off;
    }

    vec2 uTexel;
    vec2 uDomain;
    float uDt;

    struct Attributes {
      vec4 POSITION_UV;
    };

    struct Varyings {
      vec2 v_uv;
    };

    Varyings vert(Attributes attr) {
      Varyings v;
      gl_Position = vec4(attr.POSITION_UV.xy, 0.0, 1.0);
      v.v_uv = attr.POSITION_UV.zw;
      return v;
    }

    vec4 bilerp(sampler2D tex, vec2 uv) {
      vec2 p = uv / uTexel - .5;
      vec2 f = fract(p), i = floor(p);
      vec4 a = texture2D(tex, (i + vec2(.5, .5)) * uTexel);
      vec4 b = texture2D(tex, (i + vec2(1.5, .5)) * uTexel);
      vec4 c = texture2D(tex, (i + vec2(.5, 1.5)) * uTexel);
      vec4 d = texture2D(tex, (i + vec2(1.5, 1.5)) * uTexel);
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    Pass "force" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uVelocity;
      vec2 uFrom, uTo, uForce;
      float uRadius, uHasStroke;
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        vec3 previous = texture2D(uVelocity, vUv).xyz;
        vec2 p = vUv * uDomain, a = uFrom * uDomain, b = uTo * uDomain;
        vec2 ab = b - a;
        float t = clamp(dot(p - a, ab) / max(dot(ab, ab), .000001), 0., 1.);
        vec2 delta = p - mix(a, b, t);
        float sdf = max(0., 1. - length(delta) / uRadius);
        float forceLength = length(uForce);
        vec2 radial = delta / max(length(delta), .000001) * forceLength;
        vec2 impulse = mix(uForce, radial, .2) * sdf * uHasStroke;
        float hasInk = step(.0001, sdf) * step(.0001, forceLength) * uHasStroke;
        float intensity = min(previous.z + .06 * hasInk * 60. * uDt, 1.);
        gl_FragColor = vec4(previous.xy + impulse * 60. * uDt, intensity, 1.);
      }
    }

    Pass "advect" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uVelocity, uNoise;
      float cubicInOut(float t) {
        float q = 2. * t - 2.;
        return t < .5 ? 4. * t * t * t : .5 * q * q * q + 1.;
      }
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        vec3 data = texture2D(uVelocity, vUv).xyz;
        vec2 velocity = data.xy;
        vec3 n1 = texture2D(uNoise, vUv).rgb, n2 = texture2D(uNoise, vUv * 2.).rgb;
        vec2 noiseDirection = normalize((n1.gb - .5) * 2. + vec2(.00001));
        float threshold = cubicInOut(n1.r) * .05;
        bool below = length(velocity) < threshold;
        if (below) velocity *= smoothstep(.468, .51, n2.r);
        vec2 ratio = max(uDomain.x, uDomain.y) / uDomain;
        vec2 backtrace = mix(velocity, noiseDirection * length(velocity), .8) * (.008 * 60. * uDt) * ratio;
        if (below) backtrace *= mix(0., 3., n1.r);
        vec3 previous = bilerp(uVelocity, clamp(vUv - backtrace, vec2(0), vec2(1))).xyz;
        float dim = 1. + (1. - smoothstep(0., .001, length(backtrace))) * 3.;
        float intensity = max(max(previous.z, data.z) - .001 * dim * 60. * uDt, 0.);
        gl_FragColor = vec4(previous.xy * pow(.98, 60. * uDt), intensity, 1.);
      }
    }

    Pass "divergence" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uVelocity;
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        float l = texture2D(uVelocity, vUv - vec2(uTexel.x, 0)).x;
        float r = texture2D(uVelocity, vUv + vec2(uTexel.x, 0)).x;
        float b = texture2D(uVelocity, vUv - vec2(0, uTexel.y)).y;
        float t = texture2D(uVelocity, vUv + vec2(0, uTexel.y)).y;
        gl_FragColor = vec4((r - l + t - b) * .5, 0., 0., 1.);
      }
    }

    Pass "pressure" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uPressure, uDivergence;
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        float l = texture2D(uPressure, vUv - vec2(uTexel.x, 0)).x;
        float r = texture2D(uPressure, vUv + vec2(uTexel.x, 0)).x;
        float b = texture2D(uPressure, vUv - vec2(0, uTexel.y)).x;
        float t = texture2D(uPressure, vUv + vec2(0, uTexel.y)).x;
        float d = texture2D(uDivergence, vUv).x;
        gl_FragColor = vec4((l + r + b + t - d) * .25, 0., 0., 1.);
      }
    }

    Pass "project" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uPressure, uVelocity;
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        float l = texture2D(uPressure, vUv - vec2(uTexel.x, 0)).x;
        float r = texture2D(uPressure, vUv + vec2(uTexel.x, 0)).x;
        float b = texture2D(uPressure, vUv - vec2(0, uTexel.y)).x;
        float t = texture2D(uPressure, vUv + vec2(0, uTexel.y)).x;
        vec2 v = texture2D(uVelocity, vUv).xy - .5 * vec2(r - l, t - b);
        gl_FragColor = vec4(v, texture2D(uVelocity, vUv).z, 1.);
      }
    }

    Pass "accumulate" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uVelocity, uAccumulation;
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        vec3 velocity = texture2D(uVelocity, vUv).xyz;
        vec2 travel = velocity.xy * (.008 * 60. * uDt);
        vec4 previous = bilerp(uAccumulation, clamp(vUv - travel / uDomain, vec2(0.), vec2(1.)));
        float speed = length(velocity.xy);
        float signal = speed > 0. ? 1. - smoothstep(0., speed, .01) : 0.;
        float wetness = max(signal, previous.b * pow(.96, 60. * uDt));
        vec2 displacement = previous.rg * pow(.98, 60. * uDt) + travel;
        gl_FragColor = vec4(displacement, wetness, velocity.z);
      }
    }

    Pass "blur" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uSource;
      vec2 uDirection;
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        vec4 c = texture2D(uSource, vUv) * .1633;
        c += (texture2D(uSource, vUv - uDirection) + texture2D(uSource, vUv + uDirection)) * .1531;
        c += (texture2D(uSource, vUv - 2.*uDirection) + texture2D(uSource, vUv + 2.*uDirection)) * .12245;
        c += (texture2D(uSource, vUv - 3.*uDirection) + texture2D(uSource, vUv + 3.*uDirection)) * .0918;
        c += (texture2D(uSource, vUv - 4.*uDirection) + texture2D(uSource, vUv + 4.*uDirection)) * .051;
        gl_FragColor = c;
      }
    }

    Pass "display" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uImage;
      vec2 uResolution, uImagePosition, uImageSize;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      void frag(Varyings input) {
        vec2 vUv = input.v_uv;
        vec2 uv = vUv;
        float screenAspect = uResolution.x / uResolution.y;
        vec2 imageSize = uImageSize;
        float imageAspect = imageSize.x / imageSize.y;
        vec2 cover = vec2(min(1., screenAspect / imageAspect), min(1., imageAspect / screenAspect));
        vec2 baseCenter = cover * .5 + (1. - cover) * uImagePosition;
        vec2 sampleUv = (uv - .5) * cover + baseCenter;
        vec3 color = texture2D(uImage, vec2(sampleUv.x, 1. - sampleUv.y)).rgb;
        float grain = (hash(gl_FragCoord.xy) - .5) / 255.;
        gl_FragColor = vec4(color + grain, 1.);
      }
    }

    Pass "composite" {
      VertexShader = vert;
      FragmentShader = frag;

      sampler2D uSharp, uBlur, uAccumulation, uRevealNoise, uPaper, uPaperNormal;
      sampler2D uDryLut, uInkLut;
      float uDrySize, uInkSize, uReduced;
      vec2 uPaperScale, uPaperTexel;
      float srgbChannelToLinear(float value) {
        return value <= .04045 ? value / 12.92 : pow((value + .055) / 1.055, 2.4);
      }
      vec3 lookup(sampler2D lut, float size, vec3 color) {
        // A horizontal strip of blue slices preserves trilinear LUT sampling.
        vec3 grid = clamp(color, 0., 1.) * (size - 1.);
        float slice = floor(grid.b);
        float nextSlice = min(slice + 1., size - 1.);
        vec2 atlasSize = vec2(size * size, size);
        vec2 uv0 = (vec2(grid.r + slice * size, grid.g) + .5) / atlasSize;
        vec2 uv1 = (vec2(grid.r + nextSlice * size, grid.g) + .5) / atlasSize;
        return mix(texture2D(lut, uv0).rgb, texture2D(lut, uv1).rgb, fract(grid.b));
      }
      vec3 onPaper(sampler2D lut, float size, vec3 color) {
        vec3 paper = vec3(.965);
        return lookup(lut, size, color) * paper / lookup(lut, size, paper);
      }
      float quarticInOut(float t) {
        return t < .5 ? 8. * pow(t, 4.) : 1. - 8. * pow(1. - t, 4.);
      }
      void frag(Varyings input) {
        // FinalSRGB samples the post-process target with top-left UVs.
        vec2 vUv = vec2(input.v_uv.x, 1. - input.v_uv.y);
        vec4 data = bilerp(uAccumulation, vUv);
        float wetness = clamp(data.b, 0., 1.);
        float coverage = clamp(mix(.8, 1.4, data.a) * wetness, 0., 1.);
        vec2 flow = -data.rg / (1. + length(data.rg) / .01) / uDomain;
        flow *= wetness * (1. - uReduced);
        vec2 materialUv = clamp(vUv + flow, vec2(0.), vec2(1.));
        vec2 surfaceUv = (vUv + flow) * uDomain;
        vec3 noise = texture2D(uRevealNoise, surfaceUv * .6).rgb;
        float pigment = coverage + (noise.r + noise.g - 1.) * coverage * (1. - coverage);
        float mixValue = mix(smoothstep(0., 1., pigment), 1., uReduced);
        vec3 sharp = texture2D(uSharp, materialUv).rgb;
        vec3 soft = texture2D(uBlur, materialUv).rgb;
        vec3 dry = onPaper(uDryLut, uDrySize, soft);
        vec3 ink = onPaper(uInkLut, uInkSize, sharp);
        vec2 paperUv = (vUv + flow) * uPaperScale;
        vec3 paperNormal = texture2D(uPaperNormal, paperUv).xyz * 2. - 1.;
        paperNormal = normalize(paperNormal);
        float fibers = texture2D(uPaper, paperUv).r - texture2D(uPaper, paperUv + uPaperTexel).r;
        float fog = .20 + smoothstep(.25, .75, noise.b) * .28;
        vec3 absorption = max(vec3(.965) - soft, vec3(0.)) / .965;
        float pigmentAmount = clamp(max(max(absorption.r, absorption.g), absorption.b), 0., 1.);
        float dryPigment = pigmentAmount * (1. - fog);
        float thinPaint = 4. * dryPigment * (1. - dryPigment);
        float grainPatch = quarticInOut(texture2D(uRevealNoise, surfaceUv * .15).b);
        float exposedFibers = thinPaint * sqrt(pigmentAmount) * mix(.05, 1., grainPatch);
        float relief = (dot(paperNormal.xy, normalize(vec2(-1., 1.))) * .05 + fibers * .1) * exposedFibers;
        dry = mix(dry, vec3(.965), fog) + relief;
        vec3 color = mix(dry, ink, mixValue);
        // The post-process output is linear; FinalSRGB converts it for the canvas.
        gl_FragColor = vec4(srgbChannelToLinear(color.r), srgbChannelToLinear(color.g), srgbChannelToLinear(color.b), 1.);
      }
    }

    Pass "clear" {
      VertexShader = vert;
      FragmentShader = frag;

      void frag() {
        gl_FragColor = vec4(0.);
      }
    }
  }
}
