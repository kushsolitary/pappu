(function () {

  var Obj = {};
  Obj.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
  };

  // Preloading image stuff

  mit.audio = {
    loadMusic: 'sound/music.ogg', 
    loadAngry: 'sound/jump1.ogg', 
    loadSad: 'sound/jump2.ogg', 
    loadHappy: 'sound/jump3.ogg',
    loadFlap: 'sound/flap.ogg', 
    loadTing: 'sound/ting.ogg',
    loadBite: 'sound/bite.ogg',
    loadCoin: 'sound/coin.ogg',
    loadHit: 'sound/hit.ogg',
    loadButton: 'sound/button.ogg'
  };

    for (var name in mit.audio) {
      var url = mit.audio[name];

      // Create an audio node
      var audio_el = document.createElement('audio');
      audio_el.id = name;

        audio_el.src = url;
        audio_el.load();
        mit.audio[name] = audio_el;
    }

  var images = {
    angry_pakia : "img/angry_pakia.png",
    backtrees : "img/back_trees.png",
    berries : "img/berries.png",
    // bg_combined: "img/bg_combined.png",
    branch : "img/branch_new.png",
    clouds : "img/clouds.png",
    coins : "img/coins.png",
    // controls : "img/controls.png",
    //dig : "img/dig.png",
    fork_handle : "img/fork_handle.png",
    fork_head : "img/fork_head.png",
    fronttrees : "img/front_trees.png",
    grass : "img/grass.png",
    ground : "img/ground.png",
    happy_pakia : "img/happy_pakia.png",
    log : "img/log.png",
    pappu : "img/pappu.png",
    plank_bot : "img/plank_bot.png",
    plank_mid : "img/plank_mid.png",
    plank_top : "img/plank_top.png",
    sad_pakia : "img/sad_pakia.png",
    stand : "img/stand.png",
    star : "img/star.png"
  };

  mit.image = {};

  // Get the size of an Obj
  var size = Obj.size(images);

  var counter = 0,
      percent = 0;

  for(var src in images) {
    mit.image[src] = new Image();
    mit.image[src].onload = function() {
      counter++;

      percent = Math.floor(((counter)/size*100));
      
      if(percent >= 100) {
        mit.main();
      }

    };

    mit.image[src].src = images[src];
  }

}());