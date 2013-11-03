(function() {

  // Game screen will contain a pause button
  // and current score


  // Bonus thingy
  var scoreBonus = function(ctx, bonus) {
    this.x = W/2;
    this.y = H/2;
    this.opacity = 1;
    this.bonus = bonus;

    this.draw = function(ctx) {
        ctx.save();

        ctx.font = '48px Happy Sans';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        if(this.bonus < -1) {
          ctx.fillStyle = 'rgba(156, 0, 0, ' + this.opacity + ')';
          ctx.fillText(this.bonus, this.x, this.y);
        }
        else if(this.bonus > 1) {
          ctx.fillStyle = 'rgba(0, 156, 0, ' + this.opacity + ')';
          ctx.fillText("+" + this.bonus, this.x, this.y);
        }
        ctx.restore();

        this.y -= 4;
        this.opacity -= 0.02;

        mit.bonus = false;
    }
  }

  elem.game_screen = {
    isVisible: false,

    // Score
    scoreText: {
      x: 40,
      y: 30,

      draw: function(ctx, score) {
        ctx.save();
        ctx.textBaseline = 'top';
        ctx.font = "48px Happy Sans";
        ctx.fillStyle = 'black';
        ctx.fillText(score, this.x, this.y);
        ctx.restore();
      }
    },

    pauseBtn: {
      x: W - 20 - 80 - 40,
      y: 30,
      w: 80,
      h: 40,

      draw: function(ctx) {

        if(!mit.isPaused) {
          ctx.save();
          ctx.textBaseline = 'top';
          ctx.font = "48px Happy Sans";
          ctx.fillStyle = 'white';
          ctx.fillText("Pause", this.x, this.y);
          ctx.restore();
          // console.log('yadda');
        }
      },

      tap: function(tx, ty) {
        if(!elem.game_screen.isVisible)
          return false;

        if(
            tx > this.x - 20 && 
            tx < this.x + this.w + 20 && 
            ty > this.y - 20 && 
            ty < this.y + this.h + 40
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

    invinceBar: {
      w: 65,
      h: 10,

      draw: function(ctx, x, y, percent) {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(x + (this.w/2) - (this.w * percent / 200), y - 20, this.w * percent / 100, this.h);
        ctx.restore();
      }
    },

    /*
    scoreBonus: {
      opacity: 1,
      x: W/2,
      y: H/2,

      draw: function(ctx, bonus) {
        if(bonus) {
          ctx.save();

          ctx.font = '48px Happy Sans';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(0, 156, 0, ' + this.opacity + ')';
          if(bonus < -1) {
            ctx.fillStyle = 'rgba(156, 0, 0, ' + this.opacity + ')';
            ctx.fillText(bonus, this.x, this.y);
          }
          else if(bonus > 1) {
            ctx.fillStyle = 'rgba(0, 156, 0, ' + this.opacity + ')';
            ctx.fillText("+" + bonus, this.x, this.y);
          }
          ctx.restore();

          this.y -= 4;
          this.opacity -= 0.02;

          if(this.opacity < 0) {
            mit.bonus = false;
            this.opacity = 1;
            this.y = H/2;
          }
        }
      }
    },
    */

    bonuses: [],

    draw: function(ctx, score, bonusInt) {
      if(mit.start_btn_clicked) {
        this.pauseBtn.draw(ctx);
        this.scoreText.draw(ctx, score);

        // this.scoreBonus.draw(ctx, bonus)
        if(bonusInt) {
          this.bonuses.push(new scoreBonus(ctx, bonusInt));
        }

        if(this.bonuses.length) {
          this.bonuses.forEach(function(bonus, ind) {
            bonus.draw(ctx);

            if(bonus.opacity < 0)
              elem.game_screen.bonuses.splice(ind, 1);
          });
        }

        if(!mit.game_started)
          this.instruction.draw(ctx);
      }
    }
  };
}());
