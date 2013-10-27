ui.start_game.on('touchdown', function() {
  CocoonJS.App.forward("startGame();");

  return false;
});
