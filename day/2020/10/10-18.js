// class Foo {
//   async *[Symbol.asyncIterator]() {
//     console.log(1);
//   }
// }
// let f = new Foo();
// console.log(f[Symbol.asyncIterator]());

class Emitter {
  constructor(max) {
    this.max = max;
    this.asyncIndex = 0;
  }

  async *[Symbol.asyncIterator]() {
    while (this.asyncIndex < this.max) {
      yield new Promise((resolve, reject) => resolve(this.asyncIndex++));
    }
  }
}

async function asyncCount() {
  let emitter = new Emitter(5);
  for await (const x of emitter) {
    console.log(x);
  }
}

asyncCount();
