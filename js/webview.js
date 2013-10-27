CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {
  CocoonJS.App.forward("CocoonJS.App.show(0, 0, " + window.innerWidth/2 + "," + window.innerHeight + ");");
  CocoonJS.App.showTheWebView();
});

CocoonJS.App.onLoadInTheWebViewFailed.addEventListener(function(pageURL) {
  console.error("Could not load the HTML file in the webview");
});

CocoonJS.App.loadInTheWebView("game_screen");