var groups_scene1 = [];
var spheres_scene1 = [];
var scales_scene1 = [];
var speeds_scene1 = [];
//var tally = 0;
var nameString = "";
var audioIndex = -1;
var prevAudioIndex = -1;

var l1= 0;
var l3 = 0;
var l2 = 0;

var fnameMod = -1;
var mnameMod = -1;
var lnameMod = -1;

firstname ="";
middlename ="";
lastname ="";
var l2test ="";

var navAlpha1 = 0;

var scene1 = new THREE.Group();
scene1.position.z = -5;

const addParticleUnit = function(event){
    if(groups_scene1.length < 23){
        if(firstname.length > 0){
            var p1 = fnameMod;
            var p2 = l1;
            if(lnameMod>-1){
                p1+=lnameMod;
                p2+=l2test.length;
            }
            if(mnameMod>-1){
                p1+=mnameMod;
                p2+=middlename.length;
            }
            console.log(p1);
            console.log(p2);

            audioIndex = Math.round(/*tally/(nameString.length*38)*/(p1/(p2*26))*2);
        }
        else{
            audioIndex = -1;
        }
        console.log(audioIndex)
        /*if(genre === 1){
            Math.round(audioIndex * 1.5);
        }
        else if(genre === 2){
            Math.round(audioIndex * (8/6));
        }*/

        if(audioIndex !== prevAudioIndex){
            prevAudioIndex = audioIndex;
        }

        var orbGroup = new THREE.Group();

        var posMod =  (Math.random()*40-20)/7;

        orbGroup.position.x = posMod;
        orbGroup.position.y = Math.random()-.2//-0.5*(posMod)^2+2*(Math.abs(Math.random()));
        orbGroup.position.z = 0;
        
        speeds_scene1.push(Math.random()*.03+.02);

        for(var i = 0; i<10; i++){
            var size = Math.random()*0.08;
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material1 = new THREE.MeshBasicMaterial({color: 0xffffff});
            material1.transparent = true;
            const sphere = new THREE.Mesh( geometry, material1 );
            var scale = Math.random();
            sphere.scale = new THREE.Vector3(scale,scale,scale);
            orbGroup.add(sphere);

            var mod = Math.random()/ /*(Math.abs(*/posMod/*))*/*4;
            if(mod>5){
                mod = 5-Math.random();
            }
            else if(mod<5){
                mod = -5+Math.random();
            }
            sphere.position.x = Math.random()*mod-mod/3+0.2;
            sphere.position.y = Math.random()*mod-mod/3+0.2;
            sphere.position.z = Math.random()*mod-mod/3+0.2;
            
            spheres_scene1.push(sphere);

            var scaling = Math.round(Math.random());
            
            if(scaling === 1){
                scales_scene1.push(true);
            }
            else{
                scales_scene1.push(false);
            }
        }
        scene1.add(orbGroup);
        groups_scene1.push(orbGroup);
    }
};

function updateScene1(){
    document.getElementById("fname").innerHTML = document.getElementById("fname").innerHTML.toUpperCase();
    if(blurOut === true && currBlur > 0){
        currBlur-=0.01;
        renderer.domElement.setAttribute("style", "filter: blur("+currBlur+"px);");
    }

    if(navIn1 && navAlpha1<1){
        navAlpha1+=0.01;

        document.getElementById("indexText1").setAttribute("style", "color: rgba(255,255,255,"+navAlpha1+")");
        document.getElementById("indexBar1").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+navAlpha1/2+"); background-color: rgba(255,255,255,"+navAlpha1+");");
    }

    for(var t = 0; t < musicFiles[genre][0].length; t++){

        if(fnameMod > 0){
            if(audioIndex > -1 && sounds[genre][0][audioIndex].getVolume() < 1){
                sounds[genre][0][audioIndex].setVolume(Math.round((sounds[genre][0][audioIndex].getVolume()+0.01)*100)/100);
            }
            if(t!==audioIndex && sounds[genre][0][t].getVolume() > 0){
                if(sounds[genre][0][t].getVolume()-0.1 >=0){
                    sounds[genre][0][t].setVolume(sounds[genre][0][t].getVolume()-0.01);
                }
                else{
                    sounds[genre][0][t].setVolume(0);
                }
            }
        }
        if(fnameMod === 0){
            if(sounds[genre][0][t].getVolume()-0.1 >=0){
                sounds[genre][0][t].setVolume(sounds[genre][0][t].getVolume()-0.01);
            }
            else{
                sounds[genre][0][t].setVolume(0);
            }
        }
    }

    for(var i = 0; i < groups_scene1.length; i++){
        groups_scene1[i].rotation.x -= speeds_scene1[i];
    };

    for(var i = 0; i < spheres_scene1.length; i++){
        spheres_scene1[i].updateMatrixWorld();

        var currScale1 = spheres_scene1[i].scale;
        if(i === 0){
        }
        if(currScale1.x > Math.random()*0.2+0.7){
            scales_scene1[i] = true;
        }
        else if(currScale1.x < Math.random()*0.2+0.1){
            scales_scene1[i] = false;
        }

        if(scales_scene1[i] == false){
            spheres_scene1[i].scale = currScale1.multiplyScalar(Math.random()*0.1+1);
        }
        else{
            spheres_scene1[i].scale = currScale1.multiplyScalar(1-Math.random()*0.1);
        }
    };
};

