ui.start_game.on('touchdown', function() {
  //CocoonJS.App.forward("startGame();");

  mit.main.emit("startGame();");

  return false;
});
