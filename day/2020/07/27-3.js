var Model = function (sex) {
  this.sex = sex;
};
Model.prototype.takePhoto = function () {
  console.log(`sex=${this.sex} underware=${this.underware}`);
};

var maleModel = new Model("male");

for (var i = 0; i <= 50; i++) {
  maleModel.underware = `underware${i}`;
  maleModel.takePhoto();
}
