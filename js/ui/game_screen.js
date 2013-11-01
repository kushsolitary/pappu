(function() {

  // Game screen will contain a pause button
  // and current score

  elem.game_screen = {
    isVisible: false,

    // Score
    scoreText: {
      x: 20,
      y: 20,

      draw: function(ctx, score) {
        ctx.save();
        ctx.font = "48px Happy Sans";
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.fillText(score, this.x, this.y);
        ctx.restore();
      }
    },

    pauseBtn: {
      y: 20,
      w: 40,
      x: W - (40 + 20),
      h: 40,

      draw: function(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
        // console.log('yadda');
      },

      tap: function(tx, ty) {
        if(!elem.game_screen.isVisible)
          return false;

        if(
            tx > this.x && 
            tx < this.x + this.w && 
            ty > this.y && 
            ty < this.y + this.h
          ) {
          mit.audio.loadButton.play();
          return true;
        }
        else
          return false;
      }
    },

    // Show "touch the screen to fly!"
    instruction: {
      x: W/2,
      y: H/2,
      text: "Touch and hold to fly up. Release to fall down.",
      draw: function(ctx) {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '48px Happy Sans';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    },

    draw: function(ctx, score) {
      if(mit.start_btn_clicked) {
        this.pauseBtn.draw(ctx);
        this.scoreText.draw(ctx, score);

        if(!mit.game_started)
          this.instruction.draw(ctx);
      }
    }
  };



}());