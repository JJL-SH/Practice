class Cellphone {
  create() {
    console.log("a phone");
  }
}
class Decorator {
  constructor(cellphone) {
    this.cellphone = cellphone;
  }
  create() {
    this.cellphone.create();
    this.createShell(cellphone);
  }
  createShell() {
    console.log("out");
  }
}

let cellphone = new Cellphone();
cellphone.create();

console.log("---------------");
let dec = new Decorator(cellphone);
dec.create();
