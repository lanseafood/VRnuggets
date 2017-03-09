// globals
var backgroundSpheres = [];

var scene;
var renderer;
var camera;
var hemisphereLight;
var shadowLight;

var ribosome;
var dna;
var rna;
var scale = 1;
var cas;
var bacteria;
var virus;

var is1pressed = false;
var is2pressed = false;
var is3pressed = false;
var is4pressed = false;
var is5pressed = false;
var is6pressed = false;
var is7pressed = false;
var is8pressed = false;
var is9pressed = false;

// color palette
var colors = {
  white: 0xEAFFFF,
  blue: 0x2588C9,
  red: 0x81180B,
  green: 0x227121
};

// objects
Bacteria = function() {
  this.obj = new THREE.Object3D();
  
  var geometry = new THREE.BoxGeometry(20,20,20);
  var material = new THREE.MeshPhongMaterial({
    color: colors.blue,  
  });

  for(var i=0; i<6; i++) {
    // make a mesh
    var tempMesh = new THREE.Mesh(geometry, material);
    
    tempMesh.position.x = i*5;
    tempMesh.position.y = Math.random() * 10;

    tempMesh.rotation.y = Math.random() * Math.PI * 2;
    tempMesh.rotation.z = Math.random() * Math.PI * 2;

    // allow each cube to cast and receive shadows
    tempMesh.castShadow = true;
    tempMesh.receiveShadow = true;

    // add the cube to the container
    this.obj.add(tempMesh);
  }
}

Virus = function(){
  this.obj = new THREE.Object3D();
  
  var geometry = new THREE.BoxGeometry(3,3,3);
  var material = new THREE.MeshPhongMaterial({
    color: colors.green,  
  });

  for(var i=0; i<3; i++) {
    // make a mesh
    var tempMesh = new THREE.Mesh(geometry, material);
    
    tempMesh.position.x = i*.2;
    tempMesh.position.y = Math.random() * 4;

    tempMesh.rotation.y = Math.random() * Math.PI * 2;
    tempMesh.rotation.z = Math.random() * Math.PI * 2;

    // allow each cube to cast and receive shadows
    tempMesh.castShadow = true;
    tempMesh.receiveShadow = true;

    // add the cube to the container
    this.obj.add(tempMesh);
  }
}

Ribosome = function() {
  // Create an empty container that will hold the different parts of the shape
  
  this.obj = new THREE.Object3D();
  
  var geometry = new THREE.BoxGeometry(10,10,10);
  var material = new THREE.MeshPhongMaterial({
    color: colors.white,  
  });

  // var numBlocks = Math.floor(Math.random() * 3) + 3;
  for(var i=0; i<3; i++) {
    // make a mesh
    var tempMesh = new THREE.Mesh(geometry, material);
    
    tempMesh.position.x = i*5;
    tempMesh.position.y = Math.random() * 10;
    // tempMesh.position.z = Math.random() * 10;

    tempMesh.rotation.y = Math.random() * Math.PI * 2;
    tempMesh.rotation.z = Math.random() * Math.PI * 2;

    // var size = Math.random() * 0.15;
    // tempMesh.scale.set(size, size, size);

    // allow each cube to cast and receive shadows
    tempMesh.castShadow = true;
    tempMesh.receiveShadow = true;

    // add the cube to the container
    this.obj.add(tempMesh);
  }
}

Cas = function() {
  // Create an empty container that will hold the different parts of the shape
  
  this.obj = new THREE.Object3D();
  
  var geometry = new THREE.BoxGeometry(12,12,12);
  var material = new THREE.MeshPhongMaterial({
    color: colors.red,  
  });

  // var numBlocks = Math.floor(Math.random() * 3) + 3;
  for(var i=0; i<9; i++) {
    // make a mesh
    var tempMesh = new THREE.Mesh(geometry, material);
    
    tempMesh.position.x = i*5;
    tempMesh.position.y = Math.random() * 10;
    // tempMesh.position.z = Math.random() * 10;

    tempMesh.rotation.y = Math.random() * Math.PI * 2;
    tempMesh.rotation.z = Math.random() * Math.PI * 2;

    // var size = Math.random() * 0.15;
    // tempMesh.scale.set(size, size, size);

    // allow each cube to cast and receive shadows
    tempMesh.castShadow = true;
    tempMesh.receiveShadow = true;

    // add the cube to the container
    this.obj.add(tempMesh);
  }
}

// helpers

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

