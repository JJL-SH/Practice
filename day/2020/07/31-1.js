// function Foo() {
//   var i = 0;
//   return function () {
//     console.log(i++);
//   };
// }
// var f1 = Foo();
// var f2 = Foo();

// f1();
// f1();
// f2();

var myObject = {
  foo: "bar",
  func: function () {
    var self = this;
    console.log(this.foo);
    console.log(self.foo);
    (function () {
      console.log(this.foo);
      console.log(self.foo);
    })();
  },
};

myObject.func()

// bar,bar,undefined,bar

var a = '1'
var b = "2"
console.time("string")
console.log(a+=b)
console.timeEnd("string")

console.time("string2")
