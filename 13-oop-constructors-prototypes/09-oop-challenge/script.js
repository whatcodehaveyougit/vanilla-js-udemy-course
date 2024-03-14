function Player(){
  this.name = name;
  this.lvl = 1;
  this.points = 0;
}

// Player.prototype = Object.create(Player.prototype);

Player.prototype.gainXp = function(xp){
  // console.log(xp)
  this.points += xp;

  if (this.points > 10){
    this.points = 0;
    this.lvl++;
  }
  this.describe()
}

Player.prototype.describe = function(){
  console.log(`${this.name} is level ${this.lvl} with ${this.points} experience points`);
}

const player1 = new Player('Bob');
player1.gainXp(1)
player1.gainXp(10)
player1.gainXp(10)
