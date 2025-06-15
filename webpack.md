# webpack 的使用

我们在开发的时候需要模块化，但是生产环境下部分浏览器无法识别模块化语法，需要 webpack 将模块化的代码打包为一个 js 包，供浏览器使用，同时通过 loader 识别 css 与 .vue 等特殊文件，通过 plugin 插件，将 es6 的语法进行降级处理，同时可以通过 webpack 中的插件或者 loader 实现对文件的拆分，图片压缩等资源处理，帮助我们开发

## webpack 的主要选项

mode

模式，分为 development 与 production 两种模式，production 模式下自带代码压缩

```javascript
const path = require("path")
module.exports = {
  //mode分为开发模式与生产模式
  mode: "development",
  //打包入口，可以单入口，可以多入口，可以填数组，最好填对象
  entry: {
    app1: "./app.js",
  },
  //打包文件的出口，filename为打包出的文件名，path为打包后的文件放置的地址
  output: {
    filename: "[name].[chunkhash:4].js",
    path: path.resolve(__dirname, "dist"),
  },
  //用于存放各种loader，实现打包后代码对各种文件的识别加载
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          //这里的options配置项目过多的时候，新建.babelrc文件，以json的形式，写入一个对象，内部是options的各种配置项
        },
      },
    ],
  },
  //插件
  plugins: [],
  //开发服务
  devServer: {},
  //配置一些别名等操作，简化操作
  resolve: {},
  //实现优化，比如文件分割等
  optimization: {},
}
```
