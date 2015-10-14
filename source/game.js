var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var bot;
var ball;
var ballreleased;
var score = 0;
var scoreText;

function preload() {
    
    game.load.image('bot', 'images/Unbenannt1.png');
    game.load.image('leicht', 'images/leicht.png');
    game.load.image('ball', 'images/ball.png');
    game.load.image('stars','images/hintergrund.png');
}


function create() {
    
    
    
    //Hintergrund
    land = game.add.tileSprite(0, 0, 1024, 768, 'stars');
    
    
    //Hinzufügen des Cursors
    bot = game.add.sprite(game.world.centerX, 750, 'bot');
    bot.anchor.setTo(0.5, 0.5);
    bot.scale.setTo(2, 2);
    game.physics.arcade.enable(bot);
	bot.body.immovable = true;
	bot.body.collideWorldBounds = true;
    
    bot.body.bounce.set(1);
    
    
    
    
    ball = game.add.sprite(game.world.centerX, bot.y-30, 'ball');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;
   
    game.physics.arcade.enable(ball);
    
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    
    bricks = game.add.group();
    bricks.enableBody = true;

    var brick;

        for (var y = 0; y < 5; y++)
        {
            for (var x = 0; x < 14; x++)
            {
                brick = bricks.create(100 + (x * 60), 100 + (y * 50), 'leicht', 'leicht.png');
                brick.body.bounce.set(1);
                brick.body.immovable = true;
            }
        }
    
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    game.input.mouse.capture = true;
    ballreleased=false;
    
    
    //game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    //game.scale.pageAlignHorizontally=true;
    //game.scale.pageAlighVertically=true;
    //game.scale.setScreenSize(true);
}
   

function update() {
        
	
      if (game.input.activePointer.leftButton.isDown)
    {
        ballreleased = true;
         ball.body.velocity.y=-150;
    }
    else {}
   

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        if(!ballreleased){ 
        ball.x -= 8 ;}
        bot.x -= 8;
        
        
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        
        if(!ballreleased){ 
        ball.x += 8 ;}
        bot.x += 8;
        
    }
	game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
	game.physics.arcade.collide(ball, bot, ballHitPaddle, null, this);
}
	
	function ballHitPaddle (myBall, myBot) {

    var diff = 0;

    if (myBall.x < myBot.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = myBot.x - myBall.x;
        myBall.body.velocity.x = (-8 * diff);
    }
    else if (myBall.x > myBot.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = myBall.x - myBot.x;
        myBall.body.velocity.x = (8 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        myBall.body.velocity.x = 2 + Math.random() * 8;
    }

}
    
function ballHitBrick (myBall, myBrick) {

    score = score +10;
	
	//brick.kill();
    

}  

 


    
