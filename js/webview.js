CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {
    // Show the webview. By default, the webview is hidden.
    CocoonJS.App.showTheWebView();
});

CocoonJS.App.onLoadInTheWebViewFailed.addEventListener(function(pageURL) {
    console.error("Could not load the HTML file in the webview");
});

CocoonJS.App.loadInTheWebView("game_screen");