Background= function(radio, texture){

  THREE.Object3D.call(this);

  var cargador_textura = new THREE.TextureLoader();
 //Se carga la textura pasada por parámetro
 this.textura_cargada = cargador_textura.load(texture);
 //creamos el material
 this.material = new THREE.MeshLambertMaterial({
   color: 0x0f0f0f,
   map: this.textura_cargada
  });
 this.material.side = THREE.BackSide;
 //Crear el objeto tridimensional background
 this.background =new THREE.Mesh(
  //Se crea la esfera
  new THREE.CylinderGeometry(radio, radio, 3000, 3000),
  //Se crea el material del background
  this.material
 );

 var bg= this.background;

 var rotacionInicial = { angulo : 0 };
 var rotacionFinal = { angulo : 2 * Math.PI };

 this.interpolador = new TWEEN.Tween (rotacionInicial).to(rotacionFinal, 50000)
   .onUpdate (function(){
     // Dentro de esta función podemos acceder a  this.elAstro  gracias a la referencia que hemos almacenado previamente en   astro
     bg.rotation.y = rotacionInicial.angulo;
   })
   .repeat (Infinity)
   .start();

 //Se añade el background
 this.add(this.background);
}
Background.prototype = Object.create (THREE.Object3D.prototype);

//Definición del constructor de la clase
Background.prototype.constructor = Background;
Background.prototype.getbackground = function(){
 return this.background;

}
