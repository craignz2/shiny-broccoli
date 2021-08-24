let standard = THREE.ShaderLib['standard'];
var date = new Date();

var tally = (day*2*month+year/100);

var audioIndex2 = -1;
var prevAudioIndex2 = -1;
var navAlpha2 = 0;

scene2 = new THREE.Group();
scene2.position.z = -5;

function fillYearForm() {
    var ul = document.getElementById("years");
    var currYear = date.getFullYear();
    for(var i = 0; i < 128; i++){
        if(i>1 && i< 126){
            var li = document.createElement("li");
            li.classList.add("snapChild");
            li.innerHTML = currYear-i+2;
            ul.appendChild(li);
        }
        else{
            if(i === 0 || i === 1){
                var li = document.createElement("li");
                li.classList.add("snapChild");
                li.innerHTML = "\u00A0";
                ul.appendChild(li);
            }
            else{
                for(var x = 0; x < 2; x++){
                    var span = document.createElement("span");
                    span.classList.add("test");
                    ul.appendChild(span);
                }
            }
        }
    }
}

fillYearForm();

function switchDays(selectedMonth) {
    var ul = document.getElementById("days");
    var children = ul.children;
    switch(selectedMonth){
        case 1:
            if(children.length<35){
                addDays(ul, children.length, 31);
            }
            break;
        case 2:
            if(children.length>33){
                removeDays(ul, children.length, 29)
            }
            break;
        case 3:
            if(children.length<35){
                addDays(ul, children.length, 31);
            }
            break;
        case 4:
            if(children.length<34){
                addDays(ul, children.length, 30);
            }
            else if(children.length>34){
                removeDays(ul, children.length, 30)
            }
            break;
        case 5:
            if(children.length<35){
                addDays(ul, children.length, 31);
            }
            break;
        case 6:
            if(children.length<34){
                addDays(ul, children.length, 30);
            }
            else if(children.length>34){
                removeDays(ul, children.length, 30)
            }
            break;
        case 7:
            if(children.length<35){
                addDays(ul, children.length, 31);
            }
            break;
        case 8:
            if(children.length<35){
                addDays(ul, children.length, 31);
            }
            break;
        case 9:
            if(children.length<34){
                addDays(ul, children.length, 30);
            }
            else if(children.length>34){
                removeDays(ul, children.length, 30);
            }
            break;
        case 10:
            if(children.length<35){
                addDays(ul, children.length, 31);
            }
            break;
        case 11:
            if(children.length<34){
                addDays(ul, children.length, 30);
            }
            else if(children.length>34){
                removeDays(ul, children.length, 30);
            }
            break;
        case 12:
            if(children.length<35){
                addDays(ul, children.length, 31);
            }
            break;
    }
}

function addDays(ul, length, target){
    var amount = (target+4)-length;
    for(var i = 0; i<amount; i++){
        var li = document.createElement("li");
        li.classList.add("snapChild");
        li.innerHTML = length-2+i-1;
        ul.insertBefore(li, ul.children[ul.children.length-2]);
    }
}

function removeDays(ul, length, target){//done
    var amount = length-(target+4);
    for(var i = 0; i<amount; i++){
        ul.removeChild(ul.children[ul.children.length-3]);
    }

}

material2 = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        type: "f",
        value: 0.0
      },
      day: { 
        value: 1
      }	,
      month: { 
        value: 1
      }	,
      year: { 
        value: 1
      }	,
      colorU: { 
        value: 1
      }	,
      gender: { 
        value: 1
      }	
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    transparent: true,
});

mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry( 20, 100 ),
    material2
);

scene2.add(mesh);
mesh.position.z = -50;
mesh.rotation.y = 0.5;
mesh.scale.x = 0;
mesh.scale.y = 0;
mesh.scale.z = 0;