var firstKey = true;

function enableTextField1(){
    document.getElementById("fname").setAttribute("readonly","");
    document.getElementById("fname").classList.add("shrink");
    document.getElementById("fname").classList.add("shrunk");
    document.getElementById("fname").classList.remove("fadeIn");
    document.getElementById("skipmiddlename").classList.remove("visible");
    document.getElementById("skipmiddlename").classList.remove("fadeIn");
    document.getElementById("skipmiddlename").classList.add("invisible");
    document.getElementById("skipmiddlename").classList.add("fadeOut");
    document.getElementById("form1submit").classList.remove("visible");
    document.getElementById("form1submit").classList.remove("fadeIn");
    document.getElementById("form1submit").classList.add("fadeOut")
    setTimeout(function() {
        document.getElementById("form1submit").classList.add("invisible");
        document.getElementById("form1submit").setAttribute("value","Continue to Last Name")
        /*document.getElementById("form1submit").classList.remove("fadeOut");
        document.getElementById("form1submit").classList.remove("invisible");
        document.getElementById("form1submit").classList.add("fadeIn");
        document.getElementById("form1submit").classList.add("visible");*/
        document.getElementById("fname").classList.remove("shrink");
        document.getElementById("mname").classList.remove("invisible");
        document.getElementById("mname").classList.remove("fadeOut");
        document.getElementById("mname").classList.add("visible");
        document.getElementById("mname").classList.add("fadeIn");
        document.getElementById("mname").select();
    },1000);
};

function enableTextField2(){

    document.getElementById("skipmiddlename").classList.remove("visible");
    document.getElementById("skipmiddlename").classList.remove("fadeIn");
    document.getElementById("skipmiddlename").classList.add("invisible");
    document.getElementById("skipmiddlename").classList.add("fadeOut");
    document.getElementById("mname").setAttribute("readonly","");
    document.getElementById("mname").classList.add("shrink2");
    document.getElementById("mname").classList.add("shrunk2");
    document.getElementById("mname").classList.remove("fadeIn");
    document.getElementById("form1submit").classList.remove("visible");
    document.getElementById("form1submit").classList.remove("fadeIn");
    document.getElementById("form1submit").classList.add("fadeOut")
    document.getElementById("form1submit").value = "Continue to Last Name"
    setTimeout(function() {
        document.getElementById("form1submit").classList.add("invisible");
        document.getElementById("form1submit").setAttribute("value","SUBMIT")
        /*document.getElementById("form1submit").classList.remove("fadeOut");
        document.getElementById("form1submit").classList.remove("invisible");
        document.getElementById("form1submit").classList.add("fadeIn");
        document.getElementById("form1submit").classList.add("visible");*/
        document.getElementById("mname").classList.remove("shrink");
        document.getElementById("lname").classList.remove("invisible");
        document.getElementById("lname").classList.remove("fadeOut");
        document.getElementById("lname").classList.add("visible");
        document.getElementById("lname").classList.add("fadeIn");
        document.getElementById("lname").select();
    },1000);
};

