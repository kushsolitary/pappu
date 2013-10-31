(function() {

  // Main menu will be shown at start.
  // It will contain the high score, title and buttons

  elem.main_menu = {
    isVisible: false,

    // Title
    title: {
      text: 'Pappu Pakia',
      x: W/2,
      y: 90,

      draw: function(ctx) {
        ctx.save();
        ctx.font = "80px Happy Sans";
        ctx.fillStyle = '#945430';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    },

    // High Score
    hscore: {
      x: W/2,
      y: 170,

      draw: function(ctx, score) {
        ctx.save();
        ctx.font = "48px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText("Personal Best: " + score, this.x, this.y);
        ctx.restore();
      }
    },


    // Start button
    startButton: {
      img: mit.image.plank_top,
      w: 213,
      h: 70,
      x: W - (213 + 60),
      y: H/2 - 35,

      draw: function(ctx) {
        // console.log(this.w, this.h);
        // ctx.fillStyle = '#000';
        ctx.drawImage(this.img, this.x, this.y);

        ctx.save();
        ctx.font = "32px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Start", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        

      },

      tap: function(tx, ty) {
        if(!elem.main_menu.isVisible)
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


    // Credits button
    creditsButton: {
      img: mit.image.plank_mid,
      w: 221,
      h: 63,
      x: W - (221 + 60),
      y: H/2 + 60,

      draw: function(ctx) {
        ctx.drawImage(this.img, this.x, this.y);

        ctx.save();
        ctx.font = "32px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Credits", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.main_menu.isVisible)
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


    // Help button
    helpButton: {
      img: mit.image.plank_bot,
      w: 205,
      h: 75,
      x: W - (205 + 60),
      y: H/2 + 140,

      draw: function(ctx) {
        ctx.drawImage(this.img, this.x, this.y);

        ctx.save();
        ctx.font = "32px Happy Sans";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Help", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.main_menu.isVisible)
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


    // Draw the main menu
    draw: function(ctx, score) {

      if(this.isVisible) {
        // Draw stand
        ctx.drawImage(mit.image.stand, this.startButton.x + this.startButton.w/2 - 30, H - 395);

        this.title.draw(ctx);
        this.hscore.draw(ctx, score);
        this.startButton.draw(ctx);
        this.creditsButton.draw(ctx);
        this.helpButton.draw(ctx);
      }

      else
        return;
    }

  };


}());