ui.start_game.on('mousedown', function() {
  // CocoonJS.App.forward("mit.startGame();");
  // CocoonJS.App.forward("console.log('Start button touched');");

  $("#start_screen").fadeOut();
  $("#level_select").fadeIn();
  return false;
});

$("#level_select a").mousedown(function() {
  var ind = $(this).index();
  CocoonJS.App.forward("mit.startGame(" + ind + ");");
  // alert(ind);
  $("#level_select").fadeOut();
});

function showMenu() {
  ui.start_screen.fadeIn();
  ui.last_score.text("Last Score: " + parseInt(CocoonJS.App.forward("mit.score")));
  ui.start_game.html('re-start');
  ui.tweet.html('tweet score');
  ui.fb.html('post on fb');
}

// Mute the game if button is mousedowned
$("#mute").mousedown(function() {
  if(CocoonJS.App.forward("mit.isMute") == false) {
    $(this).css("backgroundPosition", "0px -40px");
    CocoonJS.App.forward("mit.music.volume = 0;");
    CocoonJS.App.forward("mit.isMute = true;");
  }

  else {
    $(this).css("backgroundPosition", "0px 0px");
    CocoonJS.App.forward("mit.music.volume = 0.2;");
    CocoonJS.App.forward("mit.isMute = false;");
  }

  return false;
});

var tweet = document.getElementById("tweet");
var facebook = document.getElementById("fb");

tweet.onmousedown = function() {
  CocoonJS.App.WebDialog.show('http://twitter.com/share?text=I+am+playing+Pappu+Pakia,+a+cute+HTML5+game+for+iPhone+@kushsolitary!', function() {});
  // console.log("Yo");
  return false;
}

facebook.onmousedown = function() {
  CocoonJS.App.WebDialog.show('http://facebook.com/sharer.php?s=100&p[title]=I+am+playing+Pappu+Pakia,+a+cute+HTML5+game+for+iPhone!', function() {});
  // console.log("Yo");
  return false;
}

function changeURL() {
  tweet.onmousedown = function() {
    CocoonJS.App.WebDialog.show('http://twitter.com/share?text=I+just+scored+' +CocoonJS.App.forward("Math.floor(mit.score)")+ '+points+in+Pappu+Pakia!', function() {});
    // console.log("Yo");
    return false;
  }

  facebook.onmousedown = function() {
    CocoonJS.App.WebDialog.show('http://facebook.com/sharer.php?s=100&p[title]=I+just+scored+' +CocoonJS.App.forward("Math.floor(mit.score)")+ '+points+in+Pappu+Pakia!', function() {});
    // console.log("Yo");
    return false;
  }
}