//var scene4 = new THREE.Group();
// scene4.position.z = -5;


var navAlpha4 = 0;
var id = 0;

/*let loader = new THREE.GLTFLoader();
    loader.load('3d/glow.glb', function(gltf){

    glow = gltf.scene.children[0];

    scene4.add(gltf.scene.children[0]);
});*/


var idString = "";
var idTally = 0;

var AudioIndex4 = -1;
var prevAudioIndex4 = -1;

let composer;
let godraysEffect;
let effectPass;
var glow;
let directionalLight;

var id1mod1 = 0;
var id1mod2 = 0;
var id1mod3 = 13;

function init() {
    /*let directionalLight = new THREE.DirectionalLight(0xffccaa,3);
    directionalLight.position.set(0,0,-1);
    scene4.add(directionalLight);*/

    /*var t = mesh.clone();
    t.position.z = - 51;

    t.scale.setX(.7);
    t.scale.setY(.7);
    t.scale.setZ(.7);
    scene4.add(t);
*/
    let areaImage = new Image();
        areaImage.src = POSTPROCESSING.SMAAEffect.areaImageDataURL;
    let searchImage = new Image();
        searchImage.src = POSTPROCESSING.SMAAEffect.searchImageDataURL;
    let smaaEffect = new POSTPROCESSING.SMAAEffect(searchImage,areaImage,1);
    godraysEffect = new POSTPROCESSING.GodRaysEffect(camera, mesh, {
        resolutionScale: 1,
        density: .65,
        decay: .63,
        weight: 0,
        samples: 50
    }); //set1: 1,.8,.85,.7,50
    let renderPass = new POSTPROCESSING.RenderPass(mesh, camera);
    effectPass = new POSTPROCESSING.EffectPass(camera,godraysEffect);
    effectPass.renderToScreen = true;
    composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(effectPass);
}

function updateScene4(){
    if(navIn4 && navAlpha4<1){
        navAlpha4+=0.01;

        document.getElementById("indexBar3").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+((0.5-navAlpha4*0.5))+"); background-color: rgba(255,255,255,1);");
        document.getElementById("indexText3").setAttribute("style", "color: rgba(255,255,255,"+(1-(navAlpha4*0.7))+")");
        document.getElementById("indexText4").setAttribute("style", "color: rgba(  255,255,255,"+navAlpha4+")");
        document.getElementById("indexBar4").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+navAlpha4/2+"); background-color: rgba(255,255,255,"+navAlpha4+");");
    }
    //console.log(AudioIndex4);
    for(var t = 0; t < musicFiles[genre][3].length; t++){
        if(AudioIndex4 > -1 && sounds[genre][3][AudioIndex4].getVolume() < 1){
            sounds[genre][3][AudioIndex4].setVolume(Math.round((sounds[genre][3][AudioIndex4].getVolume()+0.01)*100)/100);
        }
        if(t!==AudioIndex4 && sounds[genre][3][t].getVolume() > 0){
            if(sounds[genre][3][t].getVolume()-0.1 >=0){
                sounds[genre][3][t].setVolume(sounds[genre][3][t].getVolume()-0.01);
            }
            else{
                sounds[genre][3][t].setVolume(0);
            }
        }
    }

    var w = composer.passes[1].effects[0].godRaysMaterial.uniforms.weight.value;
    var wval = THREE.Math.lerp(w, id1mod1*(.4/52)+.6, 0.1);
    composer.passes[1].effects[0].godRaysMaterial.uniforms.weight = {value: wval};

    var d = composer.passes[1].effects[0].godRaysMaterial.uniforms.density.value;
    var dval = THREE.Math.lerp(d, .65+(id1mod2/54*2), 0.1);
    composer.passes[1].effects[0].godRaysMaterial.uniforms.density = {value: dval};

    var t = composer.passes[1].effects[0].godRaysMaterial.uniforms.decay.value;
    var tval = THREE.Math.lerp(t, .73+(id1mod3/200), 0.1);
    composer.passes[1].effects[0].godRaysMaterial.uniforms.decay = {value: tval};
    composer.render();
    //composer.passes[1].effects[0].godRaysMaterial.defines.SAMPLES_FLOAT = AudioIndex4;
};


var firstKey4 = true;

