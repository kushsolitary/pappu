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

    resumeButton: {
      img: mit.image.plank_top,
      w: 213,
      h: 70,
      x: W/2 - (213 + 160),
      y: H/2 - 35,

      draw: function(ctx) {
        ctx.drawImage(this.img, this.x, this.y);

        ctx.save();
        ctx.font = "38px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Resume", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.pause_screen.isVisible)
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

    retryButton: {
      img: mit.image.plank_mid,
      w: 221,
      h: 63,
      x: W/2 - 110,
      y: H/2 -31,

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
        if(!elem.pause_screen.isVisible)
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
      x: W/2 + (160),
      y: H/2 -37,

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
        if(!elem.pause_screen.isVisible)
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

    draw: function(ctx) {

      if(this.isVisible) {
        this.title.draw(ctx);
        this.resumeButton.draw(ctx);
        this.retryButton.draw(ctx);
        this.mainmenuButton.draw(ctx);
      }
    },
  }
}());