const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = -100;
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1);
document.body.insertBefore(renderer.domElement, document.body.childNodes[2]);
renderer.domElement.setAttribute("z-index", 1000);
renderer.domElement.setAttribute("style", "position:absolute");

var start = Date.now();

window.addEventListener( 'load', function() {
    render();
});

/*var material = new THREE.ShaderMaterial( {
    uniforms: {
        tExplosion: {
          type: "t",
          value: THREE.ImageUtils.loadTexture( 'explosion.png' )
        },
        time: {
          type: "f",
          value: 0.0
        }
      },
     // vertexShader: document.getElementById( 'vertexShader' ).textContent,
   //   fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    
    } );*/

    var material = new THREE.MeshPhongMaterial({
        color: 0xFF0000,    // red (can also use a CSS color string here)
        flatShading: true,
      });

  // create a sphere and assign the material
  mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry( 20, 4 ),
    material
  );
  mesh.position.z = -100

var groups = [];
var spheres = [];
var scales = [];
var velocities = [];

camera.position.z = 10;
var posMod =  Math.random()*3;
/*const addParticleUnit = function(){
    var group = new THREE.Group();

    var posMod =  Math.random()*4-2;;

    group.position.x = posMod;
    group.position.y = posMod*(1-Math.abs(group.position.x/2));
    group.position.z = 0;

    for(var i = 0; i<20; i++){
        var size = 0.05;
        const geometry = new THREE.SphereGeometry( size, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        material.transparent = true;
        const sphere = new THREE.Mesh( geometry, material );
        var scale = Math.random();
        sphere.scale = new THREE.Vector3(scale,scale,scale);
        group.add(sphere);

        var mod = Math.random()*4*(Math.abs(posMod));
        sphere.position.x = Math.random()*mod-mod/2;
        sphere.position.y = Math.random()*mod-mod/2;
        sphere.position.z = Math.random()*mod-mod/2;
        spheres.push(sphere);
        var scaling = Math.round(Math.random());
        
        if(scaling === 1){
            scales.push(true);
        }
        else{
            scales.push(false);
        }
    }
    scene.add(group);
    groups.push(group);

    
    //console.log( group.position)
};*/
var group = new THREE.Group();
for(var i = 0; i<500; i++){
    var size = 0.02;
    const geometry = new THREE.SphereGeometry( size, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    material.transparent = true;
    const sphere = new THREE.Mesh( geometry, material );
    var scale = Math.random();
    sphere.scale = new THREE.Vector3(scale,scale,scale);
    group.add(sphere);

    var mod = Math.random()*4*(Math.abs(posMod));
    sphere.position.x = Math.random()*mod-mod/2;
    sphere.position.y = Math.random()*mod-mod/2;
    sphere.position.z = Math.random()*mod-mod/2;
    
    velocities.push(Math.random()*0.06+0.01);

    spheres.push(sphere);
    console.log("sphere");
    var scaling = Math.random()*10;
    if(scaling >5){
        scales.push(true);
        console.log(true);
    }
    else{
        scales.push(false);
    }
}
scene.add(group);
function render() {

    
    /*for(var i = 0; i < groups.length; i++){
        groups[i].rotation.x += 0.05;
    };*/
    group.rotation.y+=0.01;
    for(var i = 0; i < spheres.length; i++){
        spheres[i].updateMatrixWorld();
        spheres[i].position.y += velocities[i];
        spheres[i].position.z += velocities[i]*(Math.random()*0.4-0.2);
        spheres[i].position.x += velocities[i]*(Math.random()*0.4-0.2);
        
        if(spheres[i].position.y > 10){
            spheres[i].position.y = -10;
        }
        var worldMatrix = spheres[i].matrixWorld;
        var worldPos  = new THREE.Vector3().setFromMatrixPosition(worldMatrix);

        var alpha = worldPos.distanceTo(camera.position)/2;
        //4.5 - 6.5
        spheres[i].material.opacity = 1-(alpha-4.5)/1.5;
    };
    renderer.render( scene, camera );
    requestAnimationFrame( render );

}


const animate = function(){
    requestAnimationFrame( animate );
    for(var i = 0; i < groups.length; i++){
        groups[i].rotation.x += 0.03;
    };
    for(var i = 0; i < spheres.length; i++){
        spheres[i].updateMatrixWorld();
        var worldMatrix = spheres[i].matrixWorld;
        var worldPos  = new THREE.Vector3().setFromMatrixPosition(worldMatrix);

        var currScale = spheres[i].scale;
        
        if(currScale.x > 1.5){
            scales[i] = true;
        }
        else if(currScale.x < 0.1){
            scales[i] = false;
        }

        if(scales[i] == false){
            spheres[i].scale = currScale.multiplyScalar(Math.random()*0.05+1);
        }
        else{
            spheres[i].scale = currScale.multiplyScalar(1-Math.random()*0.05);
        }

        
        if(i===0){
        //console.log(spheres[i].scale)
        }
        var alpha = worldPos.distanceTo(camera.position)/2;
        //4.5 - 6.5
        spheres[i].material.opacity = 1-(alpha-4.5)/1.5+((Math.random()*0.1)-0.05);

        //console.log(spheres[i].material.opacity);
    };

    
    
    renderer.render( scene, camera );
};

animate();

const fn = function(){
    addParticleUnit();
}

//document.body.addEventListener('click', fn, true); 