document.getElementById("skipmiddlename").addEventListener("click", (event) => {
    event.preventDefault;
    form1submits=2;
    document.getElementById("skipmiddlename").classList.remove("visible");
    document.getElementById("skipmiddlename").classList.remove("fadeIn");
    document.getElementById("skipmiddlename").classList.add("invisible");
    document.getElementById("skipmiddlename").classList.add("fadeOut");
    document.getElementById("fname").setAttribute("readonly","");
    document.getElementById("fname").classList.add("shrink2");
    document.getElementById("fname").classList.add("shrunk2");
    document.getElementById("fname").classList.remove("fadeIn");
    document.getElementById("form1submit").classList.remove("visible");
    document.getElementById("form1submit").classList.remove("fadeIn");
    document.getElementById("form1submit").classList.add("fadeOut")
    document.getElementById("form1submit").value = "ENTER YOUR LAST NAME"
    setTimeout(function() {
        document.getElementById("form1submit").classList.add("invisible");
        document.getElementById("form1submit").setAttribute("value","SUBMIT")
        /*document.getElementById("form1submit").classList.remove("fadeOut");
        document.getElementById("form1submit").classList.remove("invisible");
        document.getElementById("form1submit").classList.add("fadeIn");
        document.getElementById("form1submit").classList.add("visible");*/
        document.getElementById("fname").classList.remove("shrink");
        document.getElementById("lname").classList.remove("invisible");
        document.getElementById("lname").classList.remove("fadeOut");
        document.getElementById("lname").classList.add("visible");
        document.getElementById("lname").classList.add("fadeIn");
        document.getElementById("lname").select();
    },1000);
});

document.getElementById("entername").addEventListener("click", (event) => {
    event.preventDefault;
    document.getElementById("entername").classList.add("fadeOut");
    setTimeout(function() {
        document.getElementById("entername").classList.add("invisible");
        document.getElementById("fname").classList.remove("invisible");
        document.getElementById("fname").classList.remove("fadeOut");
        document.getElementById("fname").classList.add("visible");
        document.getElementById("fname").classList.add("fadeIn");
        document.getElementById("fname").select();
    },1000);
});

