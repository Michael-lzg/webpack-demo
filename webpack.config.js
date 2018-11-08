const path = require('path') // 路径处理模块
const webpack = require('webpack') // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 引入CleanWebpackPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin') //引入分离插件
const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件
const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css

module.exports = {
  entry: {
    index: path.join(__dirname, '/src/index.js'),
    two: path.join(__dirname, '/src/two.js')
  },
  output: {
    path: path.join(__dirname, '/dist'), //打包后的文件存放的地方
    filename: '[name].js' //打包后输出文件的文件名
  },
  devServer: {
    contentBase: './dist', // 本地服务器所加载文件的目录
    port: '8089', // 设置端口号为8088
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, //不跳转
    hot: true // 热更新
  },
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        // use: ['style-loader', 'css-loader', 'postcss-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
        use: ExtractTextPlugin.extract({
          // 这里我们需要调用分离插件内的extract方法
          fallback: 'style-loader', // 相当于回滚，经postcss-loader和css-loader处理过的css最终再经过style-loader处理
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../'  // 给背景图片设置一个公共路径
        })
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        // jsx配置
        test: /(\.jsx|\.js)$/,
        use: {
          // 注意use选择如果有多项配置，可写成这种对象形式
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|svg|gif)$/, // 正则匹配图片格式名
        use: [
          {
            loader: 'url-loader' // 使用url-loader
          }
        ],
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
          outputPath: 'images' 
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'), // new一个插件的实例
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.template.html') // new一个这个插件的实例，并传入相关的参数
    }),
    new CleanWebpackPlugin(['dist']), // 所要清理的文件夹名称
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new ExtractTextPlugin('css/index.css'), // 将css分离到/dist文件夹下的css文件夹中的index.css
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, 'src/*.html')) // 同步扫描所有html文件中所引用的css
    })
  ]
}
