// var obj = {
//   myName: "sven",
//   getName: function () {
//     return this.myName;
//   },
// };

// console.log(obj.getName());
// var getName2 = obj.getName;
// console.log(getName2());

document.getElementById = (function (func) {
  return function () {
    return func.apply(document, arguments);
  };
})(document.getElementById);

var getId = document.getElement;
var div = getId("div1");

Function.prototype.mybind = function (target) {
  var self = this;
  return function () {
    self.apply(target, arguments);
  };
};