function updateScene2(){
    if(orbScaleIn === true){
        if(mesh.scale.x === 0){
            mesh.scale.x = 0.02;
            mesh.scale.y = 0.02;
            mesh.scale.z = 0.02;
        }
        else if(mesh.scale.x < 1){
            mesh.scale.x +=((1-mesh.scale.x)*.1);
            mesh.scale.y +=((1-mesh.scale.y)*.1);
            mesh.scale.z +=((1-mesh.scale.z)*.1);
        }
    }

    if(navIn2 && navAlpha2<1){
        navAlpha2+=0.01;
        document.getElementById("indexText1").setAttribute("style", "color: rgba(255,255,255,"+(1-(navAlpha2*0.7))+")");
        document.getElementById("indexText2").setAttribute("style", "color: rgba(255,255,255,"+navAlpha2+")");
        document.getElementById("indexBar1").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+((0.5-navAlpha2*0.5))+"); background-color: rgba(255,255,255,1);");
        document.getElementById("indexBar2").setAttribute("style", "box-shadow: 0px 0px 10px 10px rgba(255,255,255,"+navAlpha2/2+"); background-color: rgba(255,255,255,"+navAlpha2+");");
    }

    for(var t = 0; t < musicFiles[genre][1].length; t++){
        if(audioIndex2 > -1 && sounds[genre][1][audioIndex2].getVolume() < 1){
            sounds[genre][1][audioIndex2].setVolume(Math.round((sounds[genre][1][audioIndex2].getVolume()+0.01)*100)/100);
        }
        if(t!==audioIndex2 && sounds[genre][1][t].getVolume() > 0){
            if(sounds[genre][1][t].getVolume()-0.1 >=0){
                sounds[genre][1][t].setVolume(sounds[genre][1][t].getVolume()-0.01);
            }
            else{
                sounds[genre][1][t].setVolume(0);
            }
        }
    }

    material2.uniforms[ 'time' ].value = .00025 * ( Date.now() - date );

    var d = THREE.Math.lerp(material2.uniforms.day.value, day, 0.001);//0.01 = value smoothing
    material2.uniforms.day.value = d/2;

    var m = THREE.Math.lerp(material2.uniforms.month.value, month, 0.1);//0.01 = value smoothing
    material2.uniforms.month.value = m;//none

    var y = THREE.Math.lerp(material2.uniforms.year.value, year, 0.01);//0.01 = value smoothing
    material2.uniforms.year.value = y;


};

firstScroll = false;

function setTally(){
    document.getElementById("form2").classList.remove("error");
    document.getElementById("form2").classList.remove("red");
    document.getElementById("form2").classList.remove("fadeIn");
    document.getElementById("form2").classList.add("visible");
    if(firstScroll === false){
        document.getElementById("form2submit").classList.remove("invisible");
        document.getElementById("form2submit").classList.remove("fadeOut");
        document.getElementById("form2submit").classList.add("visible");
        document.getElementById("form2submit").classList.add("fadeIn");
        setTimeout(function() {
            document.getElementById("form2submit").removeAttribute("disabled");
        },1000);
    }
    firstScroll = true;
    tally = (day*2*month+year/100);
    var soundTally = Math.round(((day*4)+(month*10)+year)*(2/369));
    audioIndex2 = soundTally;
    /*if(genre === 1){
        Math.round(audioIndex2 * 2);
    }
    else if(genre === 2){
        Math.round(audioIndex2 * (5/6));
    }*/
    
    if(audioIndex2 !== prevAudioIndex2){
        prevAudioIndex2 = audioIndex2;
    }
}

var firstKey = true;

document.getElementById("days").addEventListener("scroll", function(){
    day = document.getElementById("days").scrollTop/100+1;
    console.log(day);
    setTally();
});
document.getElementById("months").addEventListener("scroll", function(){
    var d = document.getElementById("months").scrollTop/100+1;
    console.log(d);
    switchDays(d);
    month = d;
    setTally();
});
document.getElementById("years").addEventListener("scroll", function(){
    year = document.getElementById("years").scrollTop/100;
    console.log(year);
    age = year;
    setTally();
});

document.getElementById("enterdob").addEventListener("click", (event) => {
    document.getElementById("enterdob").classList.add("fadeOut");
    document.getElementById("enterdob").disabled = true;
    setTimeout(function() {
        document.getElementById("enterdob").classList.add("invisible");
        document.getElementById("arrowLeft").classList.remove("invisible");
        document.getElementById("arrowLeft").classList.add("visible");
        document.getElementById("arrowLeft").classList.add("fadeIn");
        document.getElementById("arrowRight").classList.remove("invisible");
        document.getElementById("arrowRight").classList.add("visible");
        document.getElementById("arrowRight").classList.add("fadeIn");
        document.getElementById("years").classList.remove("invisible");
        document.getElementById("years").classList.add("visible");
        document.getElementById("years").classList.add("fadeIn");
        document.getElementById("months").classList.remove("invisible");
        document.getElementById("months").classList.add("visible");
        document.getElementById("months").classList.add("fadeIn");
        document.getElementById("days").classList.remove("invisible");
        document.getElementById("days").classList.add("visible");
        document.getElementById("days").classList.add("fadeIn");
    },1000);
});