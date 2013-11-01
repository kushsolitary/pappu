(function() {


  // Pause screen will have a retry, a pause
  // and main menu button
  elem.gameover_screen = {
    isVisible: false,

    title: {
      text: 'You died! :(',
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

    // Last Score
    lscore: {
      x: W/2,
      y: 170,

      draw: function(ctx, lscore) {
        ctx.save();
        ctx.font = "48px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText("Last Score: " + lscore, this.x, this.y);
        ctx.restore();
      }
    },

    // High Score
    hscore: {
      x: W/2,
      y: 220,

      draw: function(ctx, hscore) {
        ctx.save();
        ctx.font = "48px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText("Personal Best: " + hscore, this.x, this.y);
        ctx.restore();
      }
    },


    retryButton: {
      img: mit.image.plank_mid,
      w: 221,
      h: 63,
      x: W/2 - 250,
      y: H/2 -31 + 50,

      draw: function(ctx) {
        ctx.drawImage(this.img, this.x, this.y);

        ctx.save();
        ctx.font = "38px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Retry", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.gameover_screen.isVisible)
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

    mainmenuButton: {
      img: mit.image.plank_bot,
      w: 205,
      h: 75,
      x: W/2 + 20,
      y: H/2 -37 +50,

      draw: function(ctx) {
        ctx.drawImage(this.img, this.x, this.y);

        ctx.save();
        ctx.font = "38px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Main Menu", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.gameover_screen.isVisible)
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

    draw: function(ctx, lscore, hscore) {
      if(this.isVisible) {
        this.title.draw(ctx);

        this.retryButton.draw(ctx);
        this.mainmenuButton.draw(ctx);

        this.hscore.draw(ctx, hscore);
        this.lscore.draw(ctx, lscore);
      }
      else
        return;
    }
  }
}());