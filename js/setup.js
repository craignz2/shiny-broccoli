scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 100000);
renderer = new THREE.WebGLRenderer({alpha:true});

renderer.outputEncoding = THREE.sRGBEncoding;

var sceneIndex = 0;
var transition = false;
var sceneAlpha = 1;
var idType;

//camera.add(listener);
camera.position.z = 10;

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("blurPlane").setAttribute("style", "width: "+ window.innerWidth +"px; height: "+ window.innerHeight+"px;");
renderer.setClearColor(0x000000, 1);
document.body.insertBefore(renderer.domElement, document.getElementById("intro"));
renderer.domElement.id = "canvas";
renderer.domElement.setAttribute("style", "filter: blur(1px);");

onWindowResize();
window.addEventListener('resize', onWindowResize);

renderScene();


//scene.add(intro);

var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var form3 = document.getElementById("form3");
var form4 = document.getElementById("form4");
var outro1 = document.getElementById("checkboxform");
var outro1 = document.getElementById("outro1");
var outro2 = document.getElementById("outro2");

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function renderScene() {
    switch(sceneIndex){
        case 0:
            if(loaded === true){
                scene.remove(scene.children[0]);
                scene.add(intro);
                updateIntro(renderScene);
            }
            break;
        case 1:
            updateScene1(renderScene);
            break;
        case 2:
            updateScene2(renderScene);
            updateGradient();
            break;
        case 3:
           
            if(point.intensity < .5){
                point.intensity += .02
            }
            /*if(material3.roughness > 0.05){
                material3.roughness -= .02; 
            }
            if(material3.metalness < 1){
                material3.metalness += .02; 
            }*/
            if(material4.roughness > 0.05){
                material4.roughness -= .02; 
            }
            if(material4.metalness < 1){
                material4.metalness += .02; 
            }/*
            if(material3.envMapIntensity < 5){
                material3.envMapIntensity += .1; 
            }*/
            if(material4.envMapIntensity < 10){
                material4.envMapIntensity += .2; 
            }
            updateScene2(renderScene);
            updateScene3(renderScene);
            updateGradient();
            break;
            case 4:
                updateScene2(renderScene);
                updateScene4(renderScene);
                updateGradient();
                break;
                case 5:
                    updateScene2(renderScene);
                    updateScene4(renderScene);
                    updateGradient();
                    break;
                    case 6:
                        updateScene2(renderScene);
                        updateScene4(renderScene);
                        updateGradient();
                        break;
                        case 7:
                            updateScene2(renderScene);
                            updateScene4(renderScene);
                            updateGradient();
                            break;
    }

    if(transition && sceneAlpha > 0){
        sceneAlpha-=0.01;
        renderer.setClearColor(0x000000, sceneAlpha);
    }
    if(sceneIndex<4){
        renderer.render( scene, camera );
        requestAnimationFrame(renderScene);
    }
    else{
        composer.render(0.1);
        requestAnimationFrame(renderScene);
    }
}

if(window.innerWidth > window.innerHeight){
    document.getElementsByClassName("scene")[0].setAttribute("style", "transform:  translate(-50%, 0) scale(0.7)");
}
console.log(window.innerWidth);
function onWindowResize () {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    for(var i = 0; i < document.getElementsByClassName("t1").length; i++){
        if(document.getElementById("intro").offsetWidth<860){
            document.getElementsByClassName("t1")[i].setAttribute("style", "font-size: 5vw");
        }
        else{
            document.getElementsByClassName("t1")[i].setAttribute("style", "font-size: 80px");
        }
    }
    for(var i = 0; i < document.getElementsByClassName("t2").length; i++){
        if(document.getElementById("intro").offsetWidth<860){
            document.getElementsByClassName("t2")[i].setAttribute("style", "font-size: 4.1vw");
        }
        else{
            document.getElementsByClassName("t2")[i].setAttribute("style", "font-size: 30px");
        }
    }
    
    if(window.innerWidth>860 && window.innerWidth > window.innerHeight){
        document.getElementsByClassName("scene")[0].setAttribute("style", "transform:  translate(-50%, 0) scale(0.7)");
        document.getElementById("nav").setAttribute("style", "width:  700px");
        var buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.classList.add("smallButton");
        }
        var elements = document.querySelectorAll("input[type=submit]");  
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            element.classList.add("smallButton");
        }
    }
}

