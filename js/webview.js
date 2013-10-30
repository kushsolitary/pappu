CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {
  CocoonJS.App.showTheWebView();
});

CocoonJS.App.onLoadInTheWebViewFailed.addEventListener(function(pageURL) {
  console.error("Could not load the HTML file in the webview");
});

CocoonJS.App.loadInTheWebView("WebView");