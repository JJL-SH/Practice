class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log("init");
  }
  fun() {
    console.log("fun");
  }
}

class Factory {
  create(name) {
    return new Product(name);
  }
}

let factory = new Factory();
let p = factory.create("p1");

p.init();
p.fun();
console.log(p.name);
