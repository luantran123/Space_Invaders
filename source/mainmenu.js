Break.MainMenu = function(game) {
    var startbutton;
    var soundbutton;
    var hardbutton;
    var supermario;
    var boden;
    //var key1;
    //var key2;
};

Break.MainMenu.prototype = {
    create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		//Activate Keyboard
	cursors = this.input.keyboard.createCursorKeys();
		
      
        
        background = this.add.tileSprite(0, 0, 1024, 768, 'mario0');
      
        
        
        /* Bitte nicht löschen
        key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        key1.onDown.add(this.movemarioleft, this);
        key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        key2.onDown.add(this.movemarioright, this);
        */
        
        //Olivier: Supermario bewegt sich(so wie Ball), er soll aber nicht vom unteren Rand der Welt abprallen sondern von "Boden"
        supermario= this.add.sprite(190, 580, 'supermario');
        supermario.scale.set(0.5);
        supermario.anchor.set(0.5);

        this.physics.arcade.enable(supermario);

    	supermario.body.velocity.setTo(0, 0);
        supermario.body.gravity.set(0, 6000);
        supermario.body.collideWorldBounds = true;
        supermario.checkWorldBounds = true;
        supermario.body.bounce.set(0.21);
    
        
        //Olivier: Das hier ist "Boden". Mario soll darauf herumhüpfen (so wie Cursor)
        boden= this.add.sprite(0, 705, 'boden');
        this.physics.arcade.enable(boden);
        
        boden.body.immovable = true;
        boden.body.collideWorldBounds = true;
        boden.checkWorldBounds = true;
        boden.body.bounce.set(1);
        
        
        //Startknopf
        
        startbutton= this.add.sprite(200, 422, 'startbutton');
        startbutton.anchor.setTo(0.5,0.5);
        this.physics.arcade.enable(startbutton);
        startbutton.body.immovable = true;
        startbutton.body.collideWorldBounds = true;
        startbutton.checkWorldBounds = true;
        startbutton.body.bounce.set(1);
        
        //Soundknopf
        soundbutton= this.add.sprite(830, 430, 'soundbutton');
        soundbutton.anchor.setTo(0.5,0.5);
        this.physics.arcade.enable(soundbutton);
        soundbutton.body.immovable = true;
        soundbutton.body.collideWorldBounds = true;
        soundbutton.checkWorldBounds = true;
        soundbutton.body.bounce.set(1);
        
        //Schwierigkeitsknopf
        
         hardbutton= this.add.sprite(515, 430, 'hardbutton');
        hardbutton.anchor.setTo(0.5,0.5);
        hardbutton.scale.set(0.13);
        this.physics.arcade.enable(hardbutton);
        hardbutton.body.immovable = true;
        hardbutton.body.collideWorldBounds = true;
        hardbutton.checkWorldBounds = true;
        hardbutton.body.bounce.set(1);
        
    },
    

       
    update: function() {
	
	this.physics.arcade.collide(supermario, boden);
    this.physics.arcade.collide(supermario, startbutton, this.marioHitStart, null, this);
        this.physics.arcade.collide(supermario, hardbutton);
        this.physics.arcade.collide(supermario, soundbutton);
	
	//  Reset the velocity
	//supermario.body.velocity.x = 0;
         if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {

            supermario.x -= 25;
            
        supermario.animations.play('left');

        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {


            supermario.x += 12;
            
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
        supermario.body.velocity.y = -2150;
    }
	
	},
	

    startGame: function() {
        this.game.state.start('Game');
    },
    
    marioHitStart: function() {
         if(supermario.body.touching.up){
        this.startGame();}
    }
    
};