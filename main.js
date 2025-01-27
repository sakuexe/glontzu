import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import WebGL from 'three/addons/capabilities/WebGL.js';

/** @type {HTMLDivElement | null}*/
const infoBox = document.querySelector("#info-message");

/** @type {THREE.Scene} */
let scene;
/** @type {THREE.Camera} */
export let camera;
let renderer;
let cube;
let glontzu;
/** @type {THREE.DirectionalLight} */
export let directionalLight;

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here
  initiate();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.querySelector('#error-message')?.appendChild(warning);
}

function initiate() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.z = 5;
  camera.position.y = 1;

  addLights();
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
      infoBox.innerText =  percentageLoaded + '% loaded';
      if (percentageLoaded == 100) {
        infoBox.innerText = "";
      }
    },
    (error) => {
      console.error(error);
    })
}

function addLights() {
  const ambientLigth = new THREE.AmbientLight(0x303030, 0.1);
  scene.add(ambientLigth);
  directionalLight = new THREE.DirectionalLight(0xd67d3e, 1);
  directionalLight.position.set(0.8, 3, 1.0)
  scene.add(directionalLight);
}

// render the scene
function animate() {
  if (glontzu) {
    glontzu.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
