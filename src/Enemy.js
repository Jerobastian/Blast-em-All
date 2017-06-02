Enemy = function(){
  THREE.Object3D.call(this);

  var geometry= new THREE.SphereGeometry(250, 100, 100);
  var aspect= new THREE.MeshLambertMaterial({color: 0xDB0000});

  this.enemy= new THREE.Mesh(geometry, aspect);
  this.enemy.position.x= 4000
  this.enemy.position.y= Math.floor(Math.random() * (1000 - (-1000))) + (-1000);

  var transInicial = { pos : 4000 };
  var transFinal = { pos : -40000 };
  // Alamacenamos en la variable local   astro   una referencia  al atributo this.elAstro
  var refEnemy = this.enemy;
  this.interpolador = new TWEEN.Tween (transInicial).to(transFinal, 100000)
    .onUpdate (function(){
      // Dentro de esta función podemos acceder a  this.elAstro  gracias a la referencia que hemos almacenado previamente en   astro
      refEnemy.position.x= transInicial.pos;
    })
    .start();

  this.add(this.enemy);

  this.collision = function(playerShots){
    var originPoint = this.enemy.position.clone();

    for (var vertexIndex = 0; vertexIndex < geometry.vertices.length; vertexIndex++)
    {
      var localVertex = geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(this.enemy.matrixWorld);
      var directionVector = globalVertex.sub(this.enemy.position);

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var collisionResults = ray.intersectObjects(playerShots);
      if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
        return true;
      else {
        return false;
      }
    }
  };

  this.getMesh = function(){
    return this.enemy;
  }
}

Enemy.prototype= Object.create(THREE.Object3D.prototype);

Enemy.prototype.constructor= Enemy;
