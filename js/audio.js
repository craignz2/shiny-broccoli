const listener = new THREE.AudioListener();
const audioLoader = new THREE.AudioLoader();

const links = [
    "music/House/ATMOS/HOUSE_ATMOS_1.mp3", 
    "music/House/ATMOS/HOUSE_ATMOS_2.mp3", 
    "music/House/ATMOS/HOUSE_ATMOS_3.mp3", 
    "music/House/BASS/HOUSE_BASS_1.mp3", 
    "music/House/BASS/HOUSE_BASS_2.mp3", 
    "music/House/BASS/HOUSE_BASS_3.mp3", 
    "music/House/BEAT/HOUSE_BEAT_1.mp3", 
    "music/House/BEAT/HOUSE_BEAT_2.mp3", 
    "music/House/BEAT/HOUSE_BEAT_3.mp3", 
    "music/House/MEL/HOUSE_MEL_1.mp3", 
    "music/House/MEL/HOUSE_MEL_2.mp3", 
    "music/House/MEL/HOUSE_MEL_3.mp3", 
    "music/DnB/ATMOS/DnB_ATMOS_1.mp3", 
    "music/DnB/ATMOS/DnB_ATMOS_2.mp3", 
    "music/DnB/ATMOS/DnB_ATMOS_3.mp3", 
    "music/DnB/BASS/DnB_BASS_1.mp3", 
    "music/DnB/BASS/DnB_BASS_2.mp3", 
    "music/DnB/BASS/DnB_BASS_3.mp3", 
    "music/DnB/BEAT/DnB_BEAT_1.mp3", 
    "music/DnB/BEAT/DnB_BEAT_2.mp3", 
    "music/DnB/BEAT/DnB_BEAT_3.mp3", 
    "music/DnB/MEL/DnB_MEL_1.mp3", 
    "music/DnB/MEL/DnB_MEL_2.mp3", 
    "music/DnB/MEL/DnB_MEL_3.mp3", 
    "music/HipHop/ATMOS/HIPHOP_ATMOS_1.mp3", 
    "music/HipHop/ATMOS/HIPHOP_ATMOS_2.mp3", 
    "music/HipHop/ATMOS/HIPHOP_ATMOS_3.mp3", 
    "music/HipHop/BASS/HIPHOP_BASS_1.mp3", 
    "music/HipHop/BASS/HIPHOP_BASS_2.mp3", 
    "music/HipHop/BASS/HIPHOP_BASS_3.mp3", 
    "music/HipHop/BEAT/HIPHOP_BEAT_1.mp3", 
    "music/HipHop/BEAT/HIPHOP_BEAT_2.mp3", 
    "music/HipHop/BEAT/HIPHOP_BEAT_3.mp3", 
    "music/HipHop/MEL/HIPHOP_MEL_1.mp3", 
    "music/HipHop/MEL/HIPHOP_MEL_2.mp3", 
    "music/HipHop/MEL/HIPHOP_MEL_3.mp3"
]

var House_Atmos = [
    links[0],
    links[1],
    links[2]
];
var House_Bass = [
    links[3],
    links[4],
    links[5]
];
var House_Beat = [
    links[6],
    links[7],
    links[8]
];
var House_Mel = [
    links[9],
    links[10],
    links[11]
];

var House = [
    House_Atmos,
    House_Bass,
    House_Beat,
    House_Mel
];
var DnB_Atmos = [
    links[12],
    links[13],
    links[14]
];
var DnB_Bass = [
    links[15],
    links[16],
    links[17]
];
var DnB_Beat = [
    links[18],
    links[19],
    links[20]
];
var DnB_Mel = [
    links[21],
    links[22],
    links[23]
];
var DnB = [
    DnB_Atmos,
    DnB_Bass,
    DnB_Beat,
    DnB_Mel
];
var HipHop_Atmos = [
    links[24],
    links[25],
    links[26]
];
var HipHop_Bass = [
    links[27],
    links[28],
    links[29]
];
var HipHop_Beat = [
    links[30],
    links[31],
    links[32]
];
var HipHop_Mel = [
    links[33],
    links[34],
    links[35]
];

var HipHop = [
    HipHop_Atmos,
    HipHop_Bass,
    HipHop_Beat,
    HipHop_Mel
];

var musicFiles = [House, DnB, HipHop];
var genre = -1;

var players = [];

for(var i = 0; i < 36; i++){
    players.push(new THREE.Audio( listener ));
    players[i].setVolume(0.0);
}

var sounds = [
    [//house
        [
            players[0],
            players[1],
            players[2]
        ],[
            players[3],
            players[4],
            players[5]
        ],[
            players[6],
            players[7],
            players[8]
        ],[
            players[9],
            players[10],
            players[11]
        ]
    ],
    [//dnb
        [
            players[12],
            players[13],
            players[14]
        ],[
            players[15],
            players[16],
            players[17]
        ],[
            players[18],
            players[19],
            players[20]
        ],[
            players[21],
            players[22],
            players[23]
        ]
    ],
    [//hiphop
        [
            players[24],
            players[25],
            players[26]
        ],[
            players[27],
            players[28],
            players[29]
        ],[
            players[30],
            players[31],
            players[32]
        ],[
            players[33],
            players[34],
            players[35]
        ]
    ]
];

var index = 0;
var plays = [];
var loadbar = document.getElementById("load");
var goButton = document.getElementById("continueIntro");
var loadAlpha = 1;

function loadSounds(){
    audioLoader.load( links[index], function(buffer) {
        plays.push(buffer);
        
        /*temp.play();*/
        if(index<links.length-1){
            index++;
            loadbar.setAttribute("style", "width:"+((index*(100/35))*0.8)+"%; background-color:white;");
            loadSounds();
        }
        else{
            if(loadAlpha>0){
                //render();
                loaded = true;
                document.getElementById("loadDiv").classList.add("fadeOut");
                setTimeout(function(){
                    document.getElementById("loadDiv").classList.add("invisible");
                    fadeInButton();
                },1000)
            }
        }
    });
}

function fadeInButton(){
    if(loadAlpha>0){
        loadbar.setAttribute("style", "width:80%; background-color:rgba(255,255,255,"+loadAlpha+");");
        goButton.setAttribute("style", "background-color: rgba(255,0,0,"+(1-loadAlpha)+"); color: rgba(255,255,255,"+(1-loadAlpha)+"); ");
        loadAlpha-=0.01;
        setTimeout(function(){
            fadeInButton();
        }, 1000/60);
    }
    else{
        loadbar.setAttribute("style", "width:80%; background-color:rgba(255,255,255,0);");
        goButton.setAttribute("style", "background-color: rgba(255,0,0,1); color: rgba(255,255,255,1); ");
    }
}

loadSounds();

function playAll(){
    audioctx = new (window.AudioContext || window.webkitAudioContext)();
    for(var i = 0; i < plays.length; i++){
        players[i].setVolume(0.0);
        players[i].setBuffer(plays[i]);
        players[i].setLoop( true );
        players[i].play();
    }
}