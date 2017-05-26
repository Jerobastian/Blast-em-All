Player = function(){
  THREE.Object3D.call (this);

  var geometry= new THREE.CubeGeometry(25, 10, 10);
  var aspect= new THREE.MeshLambertMaterial({color: 0x25889E});

  this.player= new THREE.Mesh(geometry, aspect);

  this.colision=function(otro){
    if (this.position.x + 12.5 < otro.x) {
        return false;
    }
    if (this.y + this.alto < otro.y) {
        return false;
    }
    if (this.x > otro.x + otro.ancho) {
        return false;
    }
    if (this.y > otro.y + otro.alto) {
        return false;
    }
        return true;
  };
  this.setPosition= function(x, y){
    this.position.x= x;
    this.position.y= y;
  };
  this.add(this.player);
}

Player.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Player.prototype.constructor = Player;
