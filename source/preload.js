Break.Preloader = function(game){};

Break.Preloader.prototype = {
    
    preload: function() {
        
        
        
    this.load.image('cursor', 'images/cursor.png');
    this.load.image('leicht', 'images/bloecke/blockleicht/leicht.png');
    this.load.image('Schwer1', 'images/bloecke/blockschwer/StufeEins.png');
    this.load.image('Schwer2', 'images/bloecke/blockschwer/StufeZwei.png');
    this.load.image('Schwer3', 'images/bloecke/blockschwer/StufeDrei.png');
    this.load.image('Schwer4', 'images/bloecke/blockschwer/StufeVier.png');
    this.load.image('ball', 'images/ball.png');
    this.load.image('mario1','images/hintergrund.png');
    this.load.image('mario0','images/startbackground.png');
    this.load.spritesheet('menu','images/jpg.png', 128,128);

    },
    
    
    create: function() {
    this.state.start('MainMenu');
    }
};