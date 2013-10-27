ui.start_game.on('touchdown', function() {
  CocoonJS.App.forward("mit.main.startGame();");

  return false;
});
