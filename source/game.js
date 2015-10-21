Break.Game =function(game) {
   
};
 var cursor;
    var ball;
    var ballreleased;
    var score = 0;
    var scoreText;
    var life = 3;
    var lifeText;

Break.Game.prototype = {
    create: function() {

        //Variabeln
        ballreleased=false;

        //Hintergrund
        land = this.add.tileSprite(0, 0, 1024, 768, 'mario1');


        //Hinzufügen des Cursors
        cursor= this.add.sprite(this.world.centerX, 745, 'cursor');
        cursor.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(cursor);
        cursor.body.immovable = true;
        cursor.body.collideWorldBounds = true;
        cursor.body.bounce.set(1);

       this.createBall();

        //Hinzufügen der Blöcke 
        bricks = this.add.group();
        bricks.enableBody = true;

        bottom = this.add.group();
        bottom.enableBody = true;

            for (var y = 0; y < 3; y++)
            {
                for (var x = 0; x < 14; x++)
                {
                    var brick;
                    brick = bricks.create(100 + (x * 60), 100 + (y * 50), 'leicht', 'leicht.png');
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                }
            }

            for (var y = 3; y < 5; y++)
            {
                for (var x = 0; x < 14; x++)
                {
                    var brick;
                    brick = bricks.create(100 + (x * 60), 100 + (y * 50), 'Schwer1', 'StufeEins.png');
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                }
            }

        var bot = bottom.create(1024, 500, 'bottom', 'StufeEins.png');

        //Hinzufügen von Score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //Hinzufügen von Leben
        lifeText = this.add.text(900, 16, 'lifes: 3', { fontSize: '32px', fill: '#000'});

        //Maus aktivieren
        this.input.mouse.capture = true;



        //game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        //game.scale.pageAlignHorizontally=true;
        //game.scale.pageAlighVertically=true;
        //game.scale.setScreenSize(true);
    },


    update: function() {
        
        //Linker Mausklick
        if(!ballreleased)
        {
        if (this.input.activePointer.leftButton.isDown)
        {
            ball.body.allowGravity = true;
            ballreleased = true;
            ball.body.immovable = false;
            ball.body.velocity.y=-450;
        }
        else {}
        }


        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {

            cursor.x -= 20;
            if(!ballreleased){ 
            ball.x = cursor.x ;}

        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {


            cursor.x += 20;
            if(!ballreleased){ 
            ball.x = cursor.x ;}

        }


        if(ball.body.onFloor() || ball.body.touching.down)
        {
            this.ballHitBottom(ball);
        }

        this.physics.arcade.collide(ball, bricks, this.ballHitBrick, null, this);
        this.physics.arcade.collide(ball, cursor, this.ballHitCursor, null, this);
    },


    ballHitCursor: function(myBall, myCursor) {

        var diff = 0;

        if (myBall.x < myCursor.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = myCursor.x - myBall.x;
            myBall.body.velocity.x = (-8 * diff);
        }
        else if (myBall.x > myCursor.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = myBall.x - myCursor.x;
            myBall.body.velocity.x = (8 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            myBall.body.velocity.x = 2 + Math.random() * 8;
        }

    },


    ballHitBrick: function(myBall, myBrick) {

        score = score +10;
        scoreText.text = 'Score: ' + score;
        myBrick.kill();


    },  

    ballHitBottom: function(myBall) {

        if(life > 0)
        {

            life--;
            lifeText.text = 'lifes: ' + life;
            myBall.kill();
            ballreleased = false;
            this.createBall();
        }
        else
        {
            this.add.text(500, 500, 'YOU SUCK!!!', { fontSize: '32px', fill: '#000'});
            this.game.paused = true;
            
        }
    },

    createBall: function()
    {
        //Hinzufügen des Balls
        ball = this.add.sprite(cursor.x, cursor.y-32, 'ball');
        ball.anchor.set(0.5);

        this.physics.arcade.enable(ball);

        ball.body.collideWorldBounds = true;
        ball.checkWorldBounds = true;
        ball.body.bounce.set(1);
        ball.body.immovable = true;
        ball.body.allowGravity = false;
        ball.body.gravity.y = 50;
    }
    
};