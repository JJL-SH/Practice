function Shadow() {
  this.name = "bob";
  this.age = 18;
}
function jQuery() {
  return new Shadow();
}
var obj = jQuery();
console.log(obj);
