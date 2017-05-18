renderer = null;
scene = null;
GUIcontrols = null;
stats = null;

/// Función que se llama para dibujar cada frame
function render() {
  // La propia función se encola a sí misma para el siguiente render
  requestAnimationFrame(render);

  // Se dibuja la escena
  renderer.render(scene, scene.getCamera());

  // Si se tienen animaciones con TWEEN hay que actualizarlas
  TWEEN.update();
}

/// Se construye el renderer basado en WebGL
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

/// Función encargada de procesar un cambio de tamaño de la ventana
function onWindowResize () {
  // Se actualiza la cámara
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  // Y también el renderer
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// El main
$(function () {

  // Se crea el renderer
  renderer = createRenderer();

  // Se añade la salida del renderer a su elemento html
  $("#WebGL-output").append(renderer.domElement);

  window.addEventListener ("resize", onWindowResize);

  // Se crea la escena
  scene = new TheScene (renderer.domElement);

  // El primer render
  render();
});