var CustomSinCurve = THREE.Curve.create(
  // custom curve constructor
  function (scale) { 
    this.scale = (scale === undefined) ? 1 : scale;
  },

  // getPoint: t is between 0-1
  function (t) {
    var tx = t * 5 - 1.5;
    var ty = Math.sin( 1.5 * Math.PI * t );
    var tz = 0;
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
  }
);

function onDocumentKeyDown(event){ 
  // Get the key code of the pressed key 
  var keyCode = event.which; 
  console.log(keyCode);
  if(keyCode == 49) {
    is1pressed = true;  
  }
  if(keyCode == 50) {
    is2pressed = true;  
  }
  if(keyCode == 51) {
    is3pressed = true;  
  }
  if(keyCode == 52) {
    is4pressed = true;
  }
  if(keyCode == 53) {
    is5pressed = true;
  }
  if(keyCode == 54) {
    is6pressed = true;
  }
  if(keyCode == 55) {
    is7pressed = true;
  }
  if(keyCode == 56) {
    is8pressed = true;
  }
  if(keyCode == 57) {
    is9pressed = true;
  }
}

// main

function init() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  // 1. Create the renderer
  renderer = new THREE.WebGLRenderer({ 
    // Allow transparency to show the gradient background
    // we defined in the CSS
    alpha: true, 

    // Activate the anti-aliasing; this is less performant,
    // but, as our project is low-poly based, it should be fine :)
    antialias: true 
  });

  // Define the size of the renderer; in this case,
  // it will fill the entire screen
  renderer.setSize(WIDTH, HEIGHT);

  // Enable shadow rendering
  renderer.shadowMapEnabled = true;


  // 2. Create the scene
  scene = new THREE.Scene();

  // Add a fog effect to the scene; same color as the
  // background color used in the style sheet
  // scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);


  // 3. Create the camera
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 0.1;
  farPlane = 1000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  // Set the position of the camera
  camera.position.x = 45;
  camera.position.z = 46;
  camera.position.y = 43;
  camera.lookAt(scene.position);
  // var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  // var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;
  // camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  // scene.add(camera);
  // camera.position.set(0,200,400);
  // camera.lookAt(scene.position);

  // 4. add lights
  // A hemisphere light is a gradient colored light; 
  // the first parameter is the sky color, the second parameter is the ground color, 
  // the third parameter is the intensity of the light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

  // A directional light shines from a specific direction. 
  // It acts like the sun, that means that all the rays produced are parallel. 
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);

  // Set the direction of the light  
  shadowLight.position.set(150, 350, 350);
  
  // Allow shadow casting 
  shadowLight.castShadow = true;

  // define the visible area of the projected shadow
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // define the resolution of the shadow; the higher the better, 
  // but also the more expensive and less performant
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;
  
  // to activate the lights, just add them to the scene
  scene.add(hemisphereLight);  
  scene.add(shadowLight);


  // 5. add objects

  // background spheres
  for(var i=0; i<100; i++) {
    var radius = getRandomInt(0.2, 2);
    var sphereGeometry = new THREE.SphereGeometry(radius, 30, 30);

    if(i % 2 == 0) {
      var sphereMaterial = new THREE.MeshPhongMaterial({color: colors.white, transparent: true});
    }
    if(i % 3 == 0) {
      var sphereMaterial = new THREE.MeshPhongMaterial({color: colors.blue, transparent: true});
    }
    if(i % 5 == 0) {
      var sphereMaterial = new THREE.MeshPhongMaterial({color: colors.red, transparent: true});
    }
    if(i % 7 == 0) {
      var sphereMaterial = new THREE.MeshPhongMaterial({color: colors.green, transparent: true});
    }

    sphereMaterial.opacity = 0.9;

    var bgMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    bgMesh.position.x = getRandomInt(-400, 60);
    bgMesh.position.y = getRandomInt(-60, 55);
    bgMesh.position.z = getRandomInt(-400, 80);
    scene.add(bgMesh);

    backgroundSpheres.push(bgMesh);
  }

  bacteria = new Bacteria();
  bacteria.name = 'bacteria';
  bacteria.obj.position.x = -60;
  bacteria.obj.position.y = -30;
  scene.add(bacteria.obj);

  virus = new Virus();
  virus.name = 'virus';
  virus.obj.position.x = 3;
  virus.obj.position.y = 30;

  ribosome = new Ribosome();
  ribosome.name = 'ribosome';
  ribosome.obj.position.x = 30;
  ribosome.obj.position.y = 8;

  var dnaGeometry = new THREE.BoxGeometry(60, 1, 1);
  var ndnaGeometry = new THREE.BoxGeometry(30, 1, 1);
  var dnaMaterial = new THREE.MeshPhongMaterial({
    color: colors.blue,  
  });
  dna = new THREE.Mesh(dnaGeometry, dnaMaterial);
  dna.name = 'dna';
  dna.position.y = 10;
  
  ndna1 = new THREE.Mesh(ndnaGeometry, dnaMaterial);
  ndna1.name = 'ndna1';
  ndna1.position.x = 0;
  ndna1.position.y = 10;

  ndna2 = new THREE.Mesh(ndnaGeometry, dnaMaterial);
  ndna2.name = 'ndna2';
  ndna2.position.x = 30;
  ndna2.position.y = 10;
  

  var path = new CustomSinCurve(1);
  var rnaGeometry = new THREE.TubeGeometry(path, 64, 0.5, 8, false);
  var rnaMaterial = new THREE.MeshNormalMaterial( { color: 0x3D98D4 } );
  rna = new THREE.Mesh(rnaGeometry, rnaMaterial);
  rna.name = 'rna'
  rna.position.x = 30;
  rna.position.y = 5;
  // scene.add(rna);

  cas = new Cas();
  cas.name = 'cas';
  cas.obj.position = -15;
  cas.obj.position.y = -30;
  // scene.add(cas.obj);

  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  document.addEventListener("keydown", onDocumentKeyDown, false); 

  render();
}

