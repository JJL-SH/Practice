// function library(module) {
//   $(function () {
//     if (module.init) {
//       module.init();
//     }
//   });
//   return module;
// }
// var myLibrary = library(function () {
//   return {
//     init: function () {
//       // module implementation
//       // 模块实现
//     },
//   };
// })();

var myRevealingModule = (function () {
  var privateVar = "Ben Cherry";
  var publicVar = "Hey there";

  function privateFunction() {
    console.log("Name:" + privateVar);
  }
  function publicSetName(strName) {
    privateName = strName;
  }
  function publicGetName() {
    privateFunction();
  }
  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName,
  };
})();

myRevealingModule.setName("Bob liu");
