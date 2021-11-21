import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const canva = document.getElementById("bg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight , 0.1,2000);
const loader = new GLTFLoader();
let today = new Date();
let time = today.getHours();
console.log(time);
(function(){
  var script=document.createElement('script');
  script.onload=function(){
    var stats=new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop(){
      stats.update();requestAnimationFrame(loop)}
      );
    };script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()


 
    

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), antialias: true ,alpha: true
});

renderer.setSize(1500, 500 );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor( 0x000000, 0 );

camera.position.set(-29.997763933060007,13.779771949207634,51.11116445990841 );


const object = []  ;
loader.load( 'SAPINS.glb', function ( gltf ) {
  gltf.scene.scale.set(6,6,6)
  gltf.scene.translateX(-150)
  gltf.scene.translateZ(-16)
  object.push(gltf.scene) ;
  let modell =  gltf.scene;
 
  
	scene.add( modell );




}, undefined, function ( error ) {

	console.error( error );

} );

const snows=[];
function addSnow(){
  const geometry = new THREE.SphereGeometry(0.10,10,10);
  const material = new THREE.MeshStandardMaterial({ color:0xffffff })
  const snow = new THREE.Mesh( geometry, material);
  const [x, y, z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread(130));

snow.position.set(x, y, z);
snows.push(snow)
scene.add(snow);
}


console.log(object)
if(time > 6 &&  time < 9 ){
  canva.classList.remove("day");
canva.classList.add("rise-set");
const pointLight = new THREE.PointLight(0xff2d2d)
pointLight.position.set(120,45,53)
pointLight.intensity = 1;
const ambientLight = new THREE.AmbientLight(0xff5d5d);
scene.add(pointLight, ambientLight)
Array(2000).fill().forEach(addSnow);
}
if(time >= 9 && time < 17)
{
  canva.classList.remove("rise-set");
  canva.classList.add("day");

  const pointLight = new THREE.PointLight(0xfffbcf)
  pointLight.position.set(120,45,53)
  pointLight.intensity = 1;
  const ambientLight = new THREE.AmbientLight(0xfffbcf);
  scene.add(pointLight, ambientLight)
  

  }
if (time >= 17 && time < 18)
{
canva.classList.remove("day");
canva.classList.add("rise-set");
const pointLight = new THREE.PointLight(0xff2d2d)
pointLight.position.set(120,45,53)
pointLight.intensity = 1;
const ambientLight = new THREE.AmbientLight(0xff5d5d);
scene.add(pointLight, ambientLight)
Array(2000).fill().forEach(addSnow);
}
if(time >= 18){
  canva.classList.remove("rise-set");
  canva.classList.add("night");
  const pointLight = new THREE.PointLight(0xbec2ff)
  pointLight.position.set(120,45,53)
  pointLight.intensity = -2;
  const ambientLight = new THREE.AmbientLight(0xbec2ff);
  scene.add(pointLight, ambientLight)
  Array(2000).fill().forEach(addSnow);
}
if(time >= 0 && time < 9){
  
}
//const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper)

const controls = new OrbitControls(camera,renderer.domElement);

controls.autoRotate = true;






const spaceTexture = new THREE.TextureLoader().load('space.jpg');



function animate() {
  requestAnimationFrame(animate);
  snows.forEach(snow => (snow.position.y > -50) ? snow.position.y -=0.2   : snow.position.y = Math.random() * 100
    );
   
   // console.log(camera.position);
    camera.rotateOnAxis( 5 );
  
  controls.update();

  renderer.render(scene,camera);
}
animate()

