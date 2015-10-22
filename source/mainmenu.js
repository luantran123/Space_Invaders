Break.MainMenu = function(game) {
    var button;
    var supermario;
    var boden;
};

Break.MainMenu.prototype = {
    create: function() {
        background = this.add.tileSprite(0, 0, 1024, 768, 'mario0');
        button= this.game.add.button(200, 430, 'startbutton', this.startGame, this, 1, 0, 2);
        button.anchor.setTo(0.5,0.5);
        
        
        
        //Olivier: Supermario bewegt sich(so wie Ball), er soll aber nicht vom unteren Rand der Welt abprallen sondern von "Boden"
        supermario= this.add.sprite(190, 580, 'supermario');
        supermario.scale.set(0.5);
        supermario.anchor.set(0.5);

        this.physics.arcade.enable(supermario);
    	supermario.body.velocity.setTo(0, -700);
        supermario.body.gravity.set(0, 7000);
        supermario.body.collideWorldBounds = true;
        supermario.checkWorldBounds = true;
        supermario.body.bounce.set(1);
        supermario.body.immovable = true;
        
        
        //Olivier: Das hier ist "Boden". Mario soll darauf herumhüpfen (so wie Cursor)
        boden= this.add.sprite(0, 705, 'boden');
        this.physics.arcade.enable(boden);
        
        boden.body.immovable = true;
        boden.body.collideWorldBounds = true;
        boden.checkWorldBounds = true;
        boden.body.bounce.set(1);
            

        
    },
    
    
    startGame: function() {
        this.game.state.start('Game');
    }
    
};