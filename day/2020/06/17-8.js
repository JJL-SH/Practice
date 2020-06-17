var duck = {
  duckSinging: function () {
    console.log("嘎嘎嘎");
  },
};
var chicken = {
  duckSinging: function () {
    console.log("嘎嘎嘎");
  },
};
var choir = [];
var joinChoir = function (animal) {
  if (animal && typeof animal.duckSinging === "function") {
    choir.push(animal);
    console.log("恭喜加入合唱团:" + choir.length);
  }
};

joinChoir(duck);
joinChoir(chicken);

var makeSound = function (animal) {
  animal.sound();
};

var Duck = function () {};
Duck.prototype.sound = function () {
  console.log("gagaga");
};
var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log("gegege");
};

makeSound(new Duck());
makeSound(new Chicken());
