import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import WebGL from 'three/addons/capabilities/WebGL.js';

/** @type {HTMLDivElement | null}*/
const infoBox = document.querySelector("#info-message");

/** @type {THREE.Scene} */
const scene = new THREE.Scene();
/** @type {THREE.PerspectiveCamera} */
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// check that webgl is supported
if (!WebGL.isWebGL2Available()) {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.querySelector('#error-message')?.appendChild(warning);
}
/** @type {THREE.WebGLRenderer} */
const renderer = new THREE.WebGLRenderer();

// models
let cube;
let glontzu;

// lights
/** @type {THREE.DirectionalLight} */
export const directionalLight = new THREE.DirectionalLight(0xd67d3e, 0.1);

// timing with clock (for delta time)
const clock = new THREE.Clock(true);

initiateScene();

function initiateScene() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.set(0, 1, 3);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.update();

  setLights();
  loadGlontzu();

  renderer.setAnimationLoop(animate);
}

function addCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
  cube.position.z = -1;
}

function loadGlontzu() {
  glontzu;
  const loader = new FBXLoader();

  loader.load("glontzu5.fbx", (object) => {
    glontzu = object;
    glontzu.scale.x = 0.01;
    glontzu.scale.y = 0.01;
    glontzu.scale.z = 0.01;
    scene.add(glontzu);
  },
    (xhr) => {
      if (!infoBox) throw new Error("No infobox found");
      const percentageLoaded = (xhr.loaded / xhr.total) * 100;
      infoBox.innerText = percentageLoaded + '% loaded';
      if (percentageLoaded == 100) {
        infoBox.innerText = "";
      }
    },
    (error) => {
      console.error(error);
    })
}

function setLights() {
  /** @type {THREE.AmbientLight} */
  const ambientLigth = new THREE.AmbientLight(0x303030, 0.1);
  scene.add(ambientLigth);

  directionalLight.position.set(0.8, 3, 1.0)
  scene.add(directionalLight);

  const bottomLight = new THREE.DirectionalLight(0xff3030, 0.5);
  bottomLight.position.set(0, -5, 0.2)
  scene.add(bottomLight);
}

// render the scene
function animate() {
  if (glontzu) {
    glontzu.rotation.y += 0.5 * clock.getDelta();
  }
  renderer.render(scene, camera);
}

// if the size of the windows changes, resize the scene
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
