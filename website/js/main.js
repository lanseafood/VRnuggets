// globals ---
var scene;
var camera;
var renderer;

var controls;

var camera_theta = 0;
var camera_radius = 50;

var particleGroup;
var clock = new THREE.Clock();


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
  camera.lookAt( scene.position );

  // create a renderer, sets the background color and the size
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x1a1a1a, 1)

  // set up orbit controls
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;

  // start world ---

  particleGroup = new SPE.Group({
    texture: {
      value: THREE.ImageUtils.loadTexture('./img/smokeparticle.png')
    }
  });

  var colors = [
    new THREE.Color(0x05BAFF),
    new THREE.Color(0xFF2C00),
  ]

  for(var i=1; i<200; i++) {
    var colorIndex = randRange(0, colors.length-1)
    var color = colors[colorIndex];

    var emitter = new SPE.Emitter({
      maxAge: {
        value: randRange(1,3)
      },
      position: {
        value: new THREE.Vector3(randRange(-200, 200), randRange(-200, 200), randRange(-200, 200)),
        radius: randRange(1, 10),
        spread: new THREE.Vector3( 3, 3, 3 )
      },
      velocity: {
        value: new THREE.Vector3(3, 3, 3),
        distribution: SPE.distributions.SPHERE
      },
      color: {
        value: [ new THREE.Color('white'), color ]
      },
      size: {
        value: 1
      },
      particleCount: 250
    });

    particleGroup.addEmitter(emitter);
  }

  scene.add(particleGroup.mesh);

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

// Create particle group and emitter

function render() {
  // update camera position
  camera_theta += 0.1;
  camera.position.x = camera_radius * Math.sin( THREE.Math.degToRad( camera_theta ) );
  camera.position.y = camera_radius * Math.sin( THREE.Math.degToRad( camera_theta ) );
  camera.position.z = camera_radius * Math.cos( THREE.Math.degToRad( camera_theta ) );
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

  particleGroup.tick(clock.getDelta());

  // ---


  renderer.render(scene, camera);

  requestAnimationFrame(render);
}


// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);

// calls the init function when the window is done loading.
window.onload = init;
