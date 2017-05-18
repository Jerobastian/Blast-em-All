/// Clase fachada, la escena
TheScene = function (renderer) {
  THREE.Scene.call (this);

  //Luz
  var ambientLight= null;
  var spotLight= null;
  //Cámara
  var camera = null;

  var key= new KeyBoard();

  /// Se crea la cámara, es necesario el renderer para interactuar con ella
  /**
   * @param renderer - El renderer que muestra la imagen y al mismo tiempo captura la interacción del usuario
   */
  var createCamera = function (self, renderer) {
    // Se define una cámara en perspectiva, con un ángulo de visión de 45 grados,
    // Un ratio de aspecto según las dimensiones de la ventana
    // Y unos planos de recorte cercano y lejano
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000000000);

    // Dónde se sitúa y hacia donde mira
    camera.position.set (0, 300, 0);
    var look = new THREE.Vector3 (0,0,0);
    camera.lookAt(look);
  }

  /// Se crean las luces y se añaden a la escena
  var createLights = function (self) {
    // Una ambiental
    ambientLight = new THREE.AmbientLight(0xffffff, 5);
    self.add (ambientLight);
  }


  /// Se crea el modelo
  /**
   * @return La raiz de la rama del modelo
   */
  var createSystem = function (self) {

    //Creamos el objeto del jugador
    key= e.keyCode;
    var player= new Player(e.keyCode);

    player.position.set(0, 0, 200);

    self.add(player);
  }

  /// Inicializador
  /**
   * @param renderer - El renderer donde se visualizará la escena
   */
  var init = function (self, renderer) {
    createLights (self);
    createCamera (self, renderer);
    createSystem(self);
  }

  // public

  /// Getter de la cámara
  this.getCamera = function () {
    return camera;
  }

  /// Modifica el ratio de aspecto de la cámara
  /**
   * @param anAspectRatio - El nuevo ratio de aspecto de la cámara
   */
  this.setCameraAspect = function (anAspectRatio) {
    camera.aspect = anAspectRatio;
    camera.updateProjectionMatrix();
  }

  // constructor
  init (this, renderer);
}

TheScene.prototype = Object.create (THREE.Scene.prototype);
TheScene.prototype.constructor = TheScene;
