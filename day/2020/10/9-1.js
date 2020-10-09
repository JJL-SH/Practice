let a = { fruit: "apple" };
let b = new Object(a);
console.log(b);
console.log(b.__proto__);
console.log(b.fruit);

let a2 = { fruit: "apple" };
let b2 = Object.create(a2);
console.log(b2);
console.log(b2.__proto__);
console.log(b2.fruit);

let a3 = Object.create({}, { age: { value: 18 } });
console.log(a3, Object.getOwnPropertyDescriptors(a3));

let person = { nameage: 18, name: "hello" };
let o = { sex: "女" };

Object.setPrototypeOf(o, person);
console.log(o);
console.log(Object.getPrototypeOf(o));


