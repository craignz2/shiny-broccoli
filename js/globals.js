var mesh;

var blurOut = false;
var currBlur = 0.8;

var orbScaleIn = false;

var audioIndex3 = -1;
var age = 0;

var loaded = false;

var camera, renderer, scene;

var material2;

var form1submits = 0;

var navIn1 = false;
var navIn2 = false;
var navIn3 = false;
var navIn4 = false;

var scene2;
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