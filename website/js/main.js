// globals ---
var scene;
var camera;
var renderer;

var controls;

var camera_theta = 0;
var camera_radius = 50;

var numPoints = 400;
var points;
var camera_theta = 0;

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
  renderer.setClearColor(0x1a1a1a, 1)

  // set up orbit controls
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;

  // start world ---

  var geometry = new THREE.Geometry();

  for (var i = 0; i < 800; i ++) {
    var point = new THREE.Vector3();
    point.x = THREE.Math.randFloatSpread( 800 );
    point.y = THREE.Math.randFloatSpread( 800 );
    point.z = THREE.Math.randFloatSpread( 800 );

    geometry.vertices.push(point)
  }

  var material = new THREE.PointsMaterial( {
    size: 3, //10 tobe visible when making 360 video
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false,
  });

  points = new THREE.Points(geometry, material );
  scene.add(points);

  console.log(points);

  // for(var i=0; i<300; i++) {
  //   var radius = randRange(1,3);
  //   // var m = randRange(0, materials.length-1)
  //   var x = randRange(-500, 500);
  //   var y = randRange(-500, 500);
  //   var z = randRange(-500, 500);

  //   geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    
  //   material = new THREE.MeshPhongMaterial({
  //     color: 0x05BAFF,
  //     wireframe: false
  //   });

  //   // shape = new THREE.Mesh(geometry, materials[m]);
  //   shape = new THREE.Mesh(geometry, material);
  //   shape.position.x = x;
  //   shape.position.y = y;
  //   shape.position.z = -z;
  //   scene.add(shape);

  //   shapes.push(shape);
  // }

  // // light
  // light = new THREE.PointLight( 0xffffff, 1, 0 );
  // light.position.set(0,200,0);
  // scene.add(light);

  // light = new THREE.PointLight( 0xffffff, 1, 0 );
  // light.position.set(100,200,100);
  // scene.add(light);

  // light = new THREE.PointLight( 0xffffff, 1, 0 );
  // light.position.set(-100,-200,-100);
  // scene.add(light);

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
  // update camera position
  // camera_theta += 0.1;
  // camera.position.x = camera_radius * Math.sin( THREE.Math.degToRad( camera_theta ) );
  // camera.position.y = camera_radius * Math.sin( THREE.Math.degToRad( camera_theta ) );
  // camera.position.z = camera_radius * Math.cos( THREE.Math.degToRad( camera_theta ) );
  camera.lookAt(scene.position);

  // for(var i=0; i<shapes.length; i++) {
  //   if(shapes[i].position.x < -700) {
  //     shapes[i].position.x = 700;
  //   }
  //   if(shapes[i].position.y < -700) {
  //     shapes[i].position.y = 700;
  //   }
  //   shapes[i].position.x -= randRange(1,5);
  //   shapes[i].position.y -= randRange(1,5);
  // }

  for(var i=0; i<points.geometry.vertices.length; i++) {
    if(points.geometry.vertices[i].x < -500) {
      points.geometry.vertices[i].x = 500
    }
    points.geometry.vertices[i].x -= 1;
  }
  points.geometry.verticesNeedUpdate = true;

  // ---


  renderer.render(scene, camera);

  requestAnimationFrame(render);
}


// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);

// calls the init function when the window is done loading.
window.onload = init;
