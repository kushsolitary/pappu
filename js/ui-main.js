ui.start_game.on('click', function() {
  // CocoonJS.App.forward("mit.startGame();");
  // CocoonJS.App.forward("console.log('Start button touched');");

  $("#start_screen").fadeOut('fast');
  $("#level_select").fadeIn('fast');
  return false;
});

$("#level_select a.levels").click(function() {
  var ind = $(this).attr('data-d');

  // alert(ind);
  CocoonJS.App.forward("mit.startGame(" + ind + ");");

  $("#score_board").fadeIn('fast');
  // alert(ind);
  $("#level_select").fadeOut('fast');
});

$("a#credit").click(function() {
  $("#start_screen").fadeOut('fast');
  $("#credits").fadeIn('fast');
});

$("a#helps").click(function() {
  $("#start_screen").fadeOut('fast');
  $("#help").fadeIn('fast');
});

$("a#back").click(function() {
  $(this).parent('.main').fadeOut('fast');
  ui.start_screen.fadeIn('fast');
});

$("a#main_menu").click(function() {
  $("#gameover").fadeOut('fast');
  $("#start_screen").fadeIn('fast');
});

$("a#restart").click(function() {
  $("#gameover").fadeOut('fast');
  $("#score_board").fadeIn('fast');
  CocoonJS.App.forward("mit.startGame(mit.level);");
});

function showMenu() {
  $("#score_board").fadeOut('fast');
  ui.start_screen.fadeIn('fast');

  ui.last_score.text("Last Score: " + parseInt(CocoonJS.App.forward("mit.score")));
}

function showGOScreen() {
  $("#score_board").fadeOut('fast');
  $("#gameover").fadeIn('fast');

  ui.last_score.text("Last Score: " + parseInt(CocoonJS.App.forward("mit.score")));
}

/*
// Mute the game if button is clicked
$("#mute").click(function() {
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
*/

// Positioning stuff
var credit_height = $("#credits p").height();
$("#credits p, #help p").css({
  'top': 35 + '%'
});

/*
var tweet = document.getElementById("tweet");
var facebook = document.getElementById("fb");

tweet.onclick = function() {
  CocoonJS.App.WebDialog.show('http://twitter.com/share?text=I+am+playing+Pappu+Pakia,+a+cute+HTML5+game+for+iPhone+@kushsolitary!', function() {});
  // console.log("Yo");
  return false;
}

facebook.onclick = function() {
  CocoonJS.App.WebDialog.show('http://facebook.com/sharer.php?s=100&p[title]=I+am+playing+Pappu+Pakia,+a+cute+HTML5+game+for+iPhone!', function() {});
  // console.log("Yo");
  return false;
}

function changeURL() {
  tweet.onclick = function() {
    CocoonJS.App.WebDialog.show('http://twitter.com/share?text=I+just+scored+' +CocoonJS.App.forward("Math.floor(mit.score)")+ '+points+in+Pappu+Pakia!', function() {});
    // console.log("Yo");
    return false;
  }

  facebook.onclick = function() {
    CocoonJS.App.WebDialog.show('http://facebook.com/sharer.php?s=100&p[title]=I+just+scored+' +CocoonJS.App.forward("Math.floor(mit.score)")+ '+points+in+Pappu+Pakia!', function() {});
    // console.log("Yo");
    return false;
  }
}
*/