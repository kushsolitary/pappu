
mit.main = function() {

  // rAF
  window.requestAnimationFrame = function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(f) {
        window.setTimeout(f,1e3/60);
      }
  }();

  // cAF
  window.cancelAnimationFrame = function() {
    return window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function(f) {
        window.setTimeout(f,1e3/60);
      }
  }();

  var config = mit.config = {

  };

  /*
  Basic Canvas Inits
  */

  // Main Canvas

  // Responsive fonts!
  CocoonJS.App.forward("$('html').css('font-size', (100/scale) + '%');");

  var canvas = CocoonJS.App.createScreenCanvas();
  var ctx = canvas.getContext('2d');

  W = canvas.width = 1136;
  H = canvas.height = 640;

  mit.music = mit.audio.loadMusic;
  mit.music.loop = true;
  var flap = mit.audio.loadFlap;
  mit.music.volume = 0.2;
  
  mit.isMute = false;
  mit.isPaused = false;

  mit.music.play();


  /*
    Game Start Screen and Lolz
  */
  mit.game_started = 0;
  mit.game_over = 0;
  mit.start_btn_clicked = 0;


  // Start Button
  mit.startGame = function(level) {
    // Play the awesome music! Really awesome
    elem.game_screen.isVisible = true;
    mit.level = level;

    flap.pause();

    /*
    mit.music.addEventListener('ended', function() {
      mit.music.play();
    }, false);
    */

    // Hide the Start Screen

    // Start btn has been clicked
    // Game hasnt started. Game will
    // start on flight.
    mit.start_btn_clicked = 1;
    mit.game_started = 0;

    mit.Backgrounds.common_bg_speed = (mit.level > 0) ? ((mit.level == 1) ? 1.2 : 1.4) : 1;
    mit.Backgrounds.resetAllSpeed();

    // Reset all accelerations and make
    // pappu stationary
    mit.Pappu.drawStatic(ctx);
    mit.ax = 0; mit.ay = 0;
    mit.vx = 0; mit.vy = 0;

    // if game over due to hitting someone
    // he'll rotate a lot. so need ta reset
    // on restart
    mit.Pappu.rotate_angle = 0;

    // reset score
    mit.score = 0;

    // Nuke all forks
    mit.ForkUtils.forks = [];
    // Nuke all branches
    mit.BranchUtils.branches = [];
    // Nuke all collectibles
    mit.CollectibleUtils.collecs = [];
    // Nuke all pakias and cur_pakia
    mit.PakiaUtils.pakias = [];
    mit.PakiaUtils.cur_pakia = false;
  };

