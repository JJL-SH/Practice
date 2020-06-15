let checkType = (() => {
  // 缓存规则，需要添加规则的话通过内置的方法往rule上添加
  let rules = {
    email(str) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    },
    mobile(str) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    },
  };

  // 暴露接口
  return {
    // 校验
    check(str, type) {
      return rules[type] ? rules[type](str) : false;
    },
    addRule(type, fn) {
      rules[type] = fn;
    },
  };
})();

console.log(checkType.check("1115900623513", "mobile"));
checkType.addRule("money", (str) => {
  return /^[0-9]+(.[0-9]{2})?$/.test(str);
});

console.log(checkType.check("18.23", "money"));
