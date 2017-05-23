Player = function(){
  THREE.Object3D.call (this);

  var geometry= new THREE.CubeGeometry(25, 10, 10);
  var aspect= new THREE.MeshLambertMaterial({color: 0x25889E});

  this.player= new THREE.Mesh(geometry, aspect);

  this.add(this.player);
}

Player.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Player.prototype.constructor = Player;
