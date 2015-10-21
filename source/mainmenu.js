Break.MainMenu = function(game) {
var button;
};
Break.MainMenu.prototype = {
    create: function() {
         bckgr = this.add.tileSprite(0, 0, 1024, 768, 'mario0');
       this.startButton = this.game.add.button(this.game.width/2, 500, 'menu', this.startGame, this);
    this.startButton.anchor.setTo(0.5,0.5);
    },
    startGame: function() {
        this.game.state.start('Game');
    }
};