var Break = {};
Break.Boot = function(game) {};
Break.Boot.prototype = {
    preload: function() {
        
        this.game.load.image('laden','images/jpg.png');
    },
    create: function() {
       // this.input.maxPointers = 1;
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.state.start('Preloader');
    }
}