function enableTextField4(){
    document.getElementById("id1").setAttribute("readonly","");
    document.getElementById("id1").classList.add("shrink");
    document.getElementById("id1").classList.add("shrunk");
    document.getElementById("id1").classList.remove("fadeIn");
    document.getElementById("form4submit").classList.remove("visible");
    document.getElementById("form4submit").classList.remove("fadeIn");
    document.getElementById("form4submit").classList.add("fadeOut")
    setTimeout(function() {
        document.getElementById("form4submit").classList.add("invisible");
        document.getElementById("form4submit").setAttribute("value","SUBMIT")
        document.getElementById("id1").classList.remove("shrink");
        document.getElementById("id2").classList.remove("invisible");
        document.getElementById("id2").classList.remove("fadeOut");
        document.getElementById("id2").classList.add("visible");
        document.getElementById("id2").classList.add("fadeIn");
        document.getElementById("id2").select();
    },1000);
};

document.getElementById("enterid").addEventListener("click", (event) => {

  event.preventDefault();
    document.getElementById("enterid").classList.add("fadeOut");
    setTimeout(function() {
        document.getElementById("enterid").classList.add("invisible");
        document.getElementById("id1").classList.remove("invisible");
        document.getElementById("id1").classList.remove("fadeOut");
        document.getElementById("id1").classList.add("visible");
        document.getElementById("id1").classList.add("fadeIn");
        document.getElementById("id1").select();
    },1000);
});


var submitEnabledid1 = false;
var submitEnabledid2 = false;
document.getElementById("id1").addEventListener("keyup", (event) => {
    document.getElementById("id1").classList.remove("error");
    document.getElementById("id1").classList.remove("red");
    document.getElementById("id1").classList.remove("fadeIn");
    document.getElementById("id1").classList.add("visible");
    keyHandler4(event);
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9- ]/g, "");
    var id1key = event.key;
    id1key.replace(/[^a-zA-Z0-9- ]/g, "")
    if(id1key !== "Backspace"){
        id1 = event.target.value;
    }
    else{
        id1 = id1.slice(0, -1);
    }
    id1 = event.target.value;

    if(id1.length<3){
        //id1mod1+=id1[id1.length-1].charCodeAt(0) - 96;
        var temp1 = 0;
        for(var i = 0; i < id1.length; i++){
            if(i<2){
                temp1+=id1[i].charCodeAt(0) - 96;
            }
        }
        id1mod1 = temp1;
        if(id1mod1>52){
            id1mod1 = 52;
        }
    }

    if(id1.length>2 && id1.length<9){
        //id1mod1+=id1[id1.length-1].charCodeAt(0) - 96;
        var temp2 = 0;
        var t2 = id1.substring(2);
        for(var i = 0; i < t2.length; i++){
            if(i<6){
                temp2+=t2[i].charCodeAt(0) - 48;
            }
        }
        id1mod2 = temp2;
        if(id1mod2>54){
            id1mod2 = 54;
        }
    }
    else{id1mod2=0;}
    //console.log(id1[id1.length-1].charCodeAt(0) - 96);

    if(firstKey4 === true){
        firstKey4 = false;
    }
    if(id1.length > 7 && submitEnabledid1 === false){
        document.getElementById("form4submit").classList.remove("invisible");
        document.getElementById("form4submit").classList.remove("fadeOut");
        document.getElementById("form4submit").classList.add("fadeIn");
        setTimeout(function() {
            document.getElementById("form4submit").classList.add("visible");
        },1000);
        submitEnabledid1 = true;
    }
});

document.getElementById("id2").addEventListener("keyup", (event) => {
    if(submitEnabledid1 === true){
        document.getElementById("id2").classList.remove("error");
        document.getElementById("id2").classList.remove("red");
        document.getElementById("id2").classList.remove("fadeIn");
        document.getElementById("id2").classList.add("visible");
        keyHandler4(event);
        /*var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        event.target.setSelectionRange(start, end);*/
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9 -]/g, "");
        var id2key = event.key;
        id2key.replace(/[^a-zA-Z0-9 -]/g, "")
        if(id2key !== "Backspace"){
            id2 = event.target.value;
        }
        else{
            id2 = id2.slice(0, -1);
        }
        id2 = event.target.value;

        if(id2.length<4){
            //id1mod1+=id1[id1.length-1].charCodeAt(0) - 96;
            var temp3 = 0;
            for(var i = 0; i < id2.length; i++){
                if(i<4){
                    temp3+=id2[i].charCodeAt(0) - 48;
                }
            }
            id1mod3 = temp3;
            if(id1mod3>27){
                id1mod3 = 27;
            }
        }

        if(firstKey4 === true){
            firstKey4 = false;
        }
        if(id2.length > 2 && submitEnabledid2 === false){
            document.getElementById("form4submit").classList.remove("fadeOut");
            document.getElementById("form4submit").classList.remove("invisible");
            document.getElementById("form4submit").classList.add("fadeIn");
            document.getElementById("form4submit").classList.add("fadeIn");
            setTimeout(function() {
                document.getElementById("form4submit").classList.add("visible");
            },1000);
            submitEnabledid2 = true;
        }
    }
});

