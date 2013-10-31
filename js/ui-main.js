ui.start_game.on('click', function() {
  // CocoonJS.App.forward("mit.startGame();");
  // CocoonJS.App.forward("console.log('Start button touched');");

  ui.start_screen.fadeOut('fast');
  ui.level_select.fadeIn('fast');
  return false;
});

  ui.levels.click(function() {
  var ind = $(this).attr('data-d');

  // alert(ind);
  CocoonJS.App.forward("mit.startGame(" + ind + ");");

  // ui.score_board.fadeIn('fast');
  // alert(ind);
  ui.level_select.fadeOut('fast');
});

ui.credit.click(function() {
  ui.start_screen.fadeOut('fast');
  ui.credits.fadeIn('fast');
});

ui.helps.click(function() {
  ui.start_screen.fadeOut('fast');
  ui.help.fadeIn('fast');
});

ui.back.click(function() {
  $(this).parent('.main').fadeOut('fast');
  ui.start_screen.fadeIn('fast');
});

ui.main_menu.click(function() {
  ui.gameover.fadeOut('fast');
  ui.start_screen.fadeIn('fast');
});

ui.restart.click(function() {
  ui.gameover.fadeOut('fast');
  // ui.score_board.fadeIn('fast');
  CocoonJS.App.forward("mit.startGame(mit.level);");
});

function showMenu() {
  // ui.score_board.fadeOut('fast');
  ui.start_screen.fadeIn('fast');

  ui.last_score.text("Last Score: " + parseInt(CocoonJS.App.forward("mit.score")));
}

function showGOScreen() {
  // ui.score_board.fadeOut('fast');
  ui.gameover.fadeIn('fast');

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