var performanceS = function () {};
performanceS.prototype.calculate = function (salery) {
  return salery * 4;
};
var performanceA = function () {};
performanceA.prototype.calculate = function (salery) {
  return salery * 3;
};
var performanceB = function () {};
performanceB.prototype.calculate = function (salery) {
  return salery * 2;
};

var Bonus = function () {
  this.salery = null;
  this.strategy = null;
};
Bonus.prototype.setSalary = function (salary) {
  this.salery = salary;
};
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy;
};
Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salery);
};

var a = new Bonus();
a.setSalary(1000);
a.setStrategy(new performanceS());

console.log(a.getBonus());
a.setStrategy(new performanceA());

console.log(a.getBonus());
