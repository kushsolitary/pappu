(function() {


  // Pause screen will have a retry, a pause
  // and main menu button
  elem.pause_screen = {
    isVisible: false,

    title: {
      text: 'Paused',
      x: W/2,
      y: 90,

      draw: function(ctx) {
        ctx.save();
        ctx.font = "72px Happy Sans";
        ctx.fillStyle = '#945430';
        ctx.textAlign = 'center'
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }

    },

    draw: function(ctx) {
      this.title.draw(ctx);
      this.isVisible = true;
    },

    remove: function(ctx) {
      ctx.clearRect(0, 0, W, H);
      this.isVisible = false;
    }
  }
}());