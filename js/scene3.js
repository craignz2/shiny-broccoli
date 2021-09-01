var prevAudioIndex3 = -1;

var scrolled = false;
var navAlpha3 = 0;
var g;
var prevg;
var animVal = 0;

const lerpColor = function(a, b, amount) {
    const ar = a >> 16,
          ag = a >> 8 & 0xff,
          ab = a & 0xff,

          br = b >> 16,
          bg = b >> 8 & 0xff,
          bb = b & 0xff,

          rr = ar + amount * (br - ar),
          rg = ag + amount * (bg - ag),
          rb = ab + amount * (bb - ab);

    return (rr << 16) + (rg << 8) + (rb | 0);
};

function updateScene3(){
    if(navIn3 && navAlpha3<1){
        navAlpha3+=0.01;
        document.getElementById("indexBar2").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+((0.5-navAlpha3*0.5))+"); background-color: rgba(255,255,255,1);");
        document.getElementById("indexText2").setAttribute("style", "color: rgba(255,255,255,"+(1-(navAlpha3*0.7))+")");
        document.getElementById("indexText3").setAttribute("style", "color: rgba(255,255,255,"+navAlpha3+")");
        document.getElementById("indexBar3").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+navAlpha3/2+"); background-color: rgba(255,255,255,"+navAlpha3+");");
    }

    if(scrolled === true){
        for(var t = 0; t < musicFiles[genre][2].length; t++){
            if(audioIndex3 > -1 && sounds[genre][2][audioIndex3].getVolume() < 1){
                sounds[genre][2][audioIndex3].setVolume(Math.round((sounds[genre][2][audioIndex3].getVolume()+0.01)*100)/100);
            }
            else if(audioIndex3 === -1){
                if(sounds[genre][2][t].getVolume()-0.1 >=0){
                    sounds[genre][2][t].setVolume(sounds[genre][2][t].getVolume()-0.01);
                }
            }
            if(t!==audioIndex3 && sounds[genre][2][t].getVolume() > 0){
                if(sounds[genre][2][t].getVolume()-0.1 >=0){
                    sounds[genre][2][t].setVolume(sounds[genre][2][t].getVolume()-0.01);
                }
                else{
                    sounds[genre][2][t].setVolume(0);
                }
            }
        }
    }
    
    //var c = THREE.Math.lerp(material2.uniforms.colorU.value, .8-((gender*2/10)), 0.01);//0.01 = value smoothing
    //material2.uniforms.colorU.value = 1.;
    //material2.uniforms.gender.value = gender;
    /*if(gender >= 0){
        g = Math.round(gender)-1;
    }
        if(g <0.5){//f
            //console.log(colsCurr.distanceTo(colsF));
            colsCurr.x= lerpColor(colsCurr.x, colsF.x, 0.3);
            colsCurr.y= lerpColor(colsCurr.y, colsF.y, 0.3);
            colsCurr.z= lerpColor(colsCurr.z, colsF.z, 0.3);
        }
        else if(g>= 0.5 && g < 1.5){//m
            colsCurr.x= lerpColor(colsCurr.x, colsM.x, 0.3);
            colsCurr.y= lerpColor(colsCurr.y, colsM.y, 0.3);
            colsCurr.z= lerpColor(colsCurr.z, colsM.z, 0.3);
        }
        else if(g>=1.5 && g < 2.5){//o
            colsCurr.x= lerpColor(colsCurr.x, colsO.x, 0.3);
            colsCurr.y= lerpColor(colsCurr.y, colsO.y, 0.3);
            colsCurr.z= lerpColor(colsCurr.z, colsO.z, 0.3);
        }
        cols = [{
            stop: 0,
            color: new THREE.Color(colsCurr.x)
        }, {
            stop: .15,
            color: new THREE.Color(colsCurr.y)
        }, {
            stop: .25,
            color: new THREE.Color(colsCurr.z)
        }, {
            stop: .75,
            color: new THREE.Color(colsCurr.y)
        }, {
            stop: 1,
            color: new THREE.Color(colsCurr.x)
        }];
          
        setGradient();*/
        //sphere_geometry.colorsNeedUpdate = true;
       
    /*else if(g>=3.5 && g < 4.5){
        material2.uniforms.gender.value = THREE.Math.lerp(material2.uniforms.gender.value, 2.0, 0.05);
        material2.uniforms.colorU.value = THREE.Math.lerp(material2.uniforms.colorU.value, 0.0, 0.05);
    }
    else if(g>=4.5 ){
        material2.uniforms.gender.value = THREE.Math.lerp(material2.uniforms.gender.value, 1.0, 0.05);
        material2.uniforms.colorU.value = THREE.Math.lerp(material2.uniforms.colorU.value, 0.0, 0.05);
    }*/
};

