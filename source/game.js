var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var bot;
var ball;
var ballreleased;


function preload() {
    
    game.load.image('bot', 'images/Unbenannt1.png');
    game.load.image('leicht', 'images/leicht.png');
    game.load.image('ball', 'images/ball.png');
    game.load.image('stars','images/background1.png');
}


function create() {
    
    land = game.add.tileSprite(0, 0, 800, 600, 'stars');
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    bot = game.add.sprite(game.world.centerX, 550, 'bot');
    bot.anchor.setTo(0.5, 0.5);
    bot.scale.setTo(2, 2);
   
    ball = game.add.sprite(game.world.centerX-15, 505, 'ball');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;
   
    game.physics.arcade.enable(ball);
    
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    
    bricks = game.add.group();
    bricks.enableBody = true;

    var brick;

        for (var y = 0; y < 4; y++)
        {
            for (var x = 0; x < 15; x++)
            {
                brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'leicht', 'leicht.png');
                brick.body.bounce.set(1);
                brick.body.immovable = true;
            }
        }
    

    game.input.mouse.capture = true;
    ballreleased=false;
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
        ball.x -= 4 ;}
        bot.x -= 4;
        
        
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        
        if(!ballreleased){ 
        ball.x += 4 ;}
        bot.x += 4;
        
    }
    
    
  
}
 


        



