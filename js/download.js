'use strict';

/* globals main */

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

/* globals main, MediaRecorder */

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
var recordedBlobs;
var recordedBlobs2;
let sourceBuffer;
var superBuffer;
var superBuffer2;

var test;


var recording = false;

var recordVideo = false;
var stream; // frames per second

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {

  console.log("data available - "+event.data.size);
  if (event.data && event.data.size > 0) {
    recordVideo = true;
    ////if(recordVideo === false){
      //recordVideo = true;
    //}
    recordedBlobs.push(event.data);
  }
}

function handleDataAvailable2(event) {
  console.log("data available - "+event.data.size);
  if (event.data && event.data.size > 0) {
    recordedBlobs2.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
  superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
}

function handleStop2(event) {
  console.log('Recorder stopped: ', event);
  superBuffer2 = new Blob(recordedBlobs2, {type: 'audio/mp3'});
}

function toggleRecording() {
  if (recording === false) {
    startRecording();
    recording = true;
    /*setTimeout(function() {
      stopRecording();
      recording = false;
    },16100);//16100
  */}
}



var loops = 0;

// The nested try blocks will be simplified when Chrome 47 moves to Stable
function startRecording() {
  var stream_dest1 = audioctx.createMediaStreamDestination();
  var stream_dest2 = audioctx.createMediaStreamDestination();
  var stream_dest3 = audioctx.createMediaStreamDestination();
  var stream_dest4 = audioctx.createMediaStreamDestination();
  const merged_audio_stream = [stream_dest1.stream,stream_dest2.stream,stream_dest3.stream,stream_dest4.stream];
  const merged_audio_stream2 = stream_dest1.stream;

  test = new MediaRecorder(merged_audio_stream2);

  const atmos = new Audio(musicFiles[genre][0][audioIndex]);
  const atmosSource = audioctx.createMediaElementSource(atmos);
  atmosSource.connect(stream_dest1);
  
  const bass = new Audio(musicFiles[genre][1][audioIndex2]);
  const bassSource = audioctx.createMediaElementSource(bass);
  bassSource.connect(stream_dest1);
  
  const beats = new Audio(musicFiles[genre][2][audioIndex3]);
  const beatsSource = audioctx.createMediaElementSource(beats);
  beatsSource.connect(stream_dest1);
  
  const melody = new Audio(musicFiles[genre][3][AudioIndex4]);
  const melodySource = audioctx.createMediaElementSource(melody);
  melodySource.connect(stream_dest1);
  
  atmos.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
    loops++;
    console.log("loops++");
    if(loops === 2){
      stopRecording();
      recording = false;
    }
  }, false);
  atmos.volume = 1;
  atmos.play();
  
  bass.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  bass.volume = 1;
  bass.play();
  
  beats.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  beats.volume = 1;
  beats.play();
  
  melody.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  melody.volume = 1;
  melody.play();

  const canvas = document.getElementById('gradients');
  stream = canvas.captureStream(30);//30fps

  stream.addTrack(test.stream.getAudioTracks()[0]);
  let options = {mimeType: 'video/webm', videoBitsPerSecond: 5000000};//5mb/s>720p. 8mb/s>1080p
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(stream, options);
    console.log("reg");
  } catch (e0) {
    console.log('Unable to create MediaRecorder with options Object: ', e0);
    try {
      options.mimeType = 'video/webm;codecs=h264';
      mediaRecorder = new MediaRecorder(stream, options);
      console.log("h264");
    } catch (e1) {
      console.log('Unable to create MediaRecorder with options Object: ', e1);
      try {
        mediaRecorder = new MediaRecorder(stream);
      } catch (e2) {
        try {
          options = 'video/mp4;codecs=avc1'; // Chrome 47
          mediaRecorder = new MediaRecorder(stream, options);
          console.log("avc1");
        } catch (e3) {
          console.log('Unable to create MediaRecorder with options Object: ', e3);
          try{
            options = 'video/vp8'; // Chrome 47
            mediaRecorder = new MediaRecorder(stream, options);
            console.log("vp8");
          } catch (e4) {
            console.log('Unable to create MediaRecorder with options Object: ', e4);
            try{
              options = 'video/mp4'; // Chrome 47
              mediaRecorder = new MediaRecorder(stream, options);
              console.log("mp4");
            } catch (e5){
              console.error('Exception while creating MediaRecorder:', e5);
              return;
            }
          }
        }
      }
    }
  }
  
  recordedBlobs2 = [];
  test.onstop = handleStop2;
  test.ondataavailable = handleDataAvailable2;
  test.start(100);

  ////if(recordVideo === true){
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(100); // collect 100ms of data
  //}
}

function stopRecording() {
  //console.log("was recording = "+recordVideo);
  ////if(recordVideo === true){
    mediaRecorder.stop();
  //}
  test.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
  download();
}


function download() {//recordedBlobs

  ////if(recordVideo === true){
    var test = recordedBlobs.concat(recordedBlobs2)
    const blob = new Blob(test, {type: 'video/mp4'});
  //}
  const audioblob = new Blob(recordedBlobs2, {type: 'audio/mp3'});
  //let newStream = new MediaStream([,merged_audio_stream.getTracks()]);
  //merge and replace blob in url
  //merged_audio_stream.getTracks().forEach(track => newStream.addTrack(track));
  //newStream.addTrack(blob);
  //let merged_audio_video = new MediaStream([blob, merged_audio_stream]);
  //let newBlob = new Blob([blob, audioblob], {type: 'video/mp4'});
  //let newBlob2 = new Blob([blob], {type: 'video/mp4'});

  //var VideoStreamMerger = require('video-stream-merger')

  //if(recordVideo === false){
  const url = window.URL.createObjectURL(audioblob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  //firstname+"'s_Personalised_track.webm"
  a.download = "DJ"+firstname+"'s Track.mp3";
  document.body.appendChild(a);
  a.click();
  //}

  //if(recordVideo === true){
    const url2 = window.URL.createObjectURL(blob);
    const a2 = document.createElement('a');
    a2.style.display = 'none';
    a2.href = url2;
    //firstname+"'s_Personalised_track.webm"
    a2.download = "DJ"+firstname+"'s Track.mp4";
    document.body.appendChild(a2);
    a2.click();
  //}
  setTimeout(() => {

  //if(recordVideo === false){
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  //}
  //if(recordVideo === true){
    document.body.removeChild(a2);
    window.URL.revokeObjectURL(url2);
  //}
  }, 100);
};


//




//audio.play();

//let stream = new MediaStream([videoTrack, audioTrack]);