document.getElementById("fname").addEventListener("keydown", function(event) {
    if(sceneIndex === 0){
        blurOut = true;
        scene.remove(intro);
        scene.add(scene1);
        sceneIndex++;
        navIn1 = true;
        document.getElementById("nav").classList.remove("invisible");
        document.getElementById("nav").classList.add("visible");
        document.getElementById("nav").classList.add("fadeIn");
    }
});
document.getElementById("lname").addEventListener("keydown", function(event) {
    if(sceneIndex === 0){
        blurOut = true;
        scene.remove(intro);
        scene.add(scene1);
        sceneIndex++;
        navIn1 = true;
        document.getElementById("nav").classList.remove("invisible");
        document.getElementById("nav").classList.add("visible");
        document.getElementById("nav").classList.add("fadeIn");
    }
});

document.getElementById("form1submit").addEventListener("click", function(event) {
    event.preventDefault();
    if(sceneIndex === 1){
        if(form1submits===0){
            enableTextField1();
            console.log("form1")
            form1submits++;
        }
        else if(form1submits===1){
            enableTextField2();
            console.log("form1")
            form1submits++;
        }
        else if(form1submits === 2){
            navIn2 = true;
            transition = true;
            orbScaleIn = true;
            scene.remove(scene1);
            scene.add(scene2);
            scene.add(scene2b);

            form1.classList.remove("visible");
            form1.classList.remove("fadeIn");
            form1.classList.add("fadeOut");
            form1.classList.add("invisible");
            
            document.getElementById("indexText1").classList.remove("fadeInText");
            document.getElementById("indexText1").classList.add("fadeOutText");
            document.getElementById("indexText2").classList.remove("invisibleText");
            document.getElementById("indexText2").classList.add("fadeInText");


            document.getElementById("blurPlane").classList.add("blur");
            setTimeout(function() {
                document.getElementById("blurPlane").classList.remove("blur");
                form2.classList.remove("invisible");
                form2.classList.remove("fadeOut");
                form2.classList.add("visible");
                form2.classList.add("fadeIn");
            },1000);

            sceneIndex++;
        }
    }
});


