import counter from './counter';

export default function* (){
  // 合并所有 saga 文件
  yield [...counter].map((saga) => {
    return saga();
  })
}