function keyHandler4(event){
    const keyName = event.key;
    idString += keyName;
    switch(keyName){
        case 'a':
            idTally+=1;
        break;
        case 'á':
            idTally+=1;
        break;
        case 'ä':
            idTally+=1;
        break;
        case 'â':
            idTally+=1;
        break;
        case 'à':
            idTally+=1;
        break;
        case 'æ':
            idTally+=1;
        break;
        case 'ã':
            idTally+=1;
        break;
        case 'å':
            idTally+=1;
        break;
        case 'ā':
            idTally+=1;
        break;


        case 'b':
            idTally+=2;
        break;
        
        case 'c':
            idTally+=3;
        break;
        case 'ç':
            idTally+=3;
        break;

        case 'd':
            idTally+=4;
        break;

        case 'e':
            idTally+=5;
        break;
        case 'é':
            idTally+=5;
        break;
        case 'ë':
            idTally+=5;
        break;
        case 'ê':
            idTally+=5;
        break;
        case 'è':
            idTally+=5;
        break;
        case 'ę':
            idTally+=5;
        break;
        case 'ė':
            idTally+=5;
        break;
        case 'ē':
            idTally+=5;
        break;

        case 'f':
            idTally+=6;
        break;
        case 'g':
            idTally+=7;
        break;
        case 'h':
            idTally+=8;
        break;

        case 'i':
            idTally+=9;
        break;
        case 'í':
            idTally+=9;
        break;
        case 'ï':
            idTally+=9;
        break;
        case 'ì':
            idTally+=9;
        break;
        case 'î':
            idTally+=9;
        break;
        case 'į':
            idTally+=9;
        break;
        case 'ī':
            idTally+=9;
        break;

        case 'j':
            idTally+=10;
        break;
        case 'j́':
            idTally+=10;
        break;

        case 'k':
            idTally+=11;
        break;
        case 'l':
            idTally+=12;
        break;
        case 'm':
            idTally+=13;
        break;

        case 'n':
            idTally+=14;
        break;
        case 'ñ':
            idTally+=14;
        break;
        case 'ń':
            idTally+=14;
        break;

        case 'o':
            idTally+=15;
        break;
        case 'ó':
            idTally+=15;
        break;
        case 'ö':
            idTally+=15;
        break;
        case 'ô':
            idTally+=15;
        break;
        case 'ò':
            idTally+=15;
        break;
        case 'õ':
            idTally+=15;
        break;
        case 'œ':
            idTally+=15;
        break;
        case 'ø':
            idTally+=15;
        break;
        case 'ō':
            idTally+=15;
        break;

        case 'p':
            idTally+=16;
        break;
        case 'q':
            idTally+=17;
        break;
        case 'r':
            idTally+=18;
        break;
        case 's':
            idTally+=19;
        break;
        case 't':
            idTally+=20;
        break;

        case 'u':
            idTally+=21;
        break;
        case 'ú':
            idTally+=21;
        break;
        case 'ü':
            idTally+=21;
        break;
        case 'û':
            idTally+=21;
        break;
        case 'ù':
            idTally+=21;
        break;
        case 'ū':
            idTally+=21;
        break;

        case 'v':
            idTally+=22;
        break;
        case 'w':
            idTally+=23;
        break;
        case 'x':
            idTally+=24;
        break;
        case 'y':
            idTally+=25;
        break;
        case 'z':
            idTally+=26;
        break;
        case ' ':
            idTally+=0;
        break;
        case '-':
            idTally+=27;
        break;
        case "'":
            idTally+=28;
        break;
        case "Backspace":
            idString = idString.slice(0, -1);
        break;
    }
    //console.log(idString.length/idTally);
    if(keyName!=="Backspace"){
        //console.log("tally="+idTally+"length="+idString.length*28)
        var mod = 2;
        /*if(genre === 1){
            mod = 5;
        }
        else if(genre === 2){
           mod=9;
        }*/
        var newTally = ((id1mod1+id1mod2+id1mod3)-2)/131;
        //console.log(id1mod1+"+"+id1mod2+"+"+id1mod3)
        //console.log("newtally = "+newTally);
        AudioIndex4 = Math.round(/*idTally/(idString.length*28)*/newTally*2);
        if(AudioIndex4 > mod){
            AudioIndex4 = mod;
        }
        /*if(genre === 1){
            Math.round(AudioIndex4 * (6/5));
        }
        else if(genre === 2){
            Math.round(AudioIndex4 * 2);
        }*/
        //console.log(AudioIndex4);
        if(AudioIndex4 !== prevAudioIndex4){
            prevAudioIndex4 = AudioIndex4;
        }
    }
};
