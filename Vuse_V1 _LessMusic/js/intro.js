var spheres = [];
var scales = [];
var velocities = [];

var posMod =  Math.random()*0.5+2;
var intro = new THREE.Group();

var introscreen = document.getElementById("intro1");
var introscreen2 = document.getElementById("intro2");
var introform = document.getElementById("form1");

var count = 0;
/*
for(var i = 0; i<500; i++){
    var size = 0.02;
    const geometry = new THREE.SphereGeometry( size, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    material.transparent = true;
    const sphere = new THREE.Mesh( geometry, material );
    var scale = Math.random();
    sphere.scale = new THREE.Vector3(scale,scale,scale);
    intro.add(sphere);

    var mod = Math.random()*4*(Math.abs(posMod));
    sphere.position.x = Math.random()*mod-mod/2;
    sphere.position.y = Math.random()*20-10;
    sphere.position.z = Math.random()*mod-mod/2;
    
    velocities.push(Math.random()*0.06+0.01);

    spheres.push(sphere);
    var scaling = Math.random()*10;
    if(scaling >5){
        scales.push(true);
    }
    else{
        scales.push(false);
    }
}*/

introscreen.classList.remove("invisible");
introscreen.classList.add("visible");
introscreen.classList.add("fadeIn");

document.getElementById("continueIntro").addEventListener("click", function(){
    playAll();
    introscreen.classList.add("fadeOut");
    document.getElementById("exit").classList.add("fadeOut");
    document.getElementById("exit").href = "";
    introscreen.classList.remove("visible");
    introscreen.classList.remove("fadeIn");
    setTimeout(function() {
        document.getElementById("hint1").classList.add("visible");
        introscreen.classList.add("invisible");
        document.getElementById("exit").classList.add("invisible");
        //introscreen.setAttribute("style", "visibility:hidden");
        introscreen2.classList.remove("invisible");
        introscreen2.classList.add("visible");
        introscreen2.classList.add("fadeIn");
        document.getElementById("hint1").classList.remove("invisible");
        document.getElementById("hint1").classList.add("fadeIn");
        setTimeout(function(){
            document.getElementById("hint1").classList.add("visible");
        },1000)
    },1000);
});
/*document.getElementById("continueIntro2").addEventListener("click", function(){
    introscreen2.classList.add("fadeOut");
    introscreen2.classList.remove("visible");
    introscreen2.classList.remove("fadeIn");
    setTimeout(function() {
        introscreen2.classList.add("invisible");
        //introscreen.setAttribute("style", "visibility:hidden");
        introform.classList.remove("invisible");
        introform.classList.add("visible");
        introform.classList.add("fadeIn");
    },1000);
});*/

document.getElementById("house").addEventListener("click", function(){
    genre = 0;
    closeIntro();
});
document.getElementById("dnb").addEventListener("click", function(){
    genre = 1;
    closeIntro();
});
document.getElementById("hiphop").addEventListener("click", function(){
    genre = 2;
    closeIntro();
});

function closeIntro(){
    document.getElementById("hint1").classList.remove("visible");
    document.getElementById("hint1").classList.remove("fadeIn");
    document.getElementById("hint1").classList.add("fadeOut");
    introscreen2.classList.add("fadeOut");
    introscreen2.classList.remove("visible");
    introscreen2.classList.remove("fadeIn");
    setTimeout(function() {
        document.getElementById("hint1").classList.add("invisible");
        introscreen2.classList.add("invisible");
        introform.classList.remove("invisible");
        introform.classList.add("visible");
        introform.classList.add("fadeIn");
    },1000);
}


var size = 0.04;
const geometry = new THREE.SphereGeometry( size, 32, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
const sphere = new THREE.Mesh( geometry, material )

function updateIntro(){
    if(count<150){
        var sphereCopy = sphere.clone();
        var scale = Math.random();
        sphereCopy.scale = new THREE.Vector3(scale,scale,scale);
        
        intro.add(sphereCopy);
    
        var mod = Math.random()*4*(Math.abs(posMod));
        sphereCopy.position.x = Math.random()*mod-mod/2;
        sphereCopy.position.y = /*Math.random()*20*/-10/*+Math.random()/*0.5)*/;
        sphereCopy.position.z = Math.random()*mod-mod/2;
        
        velocities.push(Math.random()*0.06+0.01);
    
        spheres.push(sphereCopy);
        var scaling = Math.random()*10;
        if(scaling >5){
            scales.push(true);
        }
        else{
            scales.push(false);
        }
    count++;
    }


    intro.rotation.y+=0.01;
    for(var i = 0; i < spheres.length; i++){
        spheres[i].updateMatrixWorld();
        var currScale = spheres[i].scale;

        spheres[i].position.y += velocities[i];
        spheres[i].position.z += velocities[i]*(Math.random()*0.4-0.2);
        spheres[i].position.x += velocities[i]*(Math.random()*0.4-0.2);

        if(i === 0){
        }
        
        if(spheres[i].position.y > 10){
            spheres[i].position.y = -10;
        }
        
        if(currScale.x > Math.random()*0.4+.7){
            scales[i] = true;
        }
        else if(currScale.x < Math.random()*0.2+0.2){
            scales[i] = false;
        }

        if(scales[i] == false){
            spheres[i].scale = currScale.multiplyScalar(Math.random()*0.1+1);
        }
        else{
            spheres[i].scale = currScale.multiplyScalar(1-Math.random()*0.1);
        }
    };
}