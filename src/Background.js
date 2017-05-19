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
  new THREE.SphereGeometry(radio,150,150),
  //Se crea el material del background
  this.material
 );


 //Situar la figura en una posicion concreta
 //this.background.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (px,py,pz));


 //Se añade el background
 this.add(this.background);
}
Background.prototype = Object.create (THREE.Object3D.prototype);

//Definición del constructor de la clase
Background.prototype.constructor = Background;
Background.prototype.getbackground = function(){
 return this.background;

}