function animColor(){
    if(animVal<1){
        console.log(animVal);
        animVal+=.1;
        if(gender >= 0){
            g = Math.round(gender)-1;
        }
        if(g <0.5){//f
            //console.log(colsCurr.distanceTo(colsF));
            colsCurr.x= lerpColor(colsCurr.x, colsF.x, animVal);
            colsCurr.y= lerpColor(colsCurr.y, colsF.y, animVal);
            colsCurr.z= lerpColor(colsCurr.z, colsF.z, animVal);
        }
        else if(g>= 0.5 && g < 1.5){//m
            colsCurr.x= lerpColor(colsCurr.x, colsM.x, animVal);
            colsCurr.y= lerpColor(colsCurr.y, colsM.y, animVal);
            colsCurr.z= lerpColor(colsCurr.z, colsM.z, animVal);
        }
        else if(g>=1.5 && g < 2.5){//o
            colsCurr.x= lerpColor(colsCurr.x, colsO.x, animVal);
            colsCurr.y= lerpColor(colsCurr.y, colsO.y, animVal);
            colsCurr.z= lerpColor(colsCurr.z, colsO.z, animVal);
        }
        cols = [{
            stop: 0,
            color: new THREE.Color(colsCurr.x)
        }, {
            stop: .15,
            color: new THREE.Color(colsCurr.y)
        }, {
            stop: .25,
            color: new THREE.Color(colsCurr.z)
        }, {
            stop: .75,
            color: new THREE.Color(colsCurr.y)
        }, {
            stop: 1,
            color: new THREE.Color(colsCurr.x)
        }];
        setGradient();
        window.setTimeout(animColor, 50);
    }
}

document.getElementById("gender").addEventListener("scroll", function(){
    if(scrolled === false){
        document.getElementById("form3submit").classList.remove("invisible");
        document.getElementById("form3submit").classList.remove("fadeOut");
        document.getElementById("form3submit").classList.add("visible");
        document.getElementById("form3submit").classList.add("fadeIn");
        /*document.getElementById("hint4").classList.remove("invisible");
        document.getElementById("hint4").classList.remove("fadeOut");
        document.getElementById("hint4").classList.add("visible");
        document.getElementById("hint4").classList.add("fadeIn");*/
    }

    scrolled = true;
    gender = document.getElementById("gender").scrollTop/100;

    //female>male>other

    if(gender>3){
        gender = 3;
    }
    if(Math.round(gender)-1 === -0){
        gender = 1;
    }

    if(age % 2 == 0) {
        audioIndex3 = Math.round(gender-1);
    }
    else {
        audioIndex3 = Math.round(gender-1);
    }
    if(Math.round(gender)-1 < 0){
        audioIndex3 = -1;
    }
    if(Math.round(gender) !== prevg){
        animVal = 0;
        console.log("call color change");
        animColor();
        prevg = Math.round(gender);
    }

   /* if(genre === 1){
        Math.round(audioIndex3 * (8/5));
    }
    else if(genre === 2){
        Math.round(audioIndex3 * 2);
    }*/

    if(audioIndex3 !== prevAudioIndex3){
        prevAudioIndex3 = audioIndex3;
    }
});

document.getElementById("entergender").addEventListener("click", (event) => {
    event.preventDefault();
    //console.log("ENTERGENDER");
    document.getElementById("entergender").classList.add("fadeOut");
    document.getElementById("entergender").disabled = true;
    setTimeout(function() {
        document.getElementById("entergender").classList.add("invisible");
        document.getElementById("arrowLeftG").classList.remove("invisible");
        document.getElementById("arrowLeftG").classList.add("visible");
        document.getElementById("arrowLeftG").classList.add("fadeIn");
        document.getElementById("arrowRightG").classList.remove("invisible");
        document.getElementById("arrowRightG").classList.add("visible");
        document.getElementById("arrowRightG").classList.add("fadeIn");
        document.getElementById("gender").classList.remove("invisible");
        document.getElementById("gender").classList.add("visible");
        document.getElementById("gender").classList.add("fadeIn");
        setTimeout(function() {
            //console.log("remove disabled");
            document.getElementById("form3submit").removeAttribute("disabled");
        },1000);
    },1000);
});
var xgenderstring = "";
document.getElementById("xgender").addEventListener("keyup", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z '-]/g, "");
    var genderxkey = event.key;
    genderxkey.replace(/[^a-zA-Z '-]/g, "")
    if(genderxkey !== "Backspace"){
        xgenderstring = event.target.value;
    }
    else{
        xgenderstring = xgenderstring.slice(0, -1);
    }
    xgenderstring = event.target.value;
    if(xgenderstring.length > 1){
        xgenderfilled = true;
    }
    //console.log("xgender = "+xgenderstring);
});