/*
  document.addEventListener('touchstart', function() {
    if (!mit.game_started)    
      startGame();

    return false;
  }, false);
*/


  // startGame();
  // Score Board
  mit.score = 0;

  if(localStorage.getItem("highScore")) {
    mit.highScore = JSON.parse(localStorage.getItem("highScore"));
    if (mit.highScore)
      CocoonJS.App.forward('ui.high_score.each(function() {$(this).text("High Score: "+ ' + mit.highScore + ');});');
    else
      CocoonJS.App.forward('ui.high_score.each(function() {$(this).text("High Score: "+ ' + 0 + ');});');
  }
  else
      CocoonJS.App.forward('ui.high_score.each(function() {$(this).text("High Score: "+ ' + 0 + ');});');

  // Set Canvas Width/Height in Config
  mit.config.canvas_width = mit.W = W;
  mit.config.canvas_height = mit.H = H;

  // Gravity
  mit.gravity = 0.8;

  // Velocity x,y
  mit.vx = 0;
  mit.vy = 0;

  // Velocity cap on either sides of the
  // number system.
  // 
  // You can console.log velocities in drawing methods
  // and from there decide what to set as the cap.
  mit.v_cap = (mit.level > 0) ? ((mit.level == 1) ? 12 : 14) : 10;

  // Accelaration x,y
  mit.ax = 0;
  mit.ay = 0;

  // Flying up ?
  mit.flying_up = 0;

  mit.ascend = function() {
    if (!mit.start_btn_clicked)
      return;

    if (!mit.game_started) {
      mit.game_started = 1;
      mit.game_over = 0;
    }

    mit.ay = -1.5;
    mit.flying_up = 1;
  };

  mit.descend = function() {
    if (!mit.start_btn_clicked)
      return;

    mit.ay = 0;
    mit.flying_up = 0;
  };


  // Game play on touch too!
  window.addEventListener('touchstart', function(e) {
    mit.ascend();


  }, false);

  window.addEventListener('touchend', function(e) {
    mit.descend();

    // Check if buttons are pressed and show respective screens / perform actions
    for(var i = 0; i < e.changedTouches.length; i++) {
      var t = e.changedTouches[i];
      var x = t.pageX;
      var y = t.pageY;

      if(elem.game_screen.pauseBtn.tap(x, y)) {
        // Show pause menu

        if(!elem.pause_screen.isVisible) {
          mit.music.pause();
          mit.isPaused = true;
        }
        else {
          mit.music.play();
          mit.isPaused = false;
          elem.pause_screen.remove(ctx);
          CocoonJS.App.resume();
        }
      }
    }

  }, false);




  /*
    Performing some game over tasks
  */
  mit.gameOver = function() {

    elem.game_screen.isVisible = false;
    
    // High Score
    if (mit.score > mit.highScore) {
      mit.highScore = parseInt(mit.score);
      localStorage.setItem("highScore", JSON.stringify(parseInt(mit.score)));

      CocoonJS.App.forward('ui.high_score.each(function() {$(this).text("High Score: "+ ' + mit.highScore + ');});');

    }

    mit.descend();

    // Stop background
    mit.Backgrounds.common_bg_speed = 0;
    mit.Backgrounds.ground_bg_move_speed = 0;
    mit.Backgrounds.fps = 0;

    mit.game_over = 1;
    mit.start_btn_clicked = 0;

    // Pappu if invincible will be no morez
    mit.Pappu.undoInvincible();

    // Nuke all clones
    mit.Pappu.clones.length = 0;

    // CocoonJS.App.forward("changeURL();");

    CocoonJS.App.forward("showGOScreen();");
  };

  mit.last_time = new Date();



  // Initializations
  mit.Backgrounds.init(ctx);
  mit.ForkUtils.init();
  mit.BranchUtils.init();
  mit.CollectibleUtils.init();
  mit.Pappu.init();
  mit.PakiaUtils.init();


  (function renderGame() {
    window.requestAnimationFrame(renderGame);

    // Draw Backgrounds on BG Canvas

    ctx.clearRect(0, 0, W, H);
    mit.Backgrounds.draw(ctx);

    // 
    if (mit.isPaused) {
      elem.pause_screen.draw(ctx);
      CocoonJS.App.pause();
    }

    // Draw Digs (holds forks)
    // I am fine without Digs, but Kushagra
    // just WANTS me to do this extra work :/
    // mit.ForkUtils.drawDigs(ctx);

    // Draw Grass on Main Canvas
    // mit.Backgrounds.drawGrass(ctx);

    if (mit.flying_up || !mit.game_started)
      mit.Pappu.updateFlyFrameCount();
    else
      mit.Pappu.updateFlyFrameCount(0);


    // Game over on reaching any boundary
    if (mit.Pappu.hasReachedBoundary(W, H)) {
      if (mit.game_over)
        return;

      // Performing some game over tasks
      mit.gameOver();
      return;
    }

    //mit.ForkUtils.draw(ctx);
    //mit.BranchUtils.draw(ctx);

    //mit.ForkUtils.checkCollision();

    // Send over Pakias (Enemies)
    // mit.PakiaUtils.render(ctx);

    // Collectibles
    // mit.CollectibleUtils.draw(ctx);

    // mit.Pappu.createClones(3);

    if (mit.game_started) {

      // Drawin stuff
      mit.ForkUtils.draw(ctx);
      mit.BranchUtils.draw(ctx);
      mit.CollectibleUtils.draw(ctx);
      mit.Pappu.drawClones(ctx);

      // Check Collisions with pappu
      if (!mit.Pappu.invincible) {
        mit.ForkUtils.checkCollision();
        mit.BranchUtils.checkCollision();
        mit.PakiaUtils.checkCollision();
      }
      mit.CollectibleUtils.checkCollision();
      mit.Pappu.checkCloneCollision();

      // Send over Pakias (Enemies)
      if (mit.score > 199)
        mit.PakiaUtils.render(ctx);

      // Update score
      if (!mit.game_over) {
        mit.score = mit.score += 0.1;
      }

      // CocoonJS.App.forward("ui.score_board.text(" + parseInt(mit.score) + ");");
      elem.game_screen.draw(ctx, parseInt(mit.score));

      // Acceleration + Gravity
      // mit.ay = mit.ay + mit.gravity;
      
      // Velocity
      if (!mit.game_over) {
        if (
          (mit.vy < mit.v_cap && mit.ay+mit.gravity > 0) ||
          (mit.vy > -mit.v_cap && mit.ay+mit.gravity < 0)
          ) {

          // console.log(mit.ay);
          mit.vy += mit.ay;
          mit.vy += mit.gravity;
        }

        // console.log(vy, ay)

        mit.Pappu.x += mit.vx;
        mit.Pappu.y += mit.vy;

        if (mit.vy > mit.v_cap) {
          mit.vy = mit.v_cap;
        }
      }
      else {
        // on game over, he's gravity is unstoppable
        mit.vy += mit.gravity;
        mit.Pappu.y += mit.vy;
      }
    
      mit.Pappu.draw(ctx);
    }
    else {
      mit.Pappu.drawStatic(ctx);
    }

    // Calculate FPS
    mit.cur_time = new Date;
    mit.fps = 1e3 / (mit.cur_time - mit.last_time);
    mit.last_time = mit.cur_time;

    return;
  }());

};