function render() {
  // requestAnimationFrame tells the browser to deterine when its best to call render, which visualizes the scene
  requestAnimationFrame(render);
  
  // visualize the scene using the camera
  renderer.render(scene, camera);

  for(var i=0; i<backgroundSpheres.length; i++) {
    backgroundSpheres[i].position.y += 0.2;

    // console.log(backgroundSpheres[i].position.y);

    if(backgroundSpheres[i].position.y > 80) {
      backgroundSpheres[i].position.y = getRandomInt(-400, -80);
    }
  }

  // bacteria floating 
  if(is1pressed) {
    if(bacteria.obj.position.x < -25) {
      bacteria.obj.position.x += 0.2;
    }
  }

  // virus attaches to bacteria
  if(is2pressed) {
    scene.add(virus.obj);
    var y = bacteria.obj.position.y + 20;
    if(virus.obj.position.y > y) {
      virus.obj.position.y -= 0.3;
    }
    
  }

  // virus rna inserted into bacteria
  if(is3pressed) {
    var size = bacteria.obj.scale.x
    if (bacteria.obj.scale.x < 200000) {
      size += 5
      bacteria.obj.scale.set(size);
      virus.obj.scale.set(size);
    }
    
    scene.add(dna);
  }

  // 4. ribosome moves across dna
  if(is4pressed) {
    scene.add(ribosome.obj);
    scene.add(rna);

    if(ribosome.obj.position.x > -25) {
      ribosome.obj.position.x -= 0.2;

      rna.position.x -= 0.2;
      scale += 0.05
      rna.scale.set(scale, 1, 1);
      console.log('4');

    }
  }

  // 5. ribosome falls away
  if(is5pressed) {
    if(ribosome.obj.position.x > -700) {
      ribosome.obj.position.x -= 5;
      ribosome.obj.position.y -= 5;
      dna.position.y -= 1;
      console.log('5');
    }
  }

  // 6. cas attaches to rna
  if(is6pressed) {
    scene.add(cas.obj);
    if(cas.obj.position.x >= -25) {
      cas.obj.position.x -= 0.5;
    }
    if(cas.obj.position.y <= -3.5) {
      cas.obj.position.y += 0.5;
      console.log('6');
    }
    scene.remove(dna);
  }

  if(is7pressed) {
    scene.add(dna);

    cas.obj.position.y +=3;
    console.log('7x: ' + dna.position.x + ', 7y: ' + dna.position.y);

    if(dna.position.y <= 5) {
      console.log('what');
      dna.position.y += 5;
    }
    
  }

  if(is8pressed) {
    // zoom in
    scene.remove(dna);
    scene.add(ndna1);
    scene.add(ndna2);
    // ndna1.position.x = 0;
    // ndna2.position.x = 30;
    ndna1.position.x -= 2;
    ndna1.position.y -= .5;
    ndna2.position.x += 2;
    ndna2.position.y += .5;
  }
  
  if(is9pressed) {
    console.log('9');
  }
}

window.onload = init;

window.addEventListener('resize', handleResize, false);