var submitEnabledf = false;
var submitEnabledm = false;
var submitEnabledl = false;
document.getElementById("fname").addEventListener("keyup", (event) => {
    //keyHandler(event);
    var firstnamekey = event.key;
    firstnamekey.replace(/[^a-zA-Z-' ]/g, "")

    
    firstname = event.target.value;

    var temp = 0;
    for(var i = 0; i < firstname.length; i++){
        temp+=firstname[i].charCodeAt(0) - 96;
    }
    fnameMod = temp;
    l1 = firstname.length;
    var tempstring1 = event.target.value;
    if(tempstring1.length < firstname.length){
        if(groups_scene1.length>0){
            for(var i = scene1.children.length-1; i > tempstring1.length-1; i--){
                scene1.remove(scene1.children[i]);
                groups_scene1.pop();
            }
        }
    }
    else{
        if(firstnamekey!=="Backspace"&&firstnamekey!=="Meta"&&firstnamekey!=="Shift"){
            addParticleUnit(event)
        }
    }
    if(firstKey === true){
        firstKey = false;
    }

    if(firstname.length > 1 && submitEnabledf === false){
        document.getElementById("form1submit").classList.remove("invisible");
        document.getElementById("form1submit").classList.remove("fadeOut");
        document.getElementById("form1submit").classList.add("visible");
        document.getElementById("form1submit").classList.add("fadeIn");
        document.getElementById("skipmiddlename").classList.remove("invisible");
        document.getElementById("skipmiddlename").classList.add("visible");
        document.getElementById("skipmiddlename").classList.add("fadeIn");
        submitEnabledf = true;
    }
 
});

document.getElementById("mname").addEventListener("keyup", (event) => {
    //keyHandler(event);
    var middlenamekey = event.key;
    middlenamekey.replace(/[^a-zA-Z-' ]/g, "")

    var tempstring3 = event.target.value;

    middlename = event.target.value;
    var temp = 0;
    for(var i = 0; i < middlename.length; i++){
        temp+=middlename[i].charCodeAt(0) - 96;
    }
    
    mnameMod = temp;
    if(tempstring3.length < middlename.length){
        if(groups_scene1.length>0){
            for(var i = scene1.children.length-1; i > tempstring3.length-1; i--){
                scene1.remove(scene1.children[i]);
                groups_scene1.pop();
            }
        }
    }
    else{
        if(middlenamekey!=="Backspace"&&middlenamekey!=="Meta"&&middlenamekey!=="Shift"){
            addParticleUnit(event)
        }
    }
    
    if(firstKey === true){
        firstKey = false;
    }
    if(middlename.length > 1 && submitEnabledm === false){
        document.getElementById("form1submit").classList.remove("invisible");
        document.getElementById("form1submit").classList.remove("fadeOut");
        document.getElementById("form1submit").classList.add("visible");
        document.getElementById("form1submit").classList.add("fadeIn");
        submitEnabledm = true;
    }
});

document.getElementById("lname").addEventListener("keyup", (event) => {
    //keyHandler(event);
    var lastnamekey = event.key;
    lastnamekey.replace(/[^a-zA-Z-' ]/g, "")

    lastname = event.target.value;
    l2test = event.target.value;
    var temp = 0;
    for(var i = 0; i < lastname.length; i++){
        temp+=lastname[i].charCodeAt(0) - 96;
    }
    
    lnameMod = temp;
    var tempstring2 = event.target.value;
    if(tempstring2.length < lastname.length){
        if(groups_scene1.length>0){
            for(var i = scene1.children.length-1; i > tempstring2.length-1; i--){
                scene1.remove(scene1.children[i]);
                groups_scene1.pop();
            }
        }
    }
    else{
        if(lastnamekey!=="Backspace"&&lastnamekey!=="Meta"&&lastnamekey!=="Shift"){
            addParticleUnit(event)
        }
    }
    
    if(firstKey === true){
        firstKey = false;
    }
    if(lastname.length > 1 && submitEnabledl === false){
        document.getElementById("form1submit").classList.remove("invisible");
        document.getElementById("form1submit").classList.remove("fadeOut");
        document.getElementById("form1submit").classList.add("visible");
        document.getElementById("form1submit").classList.add("fadeIn");
        submitEnabledl = true;
    }
});

function keyHandler(event){
    const keyName = event.key;
    nameString += keyName;
    //console.log(keyName)
    /*switch(keyName){
        case 'a':
            tally+=1;
        break;
        case 'á':
            tally+=1;
        break;
        case 'ä':
            tally+=1;
        break;
        case 'â':
            tally+=1;
        break;
        case 'à':
            tally+=1;
        break;
        case 'æ':
            tally+=1;
        break;
        case 'ã':
            tally+=1;
        break;
        case 'å':
            tally+=1;
        break;
        case 'ā':
            tally+=1;
        break;


        case 'b':
            tally+=2;
        break;
        
        case 'c':
            tally+=3;
        break;
        case 'ç':
            tally+=3;
        break;

        case 'd':
            tally+=4;
        break;

        case 'e':
            tally+=5;
        break;
        case 'é':
            tally+=5;
        break;
        case 'ë':
            tally+=5;
        break;
        case 'ê':
            tally+=5;
        break;
        case 'è':
            tally+=5;
        break;
        case 'ę':
            tally+=5;
        break;
        case 'ė':
            tally+=5;
        break;
        case 'ē':
            tally+=5;
        break;

        case 'f':
            tally+=6;
        break;
        case 'g':
            tally+=7;
        break;
        case 'h':
            tally+=8;
        break;

        case 'i':
            tally+=9;
        break;
        case 'í':
            tally+=9;
        break;
        case 'ï':
            tally+=9;
        break;
        case 'ì':
            tally+=9;
        break;
        case 'î':
            tally+=9;
        break;
        case 'į':
            tally+=9;
        break;
        case 'ī':
            tally+=9;
        break;

        case 'j':
            tally+=10;
        break;
        case 'j́':
            tally+=10;
        break;

        case 'k':
            tally+=11;
        break;
        case 'l':
            tally+=12;
        break;
        case 'm':
            tally+=13;
        break;

        case 'n':
            tally+=14;
        break;
        case 'ñ':
            tally+=14;
        break;
        case 'ń':
            tally+=14;
        break;

        case 'o':
            tally+=15;
        break;
        case 'ó':
            tally+=15;
        break;
        case 'ö':
            tally+=15;
        break;
        case 'ô':
            tally+=15;
        break;
        case 'ò':
            tally+=15;
        break;
        case 'õ':
            tally+=15;
        break;
        case 'œ':
            tally+=15;
        break;
        case 'ø':
            tally+=15;
        break;
        case 'ō':
            tally+=15;
        break;

        case 'p':
            tally+=16;
        break;
        case 'q':
            tally+=17;
        break;
        case 'r':
            tally+=18;
        break;
        case 's':
            tally+=19;
        break;
        case 't':
            tally+=20;
        break;

        case 'u':
            tally+=21;
        break;
        case 'ú':
            tally+=21;
        break;
        case 'ü':
            tally+=21;
        break;
        case 'û':
            tally+=21;
        break;
        case 'ù':
            tally+=21;
        break;
        case 'ū':
            tally+=21;
        break;

        case 'v':
            tally+=22;
        break;
        case 'w':
            tally+=23;
        break;
        case 'x':
            tally+=24;
        break;
        case 'y':
            tally+=25;
        break;
        case 'z':
            tally+=26;
        break;
        case ' ':
            tally+=0;
        break;
        case '-':
            tally+=27;
        break;
        case "'":
            tally+=28;
        break;
        case "`":
            tally+=28;
        break;
    }*/
};