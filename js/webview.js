CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {
  //CocoonJS.App.showMessageBox("Hi", "Hello World!", "Boom", "Die");
  CocoonJS.App.showTheWebView();
});

CocoonJS.App.onLoadInTheWebViewFailed.addEventListener(function(pageURL) {
  console.error("Could not load the HTML file in the webview");
});

CocoonJS.App.loadInTheWebView("game_screen");