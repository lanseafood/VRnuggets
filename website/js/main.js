// globals ---
var scene;
var camera;
var renderer;

var controls;

var camera_theta = 0;
var camera_radius = 50;

var shapes = [];
var count = 0;

// functions
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function randRange(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function init() {
  // create a scene, that will hold all the elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create a camera, which defines where you're looking at.
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1; // needs to be >0 for orbit controls to work

  // create a renderer, sets the background color and the size
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x222D34, 1)

  // set up orbit controls
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;

  // start world ---

  colors = {
    blue: 0x4285F4,
    red: 0xEA4335,
    yellow: 0xFBBC05,
    green: 0x34A853
  }

  blue_material = new THREE.MeshBasicMaterial({
    color: colors.blue,
    wireframe: false
  });

  red_material = new THREE.MeshBasicMaterial({
    color: colors.red,
    wireframe: false
  });

  yellow_material = new THREE.MeshBasicMaterial({
    color: colors.yellow,
    wireframe: false
  });

  green_material = new THREE.MeshBasicMaterial({
    color: colors.green,
    wireframe: false
  });

  materials = [blue_material, red_material, yellow_material, green_material];

  for(var i=0; i<300; i++) {
    var radius = randRange(5, 15);
    var m = randRange(0, materials.length)
    var x = randRange(-500, 500);
    var y = randRange(-500, 500);
    var z = randRange(-500, 500);

    geometry = new THREE.SphereGeometry(radius, 32, 32);
    shape = new THREE.Mesh(geometry, materials[m]);
    shape.position.x = x;
    shape.position.y = y;
    shape.position.z = -z;
    scene.add(shape);

    shapes.push({shape: shape, radius: radius});
  }
  
  // light
  var light = new THREE.AmbientLight( 0x404040 ); 
  scene.add(light);

  // end world ---

  // add the output of the renderer to the html element
  // document.body.appendChild(renderer.domElement);
  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);
  
  // call the render function, after the first render, interval is determined
  // by requestAnimationFrame
  render();
}


function render() {
  count += 1;

  if(count % 35 == 0) {
    for(var i=0; i<shapes.length; i++) {
      var shape = shapes[i].shape;
      var radius = shapes[i].radius;

      var current_radius = shape.geometry.parameters.radius;
      shape.scale.x = 1.1;
      shape.scale.y = 1.1;
      shape.scale.z = 1.1;
    }
  }
  else {
    for(var i=0; i<shapes.length; i++) {
      var shape = shapes[i].shape;
      var radius = shapes[i].radius;

      var current_radius = shape.geometry.parameters.radius;
      shape.scale.x -= 0.01
      shape.scale.y -= 0.01
      shape.scale.z -= 0.01
    }
  }

  // update camera position
  camera_theta += 0.1;
  camera.position.x = camera_radius * Math.sin( THREE.Math.degToRad( camera_theta ) );
  camera.position.y = camera_radius * Math.sin( THREE.Math.degToRad( camera_theta ) );
  camera.position.z = camera_radius * Math.cos( THREE.Math.degToRad( camera_theta ) );
  camera.lookAt(scene.position);

  // ---
  
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}


// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);

// calls the init function when the window is done loading.
window.onload = init;
