import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

@Component({
  selector: 'app-balatro',
  imports: [],
  templateUrl: './balatro.component.html',
  styleUrl: './balatro.component.scss'
})
export class BalatroComponent implements AfterViewInit {

  ngAfterViewInit(): void {

    const parameters = {
      spinRotation: -2.0,
      spinSpeed: 7.0,
      offset: [0.0, 0.0],
      color1: "#DE443B",
      color2: "#006BB4",
      color3: "#162325",
      contrast: 3.5,
      lighting: 0.4,
      spinAmount: 0.25,
      pixelFilter: 745.0,
      spinEase: 1.0,
      isRotate: true,
      mouseInteraction: false,
    }

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    //Renderer
    let renderer: any = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    document.getElementById("webGL")?.appendChild( renderer.domElement );

    // Scene
    let scene: any = new THREE.Scene()

    scene.background = new THREE.Color(0x111111);

    // Base camera
    let camera: any = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 0, 0)
    scene.add(camera)

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {

      sizes.width = window.innerWidth,
        sizes.height = window.innerHeight

      if (camera != null) {
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
      }

      if (renderer != null) {
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.render(scene, camera)
      }
    }

    //Balatro Background
    const gl = renderer.gl;

    const geometry = new THREE.PlaneGeometry(2,2,1,1);

    const material = new THREE.RawShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms:
      {
          iTime: { value: 0 },
          iResolution: {
            value: [
              sizes.width,
              sizes.height,
              sizes.width / sizes.height,
            ],
          },
          uSpinRotation: { value: parameters.spinRotation },
          uSpinSpeed: { value: parameters.spinSpeed },
          uOffset: { value: parameters.offset },
          uColor1: { value: hexToVec4(parameters.color1) },
          uColor2: { value: hexToVec4(parameters.color2) },
          uColor3: { value: hexToVec4(parameters.color3) },
          uContrast: { value: parameters.contrast },
          uLighting: { value: parameters.lighting },
          uSpinAmount: { value: parameters.spinAmount },
          uPixelFilter: { value: parameters.pixelFilter },
          uSpinEase: { value: parameters.spinEase },
          uIsRotate: { value: parameters.isRotate },
          uMouse: { value: [0.5, 0.5] },
      }
      ,
        vertexShader: `
          attribute vec2 uv;
          attribute vec2 position;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 0, 1);
          }
          `,
        fragmentShader: `
            precision highp float;

            #define PI 3.14159265359

            uniform float iTime;
            uniform vec3 iResolution;
            uniform float uSpinRotation;
            uniform float uSpinSpeed;
            uniform vec2 uOffset;
            uniform vec4 uColor1;
            uniform vec4 uColor2;
            uniform vec4 uColor3;
            uniform float uContrast;
            uniform float uLighting;
            uniform float uSpinAmount;
            uniform float uPixelFilter;
            uniform float uSpinEase;
            uniform bool uIsRotate;
            uniform vec2 uMouse;

            varying vec2 vUv;

            vec4 effect(vec2 screenSize, vec2 screen_coords) {
                float pixel_size = length(screenSize.xy) / uPixelFilter;
                vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
                float uv_len = length(uv);
                
                float speed = (uSpinRotation * uSpinEase * 0.2);
                if(uIsRotate){
                  speed = iTime * speed;
                }
                speed += 302.2;
                
                float mouseInfluence = (uMouse.x * 2.0 - 1.0);
                speed += mouseInfluence * 0.1;
                
                float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
                vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
                uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);
                
                uv *= 30.0;
                float baseSpeed = iTime * uSpinSpeed;
                speed = baseSpeed + mouseInfluence * 2.0;
                
                vec2 uv2 = vec2(uv.x + uv.y);
                
                for(int i = 0; i < 5; i++) {
                    uv2 += sin(max(uv.x, uv.y)) + uv;
                    uv += 0.5 * vec2(
                        cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
                        sin(uv2.x - 0.113 * speed)
                    );
                    uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
                }
                
                float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
                float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
                float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
                float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
                float c3p = 1.0 - min(1.0, c1p + c2p);
                float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);
                
                return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
            }

            void main() {
                vec2 uv = vUv * iResolution.xy;
                gl_FragColor = effect(iResolution.xy, uv);
            }
            `
    })

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * Animate
     */
    const clock = new THREE.Clock()
    
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

          // Update material
          material.uniforms['iTime'].value = elapsedTime * 0.1;
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()

    function hexToVec4(hex: string): [number, number, number, number] {
      let hexStr = hex.replace("#", "");
      let r = 0,
        g = 0,
        b = 0,
        a = 1;
      if (hexStr.length === 6) {
        r = parseInt(hexStr.slice(0, 2), 16) / 255;
        g = parseInt(hexStr.slice(2, 4), 16) / 255;
        b = parseInt(hexStr.slice(4, 6), 16) / 255;
      } else if (hexStr.length === 8) {
        r = parseInt(hexStr.slice(0, 2), 16) / 255;
        g = parseInt(hexStr.slice(2, 4), 16) / 255;
        b = parseInt(hexStr.slice(4, 6), 16) / 255;
        a = parseInt(hexStr.slice(6, 8), 16) / 255;
      }
      return [r, g, b, a];
    }
  }
}