form2.addEventListener("submit", function(event) {
    event.preventDefault();
    if(firstScroll === true){
        ageString = Math.round(month).toString()+"/"+Math.round(day).toString()+"/"+Math.round((2021-year)).toString();
        //console.log(Math.round(day).toString()+"/"+Math.round(month).toString()+"/"+Math.round((2021-year)).toString());
        //console.log(new Date());
        function getAge(ageString) {
            var today = new Date();
            var birthDate = new Date(ageString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            var d = today.getDay() - birthDate.getDay();
            console.log("today="+today.getDate()+"bday="+birthDate.getDate());
            if (m < 0 || (m === 0 && (today.getDate()-birthDate.getDate())<0)){
                age--;
            }
            console.log(age);
            return age;
        }

        if(sceneIndex === 2){
            if(getAge(ageString) >= 18) {
                navIn3 = true;
                //scene.remove(scene2);
                //scene.add(scene3);
        
                if(age % 2 == 0) {
                    audioIndex3 = 0;
                }
                else{
                    audioIndex3 = 3;
                }
                
                form2.classList.remove("visible");
                form2.classList.remove("fadeIn");
                form2.classList.add("fadeOut");
        
                document.getElementById("indexText2").classList.remove("fadeInText");
                document.getElementById("indexText2").classList.add("fadeOutText");
                document.getElementById("indexText3").classList.remove("invisibleText");
                document.getElementById("indexText3").classList.add("fadeInText");
        
                document.getElementById("blurPlane").classList.add("blur");
                setTimeout(function() {
                    document.getElementById("blurPlane").classList.remove("blur");
                    form2.classList.add("invisible");
                    form3.classList.remove("invisible");
                    form3.classList.remove("fadeOut");
                    form3.classList.add("visible");
                    form3.classList.add("fadeIn");
                },1000);
        
                sceneIndex++; 
            }
            else{
                document.getElementById("hint3").classList.remove("invisible");
                document.getElementById("hint3").classList.remove("fadeOut");
                document.getElementById("hint3").classList.add("visible");
                document.getElementById("hint3").classList.add("fadeIn");
                document.getElementById("form2").classList.add("error");
                document.getElementById("form2").classList.add("red");
                document.getElementById("form2submit").classList.add("error_button");
                document.getElementById("form2submit").classList.add("button_blur_error");
                document.getElementById("form2submit").classList.remove("error_button_return");
            }
        }
    }
});

form3.addEventListener("submit", function(event) {
    event.preventDefault();
    if(sceneIndex === 3 && gender > 0){
        if((gender === 1 || gender === 2 )|| xgenderfilled === true){
            navIn4 = true;
            init();
            //scene.add(scene4);
            form2.classList.remove("visible");
            form2.classList.add("invisible");
            form3.classList.remove("visible");
            form3.classList.remove("fadeIn");
            form3.classList.add("fadeOut");

            document.getElementById("indexText3").classList.remove("fadeInText");
            document.getElementById("indexText3").classList.add("fadeOutText");
            document.getElementById("indexText4").classList.remove("invisibleText");
            document.getElementById("indexText4").classList.add("fadeInText");

            idType = getParameterByName('id_type');
            console.log(idType);
            if(idType === "passport"){
                document.getElementById("enterid").innerHTML = "PASSPORT NUMBER";
                document.getElementById("form4submit").value = "PASSPORT EXPIRY DATE";
                document.getElementById("id2").placeholder = "dd/mm/yyyy";
            }

            document.getElementById("blurPlane").classList.add("blur");
            setTimeout(function() {
                document.getElementById("blurPlane").classList.remove("blur");
                form3.classList.add("invisible");
                form4.classList.remove("invisible");
                form4.classList.remove("fadeOut");
                form4.classList.add("visible");
                form4.classList.add("fadeIn");
            },1000);
            
            sceneIndex++;
        }
        else{
            document.getElementById("xgender").classList.remove("invisible");
            document.getElementById("xgender").classList.remove("fadeOut");
            document.getElementById("xgender").classList.add("visible");
            document.getElementById("xgender").classList.add("fadeIn");
            document.getElementById("gender").classList.remove("visible");
            document.getElementById("gender").classList.remove("fadeIn");
            document.getElementById("gender").classList.add("invisible");
            document.getElementById("gender").classList.add("fadeOut");
            document.getElementById("arrowLeftG").classList.remove("visible");
            document.getElementById("arrowLeftG").classList.remove("fadeIn");
            document.getElementById("arrowLeftG").classList.add("invisible");
            document.getElementById("arrowLeftG").classList.add("fadeOut");
            document.getElementById("arrowRightG").classList.remove("visible");
            document.getElementById("arrowRightG").classList.remove("fadeIn");
            document.getElementById("arrowRightG").classList.add("invisible");
            document.getElementById("arrowRightG").classList.add("fadeOut");
            document.getElementById("form3submit").value = "Please specify";
            //fade in textfield and add new continue
        }
    }
    else if(gender === 0){
        document.getElementById("choose").classList.remove("choosecol");
        document.getElementById("choose").classList.add("error");
        document.getElementById("choose").classList.add("red");
        document.getElementById("hint3").classList.remove("invisible");
        document.getElementById("hint3").classList.add("visible");
        document.getElementById("hint3").classList.add("fadeIn");
    }
});

var form4submits=0;
document.getElementById("form4submit").addEventListener("click", function(event) {
    event.preventDefault();
    /*if(sceneIndex === 4){
        form4.classList.remove("visible");
        form4.classList.remove("fadeIn");
        form4.classList.add("fadeOut");

        document.getElementById("nav").classList.add("fadeOut");

        setTimeout(function() {
            document.getElementById("nav").classList.add("invisible");
            form4.classList.add("invisible");
            document.getElementById("form4submit").setAttribute("style", "backdrop-filter: none;");
            document.getElementById("continueOutro1").setAttribute("style", "backdrop-filter: blur(8px);");
            outro1.classList.remove("invisible");
            outro1.classList.remove("fadeOut");
            outro1.classList.add("visible");
            outro1.classList.add("fadeIn");
        },1000);
        
        sceneIndex++;
    }*/
    

    if(sceneIndex === 4){
        //console.log("f4subs = "+form4submits)
        if(form4submits===0){
            if(id1.length > 5){
                enableTextField4();
                form4submits++;
            }
            else{
                document.getElementById("id1").classList.add("error");
                document.getElementById("id1").classList.add("red");
                document.getElementById("form4submit").classList.add("error_button");
                document.getElementById("form4submit").classList.add("button_blur_error");
                document.getElementById("form4submit").classList.remove("error_button_return");
            }
        }
        else if(form4submits === 1){
            if(idType === "passport"){
                if(id2.length === 10){
                    form4.classList.remove("visible");
                    form4.classList.remove("fadeIn");
                    form4.classList.add("fadeOut");

                    document.getElementById("nav").classList.add("fadeOut");

                    document.getElementById("blurPlane").classList.add("blur");
                    setTimeout(function() {
                        document.getElementById("blurPlane").classList.remove("blur");
                        document.getElementById("nav").classList.add("invisible");
                        form4.classList.add("invisible");
                        document.getElementById("checkboxform").classList.remove("invisible");
                        document.getElementById("checkboxform").classList.remove("fadeOut");
                        document.getElementById("checkboxform").classList.add("visible");
                        document.getElementById("checkboxform").classList.add("fadeIn");
                    },1000);
                    sceneIndex++;
                }
                else{
                    document.getElementById("id2").classList.add("error");
                    document.getElementById("id2").classList.add("red");
                    document.getElementById("form4submit").classList.add("error_button");
                    document.getElementById("form4submit").classList.add("button_blur_error");
                    document.getElementById("form4submit").classList.remove("error_button_return");
                }
            }
            else{
                if(id2.length > 2){
                    form4.classList.remove("visible");
                    form4.classList.remove("fadeIn");
                    form4.classList.add("fadeOut");

                    document.getElementById("nav").classList.add("fadeOut");

                    document.getElementById("blurPlane").classList.add("blur");
                    setTimeout(function() {
                        document.getElementById("blurPlane").classList.remove("blur");
                        document.getElementById("nav").classList.add("invisible");
                        form4.classList.add("invisible");
                        document.getElementById("checkboxform").classList.remove("invisible");
                        document.getElementById("checkboxform").classList.remove("fadeOut");
                        document.getElementById("checkboxform").classList.add("visible");
                        document.getElementById("checkboxform").classList.add("fadeIn");
                    },1000);
                    sceneIndex++;
                }
                else{
                    document.getElementById("id2").classList.add("error");
                    document.getElementById("id2").classList.add("red");
                    document.getElementById("form4submit").classList.add("error_button");
                    document.getElementById("form4submit").classList.add("button_blur_error");
                    document.getElementById("form4submit").classList.remove("error_button_return");
                }
            }
        }
    }

});


document.getElementById("checkboxSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    if(sceneIndex === 5 && checkboxTicked === true){
        /*document.getElementById("indexText4").classList.remove("fadeInText");
        document.getElementById("indexText3").classList.add("fadeOutText");
        document.getElementById("indexText4").classList.remove("invisibleText");
        document.getElementById("indexText4").classList.add("fadeInText");*/
        //fade out nav
       // document.getElementById("nav").classList.add("fadeOut");
        var formAge = Math.round((2021-year)).toString()+"-"+Math.round(month).toString()+"-"+Math.round(day).toString();
        
        if(idType === "passport"){
            var formdata = new FormData();
            formdata.append("firstName", firstname);
            formdata.append("middleName", middlename);
            formdata.append("lastName", lastname);
            formdata.append("dateOfBirth", formAge);
            formdata.append("passportNo", id1);
            formdata.append("passportExpiryDate", id2);
            formdata.append("passportConsentObtained", "true");
            formdata.append("dataSources[]", "DIA-Passport");

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("https://age-verification-api.vercel.app/api/verifyId", requestOptions)
            .then(response => response.text())
            .then(result => catchResult(result))
            .catch(error => catchFalse(error));
        }
        else if(idType === "driver_licence"){
            var formdata = new FormData();
            formdata.append("firstName", firstname);
            formdata.append("middleName", middlename);
            formdata.append("lastName", lastname);
            formdata.append("dateOfBirth", formAge);
            formdata.append("driversLicenceNo", id1);
            formdata.append("driversLicenceVersion", id2);
            formdata.append("driversLicenceConsentObtained", "true");
            formdata.append("dataSources[]", "NZTA Drivers License");

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("https://age-verification-api.vercel.app/api/verifyId", requestOptions)
            .then(response => /*response.text()*/console.log(response.text()))
            .then(result => catchResult(result))
            .catch(error =>  catchError(error));
        }

        function catchResult(result){
            console.log(result)
            document.getElementById("checkboxform").classList.remove("visible");
            document.getElementById("checkboxform").classList.remove("fadeIn");
            document.getElementById("checkboxform").classList.add("fadeOut");
            document.getElementById("blurPlane").classList.add("blur");
            setTimeout(function() {
                document.getElementById("blurPlane").classList.remove("blur");
                document.getElementById("checkboxform").classList.add("invisible");
                outro1.classList.remove("invisible");
                outro1.classList.remove("fadeOut");
                outro1.classList.add("visible");
                outro1.classList.add("fadeIn");
            },1000);
            sceneIndex++;
        }
        function catchError(result){
            console.log('error', error)
            document.getElementById("outro1").children[0].innerHTML = "VERIFICATION FAILED";
            document.getElementById("outro1").children[1].innerHTML = "PLEASE MAKE SURE ALL DETAILS ENTERED ARE CORRECT";
            document.getElementById("continueOutro1").value = "UPDATE YOUR DETAILS";
            document.getElementById("blurPlane").classList.add("blur");
            setTimeout(function() {
                document.getElementById("blurPlane").classList.remove("blur");
                document.getElementById("checkboxform").classList.add("invisible");
                outro1.classList.remove("invisible");
                outro1.classList.remove("fadeOut");
                outro1.classList.add("visible");
                outro1.classList.add("fadeIn");
            },1000);
        }
        

        
       /* if(response === error){
            console.log('error', error)
            document.getElementById("outro1").children[0].innerHTML = "VERIFICATION FAILED";
            document.getElementById("outro1").children[1].innerHTML = "PLEASE MAKE SURE ALL DETAILS ENTERED ARE CORRECT";
            document.getElementById("continueOutro1").value = "UPDATE YOUR DETAILS";
        }
        else{
            console.log(result)
            setTimeout(function() {
                document.getElementById("checkboxform").classList.add("invisible");
                outro1.classList.remove("invisible");
                outro1.classList.remove("fadeOut");
                outro1.classList.add("visible");
                outro1.classList.add("fadeIn");
            },1000);
            sceneIndex++;
        }*/
        
    }
});

