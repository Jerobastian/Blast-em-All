Player = function(){
  THREE.Object3D.call (this);

  var geometry= new THREE.CubeGeometry(250, 100, 100);
  var aspect= new THREE.MeshLambertMaterial({color: 0x25889E});

  this.player= new THREE.Mesh(geometry, aspect);

  this.collision=function(enemies){
    var originPoint = this.player.position.clone();
    var colision= false;

    for (var vertexIndex = 0; vertexIndex < geometry.vertices.length; vertexIndex++)
    {
      var localVertex = geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(this.player.matrixWorld);
      var directionVector = globalVertex.sub(this.player.position);
      directionVector.z= 0;
      directionVector= directionVector.clone().normalize();

      //Al ser elementos con movimiento, necesitamos saber la posición exacta de los enemigos.
      //Sino, solo tendríamos una colision en el centro.
      var ray = new THREE.Raycaster(originPoint, directionVector.clone());
      var collisionResults = ray.intersectObjects(enemies, true);
      if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() * 2)
        colision= true;
      else {
        colision= false;
      }

      return colision;
    }
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
