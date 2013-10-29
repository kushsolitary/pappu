var WIDTH = 568;
var HEIGHT = 320;

var RATIO = WIDTH / HEIGHT;
var CURRATIO = window.innerHeight/window.innerWidth;

if(CURRATIO != HEIGHT/WIDTH)
  HEIGHT = WIDTH * CURRATIO;

var currentWidth = WIDTH;
var currentHeight = HEIGHT;

currentHeight = window.innerHeight;
var scale = HEIGHT/currentHeight;
currentWidth = WIDTH/scale;

$('html').css('font-size', (100/scale) + '%');


window.addEventListener('resize', function() {

  currentHeight = window.innerHeight;
  var scale = HEIGHT/currentHeight;
  currentWidth = WIDTH/scale;

  $('html').css('font-size', (100/scale) + '%');

  // console.log(scale);
}, false);