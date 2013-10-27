CocoonJS
  .App
  .onLoadInTheWebViewSucceed
  .addEventListener(function() {

    CocoonJS
      .App
      .forward("CocoonJS.App.show(0, 0, " + window.innerWidth + "," + window.innerHeight + ");");

    return;
  });

CocoonJS
  .App
  .loadInTheWebView('game_screen.html');