outro1.addEventListener("submit", function(event) {
    event.preventDefault();
    if(sceneIndex === 6){

        document.getElementById("customname").innerHTML = "DJ "+firstname;

        outro1.classList.remove("visible");
        outro1.classList.remove("fadeIn");
        outro1.classList.add("fadeOut");

        /*document.getElementById("indexText4").classList.remove("fadeInText");
        document.getElementById("indexText3").classList.add("fadeOutText");
        document.getElementById("indexText4").classList.remove("invisibleText");
        document.getElementById("indexText4").classList.add("fadeInText");*/
        //fade out nav
       // document.getElementById("nav").classList.add("fadeOut");

       document.getElementById("blurPlane").classList.add("blur");
       setTimeout(function() {
           document.getElementById("blurPlane").classList.remove("blur");
            outro1.classList.add("invisible");
            outro2.classList.remove("invisible");
            outro2.classList.remove("fadeOut");
            outro2.classList.add("visible");
            outro2.classList.add("fadeIn");
        },1000);
        
        sceneIndex++;
    }
});


document.getElementById("download").addEventListener("click", function(event) {
    event.preventDefault();
    toggleRecording();
    document.getElementById("download").classList.add("textout");
    document.getElementById("downloadanim").classList.remove("invisible");
    document.getElementById("downloadanim").classList.remove("fadeOut");
    document.getElementById("downloadanim").classList.add("visible");
    document.getElementById("downloadanim").classList.add("fadeIn");
});

console.log("setup done");