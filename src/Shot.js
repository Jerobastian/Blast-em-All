Shot = function(x, y){
  THREE.Object3D.call(this);

  var geometry= new THREE.CubeGeometry(50, 17.5, 17.5);
  var aspect= new THREE.MeshLambertMaterial({color: 0x25889E});

  this.shot= new THREE.Mesh(geometry, aspect);
  this.shot.position.x= x;
  this.shot.position.y= y;

  var transInicial = { pos : x };
  var transFinal = { pos : x+2000000000000 };
  // Alamacenamos en la variable local   astro   una referencia  al atributo this.elAstro
  var refShot = this.shot;
  this.interpolador = new TWEEN.Tween (transInicial).to(transFinal, 2000000000000)
    .onUpdate (function(){
      // Dentro de esta función podemos acceder a  this.elAstro  gracias a la referencia que hemos almacenado previamente en   astro
      refShot.position.x= transInicial.pos;
    })
    .start();

  this.collision= function(enemies){
    var originPoint = this.shot.position.clone();
    var puntos= 0;

    for (var vertexIndex = 0; vertexIndex < geometry.vertices.length; vertexIndex++)
    {
      var localVertex = geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(this.shot.matrixWorld);
      var directionVector = globalVertex.sub(this.shot.position);
      directionVector.z= 0;
      directionVector= directionVector.clone().normalize();

      //Al ser elementos con movimiento, necesitamos saber la posición exacta de los enemigos.
      //Sino, solo tendríamos una colision en el centro.
      var ray = new THREE.Raycaster(originPoint, directionVector.clone());

      for(var i= 0; i < enemies.length; i++){
        var collisionResults = ray.intersectObject(enemies[i], true);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() * 7){
          enemies[i].position.y= -100000000;
          puntos+= 10;
        }
      }

      return puntos;
    }
  }

  this.add(this.shot);
}

Shot.prototype= Object.create(THREE.Object3D.prototype);

Shot.prototype.constructor= Shot;
