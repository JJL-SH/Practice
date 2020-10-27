let text = "cat, bat, sat, fat";
let result = text.replace(/(.at)/g, "word ($1)");

let colorText = "red,blue,green,yellow";
let color = colorText.split(/[^,]+/);

console.log(color);
