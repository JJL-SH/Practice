function GirlFriend() {
  this.name = "Anna";
}

var hand = {
  whichOne: "right hand",
  someFunction: function () {
    console.log("not safe for work");
  },
};

GirlFriend.prototype = hand;

var myObject = new GirlFriend();

console.log(
  myObject.__proto__ === GirlFriend.prototype,
  hand === GirlFriend.prototype,
  hand === myObject.__proto__
);
