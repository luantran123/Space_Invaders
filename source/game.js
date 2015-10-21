var game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var cursor;
var ball;
var ballreleased;
var score = 0;
var scoreText;
var life = 3;
var lifeText;

function preload() {
    
    game.load.image('cursor', 'images/cursor.png');
    game.load.image('leicht', 'images/bloecke/blockleicht/leicht.png');
    game.load.image('Schwer1', 'images/bloecke/blockschwer/StufeEins.png');
    game.load.image('Schwer2', 'images/bloecke/blockschwer/StufeZwei.png');
    game.load.image('Schwer3', 'images/bloecke/blockschwer/StufeDrei.png');
    game.load.image('Schwer4', 'images/bloecke/blockschwer/StufeVier.png');
    game.load.image('ball', 'images/ball.png');
    game.load.image('mario1','images/hintergrund.png');
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
}


function create() {
    
    
    //Variabeln
    ballreleased=false;
    
    //Hintergrund
    land = game.add.tileSprite(0, 0, 1024, 768, 'mario1');
    
    
    //Hinzufügen des Cursors
    cursor= game.add.sprite(game.world.centerX, 745, 'cursor');
    cursor.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(cursor);
	cursor.body.immovable = true;
	cursor.body.collideWorldBounds = true;
    cursor.body.bounce.set(1);
    
    createBall();
	
    //Hinzufügen der Blöcke 
    bricks = game.add.group();
    bricks.enableBody = true;

	bottom = game.add.group();
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
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	
	//Hinzufügen von Leben
	lifeText = game.add.text(900, 16, 'lifes: 3', { fontSize: '32px', fill: '#000'});
	
    //Maus aktivieren
    game.input.mouse.capture = true;
   
    
    
    //game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    //game.scale.pageAlignHorizontally=true;
    //game.scale.pageAlighVertically=true;
    //game.scale.setScreenSize(true);
}
   

function update() {
    
    
    
	//Linker Mausklick
    if(!ballreleased)
    {
    if (game.input.activePointer.leftButton.isDown)
    {
        ball.body.allowGravity = true;
        ballreleased = true;
        ball.body.immovable = false;
        ball.body.velocity.y=-450;
    }
    else {}
    }
   

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        
        cursor.x -= 20;
        if(!ballreleased){ 
        ball.x = cursor.x ;}
        
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        
        
        cursor.x += 20;
        if(!ballreleased){ 
        ball.x = cursor.x ;}
        
    }
    

    
	
	if(ball.body.onFloor() || ball.body.touching.down)
	{
		ballHitBottom(ball);
	}
	
	game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
	game.physics.arcade.collide(ball, cursor, ballHitCursor, null, this);
}
	

function ballHitCursor (myBall, myCursor) {

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

}
    

function ballHitBrick (myBall, myBrick) {

    score = score +10;
	scoreText.text = 'Score: ' + score;
	myBrick.kill();
    

}  

function ballHitBottom (myBall) {

	if(life > 0)
	{
			
		life--;
		lifeText.text = 'lifes: ' + life;
		myBall.kill();
		ballreleased = false;
		createBall();
	}
	else
	{
		game.add.text(420, 500, 'YOU SUCK!!!', { fontSize: '40px', fill: '#000'});
		game.paused = true;
	}
}

function createBall()
{
	//Hinzufügen des Balls
    ball = game.add.sprite(cursor.x, cursor.y-32, 'ball');
    ball.anchor.set(0.5);

    game.physics.arcade.enable(ball);
    
    ball.body.collideWorldBounds = true;
    ball.checkWorldBounds = true;
    ball.body.bounce.set(1);
    ball.body.immovable = true;
    ball.body.allowGravity = false;
    ball.body.gravity.y = 50;
}
 