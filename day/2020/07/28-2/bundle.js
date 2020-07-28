const fs = require("fs");
const path = require("path");
// 把文件代码转换成AST文件
const parser = require("@babel/parser");
// 遍历AST代码库
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, "utf-8");
  const ast = parser.parse(body, {
    sourceType: "module",
  });
  const deps = {};

  // 对ATS中的ImportDeclaration类型节点进行处理
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      // 获取当前文件的路径
      const dirname = path.dirname(file);
      // 组装路径
      const abspath = "./" + path.join(dirname, node.source.value);

      deps[node.source.value] = abspath;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = { file, deps, code };
  return moduleInfo;
};
const parseModules = (file) => {
  // 获取入口文件的相关信息
  const entry = getModuleInfo(file);
  // 临时保存的所有数据
  const temp = [entry];
  const depsGraph = {};
  // 循环临时数据检查是否还有相关的路径文件需要处理
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps;
    if (deps) {
      for (const key in deps) {
        if (deps.hasOwnProperty(key)) {
          temp.push(getModuleInfo(deps[key]));
        }
      }
    }
  }
  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
};
const bundle = (file) => {
  const depsGraph = JSON.stringify(parseModules(file));

  return `(function(graph){
    function require(file) {
      (function(code){
        eval(code)
      })(graph[file].code)
    }
    require(file)
  })(depsGraph)`;
};
parseModules("./src/index.js");
