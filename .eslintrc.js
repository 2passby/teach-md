// 这是eslint-webpack-plugin的配置项，可以单独作为文件拆出来
module.exports = {
  //配置环境
  env:{
    browser:true,
    es2021:true,
  },
  extends:[],
  plugins:[],
  // 配置es版本
  parserOptions:{
    ecmaVersion:6,
    sourceType:'module',
    ecmaFeatures:{
      jsx:true,
    }
  },
  // 配置规则
  rules:{
 
  }
}