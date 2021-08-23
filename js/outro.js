var navAlpha5 = 0;
var id = 0;

/*let loader = new THREE.GLTFLoader();
    loader.load('3d/glow.glb', function(gltf){

    glow = gltf.scene.children[0];

    scene4.add(gltf.scene.children[0]);
});*/


function updateScene4(){
  /*if(navIn4 && navAlpha4<1){
    navAlpha4+=0.01;

    document.getElementById("indexBar3").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+((0.5-navAlpha4*0.5))+"); background-color: rgba(255,255,255,1);");
    document.getElementById("indexText3").setAttribute("style", "color: rgba(255,255,255,"+(1-(navAlpha4*0.7))+")");
    document.getElementById("indexText4").setAttribute("style", "color: rgba(255,255,255,"+navAlpha4+")");
    document.getElementById("indexBar4").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+navAlpha4/2+"); background-color: rgba(255,255,255,"+navAlpha4+");");
  }*/

  //composer.render();
    composer.render();
    //scene4.children[0].children[0].children[0].position.y+=0.01;
};
