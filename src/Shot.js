Shot = function(x, y){
  THREE.Object3D.call(this);

  var geometry= new THREE.CubeGeometry(50, 17.5, 17.5);
  var aspect= new THREE.MeshLambertMaterial({color: 0x25889E});

  this.shot= new THREE.Mesh(geometry, aspect);
  this.shot.position.x= x;
  this.shot.position.y= y;

  var transInicial = { pos : x };
  var transFinal = { pos : x+10000000000000 };
  // Alamacenamos en la variable local   astro   una referencia  al atributo this.elAstro
  var refShot = this.shot;
  this.interpolador = new TWEEN.Tween (transInicial).to(transFinal, 2000000000000)
    .onUpdate (function(){
      // Dentro de esta función podemos acceder a  this.elAstro  gracias a la referencia que hemos almacenado previamente en   astro
      refShot.position.x= transInicial.pos;
    })
    .start();
    
  this.getMesh= function(){
    return this.shot;
  }

  this.add(this.shot);
}

Shot.prototype= Object.create(THREE.Object3D.prototype);

Shot.prototype.constructor= Shot;
