(function() {

  // There will be only 1 Pappu

  mit.Pappu = {
    x: 40,
    y: 10,
    w: 50,
    h: 50,

    invincible: 0,
    invincibility_start: 0,
    invincibility_time: 0,
    clones: [],

    is_dead: false,

    rotate_angle: 0,

    sprite: {},
    sound: '',

    // Rate of sprite frame change
    // per animation frame.
    change_per_frame: 10,

    fly_frame_count: 0,
    max_fly_frame_count: 10,

    init: function() {
      this.sound = mit.audio.loadFlap;

      // Initializing Pappu Sprite, lolzzz..!
      // this.sprite = new Image();
      // this.sprite.src = 'img/pappu.png';
      this.sprite = mit.image.pappu;

      //pappu.w = pappu.sprite.width;
      mit.Pappu.w = mit.Pappu.sprite.width;
      mit.Pappu.h = 60;

      // Sprite Frame Count
      mit.Pappu.max_fly_frame_count = 8;
      mit.Pappu.max_fly_frame_count--;

      // Sprite Frame Change Speed.
      // This will affect the flap speed.
      // 1.6 is the perfect value!
      mit.Pappu.change_per_frame = 1.6;

      // X Pos
      mit.Pappu.x = 33;
    },

    undoInvincible: function() {
      this.invincible = 0;
      this.invincibility_start = 0;
      this.invincible_timer = 0;

      // CocoonJS.App.forward("ui.invincible_timer.hide();");
    },

    draw: function(ctx) {
      var cur_sprite_frame = this.fly_frame_count / this.change_per_frame;
      
      if (utils.isInt(cur_sprite_frame)) {
        var source_y = cur_sprite_frame * 60;
      }

      else {
        //var old_sprite_frame = parseInt(this.fly_frame_count/this.change_per_frame)%this.change_per_frame;

        // Ultra smooth animations
        var old_sprite_frame = parseInt(this.fly_frame_count/this.change_per_frame)
        var source_y = old_sprite_frame * 60;
      }
      
      // console.log(cur_sprite_frame, source_x);

      // Rotation on Flying
      if (mit.flying_up) {
        this.sound.play();

        if (this.rotate_angle > -15) {
          this.rotate_angle -= utils.f2T(delta, 2);
        }
      }
      else if (this.is_dead) {
        // draw() is called as long as
        // pappu hasnt hit boundaries and over'ed the game :P

        // Game Over Gugglu!
        this.rotate_angle += utils.f2T(delta, 4);
      }
      else {
        if (this.rotate_angle < 30) {
          this.rotate_angle += utils.f2T(delta, 2);
        }
      }

      ctx.save();

      ctx.translate(this.x, this.y);
      ctx.translate(this.w/2, this.h/2);
      ctx.rotate(utils.toRadian(this.rotate_angle));

      if (this.invincible) {
        ctx.globalAlpha = 0.4;

        // Current time
        // var cur_time = new Date().getTime();
        // var time_diff = cur_time - this.invincibility_start;
        this.invincibility_start += utils.f2T(delta, 1);

        var timer_progress = (this.invincibility_start/this.invincibility_time) * 100;

        if (timer_progress > 100)
          this.undoInvincible();
        else {

          ctx.save();
          ctx.rotate(utils.toRadian(-this.rotate_angle));
          ctx.globalAlpha = 0.8;
          // CocoonJS.App.forward("ui.invincible_loader.css('width', " + (100 - timer_progress) + " + '%')");
          elem.game_screen.invinceBar.draw(ctx, -this.w/2, -this.h/2, 100 - timer_progress);
          ctx.rotate(utils.toRadian(this.rotate_angle));
          ctx.restore();

          ctx.globalAlpha = 0.4;
        }

        // console.log(timer_progress)
      }

      ctx.drawImage(
          this.sprite,
          0,
          source_y,
          this.w,
          60,
          -this.w/2,
          -this.h/2,
          this.w,
          60
        );

      ctx.restore();
    },

    drawStatic: function(ctx) {
      var cur_sprite_frame = this.fly_frame_count / this.change_per_frame;
      
      if (utils.isInt(cur_sprite_frame)) {
        var source_y = cur_sprite_frame * 60;
      }

      else {
        //var old_sprite_frame = parseInt(this.fly_frame_count/this.change_per_frame)%this.change_per_frame;

        // Ultra smooth animations
        var old_sprite_frame = parseInt(this.fly_frame_count/this.change_per_frame)
        var source_y = old_sprite_frame * 60;
      }


      this.y = mit.Backgrounds.log_y-42;

      /*ctx.drawImage(
        this.sprite,
        0,
        0,
        this.w,
        60,
        this.x,
        this.y,
        this.w,
        60
      );*/
      
      ctx.drawImage(
        this.sprite,
        0,
        source_y,
        this.w,
        60,
        this.x,
        this.y,
        this.w,
        60
      );
    },

    updateFlyFrameCount: function(count) {
      if (typeof count !== 'number') {
        this.fly_frame_count++;

        if (parseInt(this.fly_frame_count/this.change_per_frame) > this.max_fly_frame_count) {
          this.fly_frame_count = 0;
        }

        return;
      }

      this.fly_frame_count = count;
    },

    hasReachedBoundary: function(canvas_width, canvas_height) {
      // Crossed Sides ?
      // `c` stands for crossed

      var ctop = (this.y < 0);
      var cbtm = (this.y > mit.H);
      var cleft = (this.x < 0);
      var crgt = (this.x + this.w > mit.W);

      // console.log(ctop, cbtm, cleft, crgt);

      // return true if crossed any sides

      if(ctop) {
        mit.audio.loadHit.play();
        mit.stopMotion();
        return false;
      }

      if (cbtm || cleft || crgt) {
        return true;
      }

      return false;
    },

    getBounds: function() {
      var b = {};

      b.start_x = this.x;
      b.start_y = this.y;
      b.end_x   = this.x + this.w;
      b.end_y   = this.y + this.h;

      return b;
    },

    createClones: function(count) {
      // This method will be usually called
      // when pappu gathers a 'clone' collectible.

      var pappu_clone;

      for (var i = 0; i < count; i++) {
        pappu_clone = Object.create(mit.Pappu);

        pappu_clone.invincible = 0;

        this.clones.push(pappu_clone);
      }

      return;
    },

    drawClones: function(ctx) {

      var self = this;

      self.clones.forEach(function(clone, index) {
        if (clone.x > mit.W || clone.y < 0 || clone.y > mit.H)
          self.clones.splice(index, 1);

        clone.x += utils.f2T(delta, utils.randomNumber(5, 10));
        clone.y += utils.f2T(delta, utils.randomNumber(-20, 20));

        clone.draw(ctx);
      });

      return;
    },

    checkCloneCollision: function() {

      var self = this;

      // super optimization :P
      if (!self.clones.length)
        return;
      
      var branches = mit.BranchUtils.branches;
      var forks = mit.ForkUtils.forks;
      var pakias = mit.PakiaUtils.pakias;

      // Check collisions with branches
      branches.forEach(function(branch, branch_index) {
        var branch_bound = branch.getBounds();

        var branch_broke = 0;

        self.clones.forEach(function(clone) {

          if (branch_broke)
            return;

          var clone_bound = clone.getBounds();

          if (utils.intersect(branch_bound, clone_bound)) {
            branches.splice(branch_index, 1);

            branch_broke = 1;
          }
        });

        return;
      });

      // Check collisions with forks
      forks.forEach(function(fork, fork_index) {
        var fork_head_bound = fork.getHeadBounds();
        var fork_handle_bound = fork.getHandleBounds();

        var fork_broke = 0;

        self.clones.forEach(function(clone) {

          if (fork_broke)
            return;

          var clone_bound = clone.getBounds();

          if (
            utils.intersect(fork_head_bound, clone_bound) ||
            utils.intersect(fork_handle_bound, clone_bound)
          ) {

            // 2 pakias could kill same fork
            // hence just check whether it exists or not
            forks.splice(fork_index, 1);

            fork_broke = 1;
          }

          return;
        });

        return;
      });

      // Check collisions with pakias
      pakias.forEach(function(pakia, pakia_index) {
        var pakia_bound = pakia.getBounds();
        var pakia_dead = false;

        self.clones.forEach(function(clone) {

          if (pakia_dead)
            return;

          var clone_bound = clone.getBounds();

          if(!mit.PakiaUtils.cur_pakia.isDead && (mit.PakiaUtils.cur_pakia.h/2 + mit.PakiaUtils.cur_pakia.y < H)) {
            if (utils.intersect(pakia_bound, clone_bound)) {
              // mit.PakiaUtils.cur_pakia = false;
              mit.audio.loadHit.play();
              pakia_dead = mit.PakiaUtils.died(mit.PakiaUtils.cur_pakia);

              if(!mit.PakiaUtils.cur_pakia.has_stuck) {
                mit.bonus = 100;
                mit.score += 100;
              }

              mit.PakiaUtils.cur_pakia.has_stuck = 1;

            }
          }

          return;
        });

        return;
      });

      return;
    }
  };

}());