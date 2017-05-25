/// Clase fachada, la escena
TheScene = function (renderer) {
  THREE.Scene.call (this);

  //Luz
  var ambientLight= null;
  var spotLight= null;
  //Cámara
  var camera = null;

  var trackballControls = null;
  var player = null;

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
    camera.position.set (0, 0, 300);
    var look = new THREE.Vector3 (0,0,0);
    camera.lookAt(look);

    //ELIMINAR DESPUES
    trackballControls = new THREE.TrackballControls (camera, renderer);
    trackballControls.rotateSpeed = 5;
    trackballControls.zoomSpeed = -2;
    trackballControls.panSpeed = 0.5;
    trackballControls.target = look;
  }

  /// Se crean las luces y se añaden a la escena
  var createLights = function (self) {
    // Una ambiental
    ambientLight = new THREE.AmbientLight(0xffffff, 5);
    self.add (ambientLight);
  }

  this.actionController= function(action){
    switch(action){
      case 'a':
        player.position.x-= 5;
        break;
      case 'd':
        player.position.x+= 5;
        break;
      case 's':
        player.position.y-= 5;
        break;
      case 'w':
        player.position.y+= 5;
        break;
      case ' ':
        var shot= new Shot(player.position.x, player.position.y);
        this.add(shot);
        break;
    }
  }


  /// Se crea el modelo
  /**
   * @return La raiz de la rama del modelo
   */
  var createSystem = function (self) {

    //Creamos el objeto del jugador
    player= new Player();
    player.position.x= -200;

    var bg= new Background(500, 'estrellas.jpg');

    self.add(bg);
    self.add(player);
  }

  this.createEnemies= function(self) {
    var enemy= new Enemy();
    self.add(enemy);
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

  //ELIMINAR DESPUES
  this.getCameraControls = function () {
    return trackballControls;
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
