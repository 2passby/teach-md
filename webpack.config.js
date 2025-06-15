const path = require('path')
module.exports = {
  
  mode:'development',
  entry:{
    app1:'./app.js'
  },
  output:{
    filename:'[name].[chunkhash:4].js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
        }
      }
    ]
  },
  plugins:[

  ],
  devServer:{
   
  },
  resolve:{

  },
  optimization:{
  }
}
