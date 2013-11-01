(function() {


  // Pause screen will have a retry, a pause
  // and main menu button
  elem.level_selection_screen = {
    isVisible: false,

    title: {
      text: 'Select game speed',
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

    // Option 1: Slow
    optOne: {
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
        ctx.fillText("Slow", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.level_selection_screen.isVisible)
          return false;

        if(
            tx > this.x && 
            tx < this.x + this.w && 
            ty > this.y && 
            ty < this.y + this.h
          ) {
          mit.audio.loadButton.play();
          mit.level = 0;
          return true;
        }
        else
          return false;
      }
    },    

    // Option 2: Medium
    optTwo: {
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
        ctx.fillText("Medium", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.level_selection_screen.isVisible)
          return false;

        if(
            tx > this.x && 
            tx < this.x + this.w && 
            ty > this.y && 
            ty < this.y + this.h
          ) {
          mit.audio.loadButton.play();
          mit.level = 1;
          return true;
        }
        else
          return false;
      }
    },

    // Option 3: Fast
    optThree: {
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
        ctx.fillText("Fast", this.x + this.w/2, this.y + this.h/2);
        ctx.restore();        
      },

      tap: function(tx, ty) {
        if(!elem.level_selection_screen.isVisible)
          return false;

        if(
            tx > this.x && 
            tx < this.x + this.w && 
            ty > this.y && 
            ty < this.y + this.h
          ) {
          mit.audio.loadButton.play();
          mit.level = 2
          return true;
        }
        else
          return false;
      }
    },

    backButton: {
      x: W - 20 - 60 - 40,
      y: 50,
      w: 60,
      h: 40,

      draw: function(ctx) {
        ctx.save();
        ctx.font = "48px Happy Sans";
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.fillText("Back", this.x, this.y);
        ctx.restore();
      },

      tap: function(tx, ty) {
        if(!elem.level_selection_screen.isVisible)
          return false;

        if(
            tx > this.x - 20 && 
            tx < this.x + this.w + 20 && 
            ty > this.y - 20 && 
            ty < this.y + this.h + 20
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

        this.optOne.draw(ctx);
        this.optTwo.draw(ctx);
        this.optThree.draw(ctx);

        this.backButton.draw(ctx);
      }
      else
        return;
    }
  }
}());