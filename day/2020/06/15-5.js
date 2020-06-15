class LoginForm {
  constructor() {
    this.state = "hide";
  }
  show() {
    if (this.state === "show") {
      console.log("已经显示");
      return;
    }
    this.state = "show";
    console.log("登录框显示成功");
  }
  hide() {
    if (this.state === "hide") {
      if (this.state === "hide") {
        console.log("已经隐藏");
        return;
      }
      this.state = "hide";
      console.log("登录框隐藏成功");
    }
  }
}

LoginForm.getInstance = (() => {
  // 这里使用了闭包的特性在第一次实力单例的时候缓存了起来，当用户第二次调用方法的时候实际上返回的是上次缓存的实例
  // 这样就实现了单例模式
  let instance;

  return () => {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
})();

let obj1 = LoginForm.getInstance();
obj1.show();

let obj2 = LoginForm.getInstance();
obj2.hide();

console.log(obj1 === obj2);
