(function() {

  mit.Pakia = function() {

    // Default type will be angry
    this.type = 'angry';
    this.sound = mit.audio.loadAngry;

    // Cheating on a bit with the physics
    // cant have same gravity for pappu and pakias :(
    this.gravity = 0.3;

    this.x;
    this.y;
    this.w;
    this.h;
    this.rotate_angle;
    this.isDead;

    this.draw = function(ctx) {
      ctx.save();

      ctx.translate(this.x, this.y);
      ctx.translate(this.w/2, this.h/2);
      ctx.rotate(utils.toRadian(this.rotate_angle));

      ctx.drawImage(mit.PakiaUtils.pakia_img[this.type], 0, 0, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
      ctx.restore();
    };

    this.generateRandomPos = function() {
      this.rotate_angle = 0;
      this.isDead = false;

      this.x = mit.config.canvas_width/2 + utils.randomNumber(0, 300);
      this.y = mit.config.canvas_height;
    };

    this.generateRandomVelocity = function() {
      this.vx = -12;
      this.vy = utils.randomNumber(-18,-14);
    };

    this.getBounds = function() {
      var bounds = {};

      bounds.start_x = this.x;
      bounds.start_y = this.y;
      bounds.end_x = this.x + this.w;
      bounds.end_y = this.y + this.h;

      return bounds;
    };
  };


  mit.PakiaUtils = {

    pakias: [],

    // Only 1 pakia at once, to make sure
    // gameplay is not terribly hard
    // as forks and branches have already
    // made it quite hard.
    cur_pakia: false,

    types: [
      'sad', // pulls
      'happy', // pushes
      'angry' // kills
    ],

    // Sounds
    sounds: [
      mit.audio.loadAngry,
      mit.audio.loadSad,
      mit.audio.loadHappy
    ],      

    pakia_img: {
      sad: {},
      happy: {},
      angry: {}
    },

    init: function() {

      // Loading All Pakia Images

      // this.pakia_img.sad = new Image();
      // this.pakia_img.sad.src = 'img/sad_pakia.png';
      this.pakia_img.sad = mit.image.sad_pakia;

      // this.pakia_img.happy = new Image();
      // this.pakia_img.happy.src = 'img/happy_pakia.png';
      this.pakia_img.happy = mit.image.happy_pakia;

      // this.pakia_img.angry = new Image();
      // this.pakia_img.angry.src = 'img/angry_pakia.png';
      this.pakia_img.angry = mit.image.angry_pakia;
    },

    createPakias: function() {

      for (var i = 0; i < 3; i++) {
        var pakia = new mit.Pakia();
        pakia.w = this.pakia_img.sad.width;
        pakia.h = this.pakia_img.sad.height;

        pakia.generateRandomPos();

        pakia.generateRandomVelocity();

        pakia.type = this.types[i];
        // pakia.type = this.types[0];

        if (pakia.type == 'angry')
          pakia.sound = this.sounds[0];
        else if (pakia.type == 'sad')
          pakia.sound = this.sounds[1];
        else if (pakia.type == 'happy')
          pakia.sound = this.sounds[2];

        this.pakias.push(pakia);
      }

      //console.log(this.pakias);
    },

    died: function(pak) {
      this.cur_pakia.isDead = true;

      if(this.cur_pakia.y > mit.H)
        return true;
    },

    reflow: function(ctx) {


      if (!this.cur_pakia) {
        // cur_pakia is one thats currently visible
        // that is, in the air!

        // Object by Reference!
        this.cur_pakia = this.pakias[utils.randomNumber(0,2)];

        this.cur_pakia.generateRandomPos();
        this.cur_pakia.generateRandomVelocity();
      }

      this.cur_pakia.vy += this.cur_pakia.gravity;

      if(this.cur_pakia.isDead == false) {
        this.cur_pakia.x += utils.f2T(delta, this.cur_pakia.vx);
        this.cur_pakia.y += utils.f2T(delta, this.cur_pakia.vy);
      }
      else {
        this.cur_pakia.rotate_angle += 10;
        this.cur_pakia.x += utils.f2T(delta, -1);
        this.cur_pakia.y += utils.f2T(delta, this.cur_pakia.vy);
      }
      // console.log(this.cur_pakia.x)  

      // Reset positions
      if (
        this.cur_pakia.x + this.cur_pakia.w < 0 ||
        this.cur_pakia.y > mit.H
        ) {
        this.cur_pakia.generateRandomPos();

        this.cur_pakia.generateRandomVelocity();

        // Important! since JS's game's all about
        // objects by reference.
        if (this.cur_pakia.has_stuck)
          delete this.cur_pakia.has_stuck;

        // wont set the referenced pointer to
        // false, so we're safe :D
        this.cur_pakia = false;
      }
    },

    repaint: function(ctx) {
      if (this.cur_pakia)
        this.cur_pakia.draw(ctx);
    },

    render: function(ctx) {
      if (!this.pakias.length) {
        this.createPakias();
      }

      if (mit.score.toFixed(2) % 20 === 0 || this.cur_pakia) {
        this.reflow(ctx);
        this.repaint(ctx);
      }

      if (mit.score.toFixed(2) % 20 === 0 && this.cur_pakia) {
        this.cur_pakia.sound.play();
      }
    },

    checkCollision: function(ctx) {
      if (!this.cur_pakia || this.cur_pakia.isDead)
        return;

      var pappu_bounds = mit.Pappu.getBounds();
      var pakia_bounds = this.cur_pakia.getBounds();

      if (
        pappu_bounds.end_x     >  pakia_bounds.start_x+20 &&
        pakia_bounds.end_x-20  >  pappu_bounds.start_x    &&
        pappu_bounds.end_y     >  pakia_bounds.start_y+20 &&
        pakia_bounds.end_y-20  >  pappu_bounds.start_y
      ) {

        if(!mit.Pappu.invincible) {
          // Depending upon the type of the pakia
          switch (this.cur_pakia.type) {
            case 'angry':
              mit.audio.loadHit.play();
              mit.stopMotion();
              break;

            case 'sad':
              // Pull

              if (!this.cur_pakia.has_stuck) {
                mit.audio.loadHit.play();
                mit.vy = 10;
                this.cur_pakia.vy = 10;
                this.cur_pakia.vx = 0;

                mit.bonus = (mit.score - 100 > 199) ? -100 : - parseInt(mit.score - 200);
                mit.score += mit.bonus;
              }

              this.cur_pakia.has_stuck = 1;

              break;

            case 'happy':
              // Push

              if (!this.cur_pakia.has_stuck) {
                if (this.cur_pakia.vy < 0)
                  mit.vy -= 10;
                else
                  mit.vy += 10;

                mit.bonus = (mit.score - 100 > 199) ? -100 : - parseInt(mit.score - 200);
                mit.score += mit.bonus;

                mit.audio.loadHit.play();
              }

              this.cur_pakia.has_stuck = 1;


              break;
          }
        }

        else {
          mit.audio.loadHit.play();
          mit.PakiaUtils.died(this.cur_pakia);

          mit.bonus = 100;
          mit.score += 100;
        }

      }

      return;
    }

  };

}());