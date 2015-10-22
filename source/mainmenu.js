Break.MainMenu = function(game) {
    var startbutton;
    var soundbutton;
    var hardbutton;
    var supermario;
    var boden;
};

Break.MainMenu.prototype = {
    create: function() {
        background = this.add.tileSprite(0, 0, 1024, 768, 'mario0');
        startbutton= this.game.add.button(200, 430, 'startbutton', this.startGame, this);
        startbutton.anchor.setTo(0.5,0.5);

	soundbutton= this.game.add.button(830, 430, 'soundbutton',this.startGame, this);
        soundbutton.anchor.setTo(0.5,0.5);

	hardbutton= this.game.add.button(515, 430, 'hardbutton',this.startGame,  this);
        hardbutton.anchor.setTo(0.5,0.5);
	hardbutton.scale.set(0.13);
        
        
        
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