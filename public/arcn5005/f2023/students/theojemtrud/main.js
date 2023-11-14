const scene = new THREE.Scene();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspect = size.width / size.height;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: threeCanvas,
  alpha: true,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//Creates grids and axes in the scene
//const grid = new THREE.GridHelper(50, 30);
//scene.add(grid);

//const axes = new THREE.AxesHelper();
//axes.material.depthTest = false;
//axes.renderOrder = 1;
//scene.add(axes);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const yellowMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const blueMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const greenMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

const yellowCube = new THREE.Mesh(geometry, yellowMaterial);
const blueCube = new THREE.Mesh(geometry, blueMaterial);
const greenCube = new THREE.Mesh(geometry, greenMaterial);

yellowCube.position.z = -3;
blueCube.position.x = -3;
greenCube.position.z = 3;

scene.add(yellowCube);
scene.add(blueCube);
scene.add(greenCube);


//const loader = new THREE.GLTFLoader();

//let mesh;

//loader.load(
 // "./arcn5005/f2023/students/theojemtrud/Model/cupcake.glb",
  //function (gltf) {
    //gltf.scene.scale.x = 3;
    //gltf.scene.scale.y = 3;
    //gltf.scene.scale.z = 3;

    //mesh = gltf.scene;
    //scene.add(gltf.scene);
 // },
  //undefined,
  //function (error) {
    //console.error(error);
  //}
//);

const GLTFLoader = new THREE.GLTFLoader();

let mesh;

function loadGLB(path,scale,x,z){
  GLTFLoader.load(
    path,
    function (gltf) {
      mesh = gltf.scene;
      mesh.scale.x = scale;
      mesh.scale.y = scale;
      mesh.scale.z = scale;
        mesh.position.x = x
        mesh.position.z = z
      scene.add(mesh);
    },
      undefined,
      function (error) {
        console.error(error);
      }

  );
}

loadGLB("./Model/cupcake.glb", 1, 0, 0);

camera.position.z = 6;
camera.position.x = 4;
camera.position.y = 6;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//Creates the lights of the scene
const lightColor = 0xffffff;

const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(lightColor, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.target.position.set(0, 3, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

function animate() {
  requestAnimationFrame(animate);

  if (mesh) mesh.rotation.y += 0.005;

  yellowCube.rotation.x += 0.001;
  yellowCube.rotation.y += 0.001;

  blueCube.rotation.x += 0.001;
  blueCube.rotation.y -= 0.001;

  greenCube.rotation.x += 0.001;
  greenCube.rotation.y -= 0.001;

  renderer.render(scene, camera);
}

animate();

const loader = new THREE.TextureLoader();

  const texture = loader.load(
    'sky.jpg',
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      scene.background = texture;

    });

//Adjust the viewport to the size of the browser
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});
