Player = function(){
  THREE.Object3D.call (this);

  var geometry= new THREE.CubeGeometry(10, 10, 25);
  var aspect= new THREE.MeshLambertMaterial({color: 0x25889E});

  this.add(new THREE.Mesh(geometry, aspect));
}

Player.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Player.prototype.constructor = Player;
