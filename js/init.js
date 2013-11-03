var RATIO = (window.innerWidth/window.innerHeight);

var canvas = CocoonJS.App.createScreenCanvas();
var ctx = canvas.getContext('2d');

if(RATIO == 1.5) {
  var W = canvas.width = 960;
  var H = canvas.height = 640;
} 

else if(RATIO >= 1.6) {
  var W = canvas.width = 1136;
  var H = canvas.height = 640;
}

else if(RATIO <= 1.4) {
  var W = canvas.width = 853;
  var H = canvas.height = 640;
}