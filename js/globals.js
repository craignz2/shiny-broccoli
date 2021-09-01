var mesh;
var newSphere;
var sphere_geometry;

var blurOut = false;
var currBlur = 0.8;

var orbScaleIn = false;

var audioIndex3 = -1;
var age = 0;

var loaded = false;

var camera, renderer, scene;

var material3;

var form1submits = 0;

var navIn1 = false;
var navIn2 = false;
var navIn3 = false;
var navIn4 = false;

var composer;
var scene2;
var point;
var firstScroll = false;
var firstname;
var middlename;
var lastname;

var day = 1;
var month = 1;
var year = 0;
var ageString ="";

var gender = 0;
var xgenderfilled = false

var id1="";
var id2="";

var checkboxTicked = false;


var audioctx;

function forceInputUppercase(e)
  {
    var start = e.target.selectionStart;
    var end = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.setSelectionRange(start, end);
  }

  var rev = true;

  var colsF = new THREE.Vector3(0xc28b00,0xdd0080,0x622b85);
  var colsM = new THREE.Vector3(0x52ffdc,0x00c3ff,0x8400ff);
  var colsO = new THREE.Vector3(0xffff75,0xff75bc,0x009434);

  var colsCurr = new THREE.Vector3(colsF.x,colsF.y,colsF.z);

  var cols = [{
    stop: 0,
    color: new THREE.Color(colsCurr.x)
  }, {
    stop: .15,
    color: new THREE.Color(colsCurr.y)
  }, {
    stop: .25,
    color: new THREE.Color(colsCurr.y)
  }, {
    stop: .75,
    color: new THREE.Color(colsCurr.z)
  }, {
    stop: 1,
    color: new THREE.Color(colsCurr.y)
  }];

  var vertexIndices = ['a', 'b', 'c'];
  var face, vertex, normalized = new THREE.Vector3(),
  normalizedAxis = 0;
  var faceslength;

function setGradient(/*sphere_geometry, colors, axis, reverse*/) {
  var colors = cols;
  sphere_geometry.computeBoundingBox();
  var bbox = sphere_geometry.boundingBox;
  var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);
  
  for (let c = 0; c < 5 - 1; c++) {
    var colorDiff = colors[c + 1].stop - colors[c].stop;
    for (let i = 0; i < faceslength; i++) {
      face = sphere_geometry.faces[i];
      for (let v = 0; v < 3; v++) {
        vertex = sphere_geometry.vertices[face[vertexIndices[v]]];
        normalizedAxis = 1 - normalized.subVectors(vertex, bbox.min).divide(size)['z'];
        if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop) {
          var localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff;
          face.vertexColors[v] = colors[c].color.clone().lerp(colors[c + 1].color, localNormalizedAxis);
        }
      }
    }
  }
  sphere_geometry.elementsNeedUpdate = true;
}