
function selectPlayer(){
 

    var allPlayers = ['images/char-boy.png','images/char-cat-girl.png', 'images/char-horn-girl.png','images/char-pink-girl.png',
        'images/char-princess-girl.png'];

	player.sprite = allPlayers[player.player];
    player.player = (player.player+1) % 5;
    //console.log
};



// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.positions = function() {
    	var positions = [68, 151, 234];
    	var i = Math.floor(Math.random() * (3 - 0) + 0);
    	return positions[i];
    }    
    this.x = 0;
    this.y = this.positions();
    this.speed = (Math.random() * (440 - 110) + 110);


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += this.speed*dt ;
    if (this.x >= 505){
        this.x = -100;
        this.y = this.positions();
    }

    if((Math.floor(this.x+60) >= player.x) && (Math.floor(this.x-40) <= player.x) && (this.y === player.y)){
        player.reset();
        //Do I need to handle the case of empty array
        player.won.pop();
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
//console.log(selectedPlayer);
    this.x = x;
    this.y = y;
    //this.allPlayers = ['images/char-boy.png','images/char-cat-girl.png', 'images/char-horn-girl.png'];
    this.player = 1;
    this.sprite = 'images/char-boy.png';
    //this.player++;
    this.star = 'images/Star.png';
    this.won = [];
    this.score = 0;
};

Player.prototype.update = function() {
    var result = document.getElementById('result');
    result.innerHTML = ('Score ' + this.score);
};

Player.prototype.win = function() {   
    this.won.push('');
    if (this.won.length === 5) {
    	this.score ++;
    	this.won.length = 0;
    }

};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 400;
};

Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (this.won.length > 0){
            var x = 0;
            for (var i in this.won){
                ctx.drawImage(Resources.get(this.star), x , -10);
                x += 101;
            }
        }
};

Player.prototype.selectPlayer = function() { 
    var x = 101;
    console.log("in selectPlayer");
    console.log(this.allPlayers[0]);
    for(var player = 0; player < this.allPlayers.length; player++) {
        console.log(this.allPlayers[player]);
        Resources.load(this.allPlayers[player]);
        ctx.drawImage(Resources.get(this.allPlayers[player]), x, 200);
        x += 101;
    } 
    sleep(1000);
    this.sprite = 'images/char-cat-girl.png';       
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'up')
        this.y -= 83;
    if (keyCode === 'down')
        this.y += 83;
    if (keyCode === 'right')
        this.x += 101;
    if (keyCode === 'left')
        this.x -= 101;
    if(this.x <= 0)
        this.x = 0;
    if(this.x >= 404)
        this.x = 404;
    if(this.y >= 400 )
       this.y = 400;
    if(this.y <= 0 ){
        this.win();
        this.reset();
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(202,400);
var allEnemies = [new Enemy() ];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
