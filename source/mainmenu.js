Break.MainMenu = function(game) {
    var startbutton;
    var soundbutton;
    var hardbutton;
    var supermario;
    var boden;
};

Break.MainMenu.prototype = {
    create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		//Activate Keyboard
	cursors = this.input.keyboard.createCursorKeys();
		
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
    	supermario.body.velocity.setTo(0, 0);
        supermario.body.gravity.set(0, 600);
        supermario.body.collideWorldBounds = true;
        supermario.checkWorldBounds = true;
        supermario.body.bounce.set(0.21);
        //supermario.body.immovable = true;
    
        
        //Olivier: Das hier ist "Boden". Mario soll darauf herumhüpfen (so wie Cursor)
        boden= this.add.sprite(0, 705, 'boden');
        this.physics.arcade.enable(boden);
        
        boden.body.immovable = true;
        boden.body.collideWorldBounds = true;
        boden.checkWorldBounds = true;
        boden.body.bounce.set(1);
            
		this.physics.arcade.collide(supermario, boden);

        
    },
    
    update: function() {
	
	this.physics.arcade.collide(supermario, boden);
	
	//  Reset the velocity
	supermario.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        supermario.body.velocity.x = -150;

        supermario.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        supermario.body.velocity.x = 150;

        supermario.animations.play('right');
    }
    else
    {
        //  Do nothing
        supermario.animations.stop();

        supermario.frame = 4;
    }

    //  Jump only if Mario is already touching the ground
    if (cursors.up.isDown && supermario.body.touching.down)
    {
        supermario.body.velocity.y = -550;
    }
	
	},
	
    startGame: function() {
        this.game.state.start('Game');
    }
    
};