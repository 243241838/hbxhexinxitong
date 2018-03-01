var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//插件的基本作用就是生成html文件。
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 默认的webpack 会将require("style.css")文件嵌入js文件中，使用该插件会将css从js中提取出来
var config = require('./config');


module.exports = {
  entry: {
    //造成这种现象的原因归根究底就是浏览器对ES6中的promise无法支持，因此需要通过引入babel-polyfill来是我们的浏览器正常使用es6的功能,在ie下运行时
    app: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    //打包文件存放的绝对路径
    filename: 'crm/static/js/[name].[chunkhash].js',//文件的版本号
    //打包后的文件名
    chunkFilename: 'crm/static/js/chunks/[id].[chunkhash].js',
    //每个模块编译后的文件名，其中[hash]是用来唯一标识文件，主要用来防止缓存。
    publicPath: '/'
    //文件的引用路径
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    // require时省略的扩展名，如：require('app') 不需要app.js
    alias: {
      'vue': 'vue/dist/vue.js',
      '@res': path.resolve(__dirname, 'res'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@filters': path.resolve(__dirname, '../src/filters'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@src': path.resolve(__dirname, '../src'),
      '@views': path.resolve(__dirname, '../src/views')
    }
  },
  module: {
    //模块处理逻辑
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.attached\.less$/,
        use: [
          { loader: 'style-loader/useable' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.less$/,
        exclude: /\.attached\.less$/,
        
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ],
          publicPath: '/'
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'crm/static/fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        //它会将样式中引用到的图片转为模块来处理
        options: {
          limit: 1000,
          //表示将所有小于1000kb的图片都转为base64形式
          name: path.posix.join('crm', 'static/images/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    //定义插件
    //该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
        'process.env': config.dev.env
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    new ExtractTextPlugin(path.posix.join('crm', 'static/css/[name].[contenthash].css')),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
      // 模板文件路径
    })
  ],
  devServer: {
    host: "10.1.16.113",
    port: 8081,
    disableHostCheck: true,
    proxy: {
      // //王美昕
      // '/': {
      //   target: 'http://10.1.16.122:8089'
      // }

      // 开发服务器
      // '/kxd-admin-server/': {
      //   target: 'http://10.1.16.111:8088'
      // }

      // 张永平
      // '/kxd-admin/': {
      //   target: 'http://10.1.16.125:8080',
      //   pathRewrite: {
      //     '^/kxd-admin': ''
      //   }
      // }

      // 大强
      // '/kxd-admin/': {
      //   target: 'http://10.25.1.20:8080/hxj_admin/',
      //   pathRewrite: {
      //     '^/kxd-admin': ''
      //   }
      // }

      // 俊哥
      // '/kxd-admin/': {
      //   target: 'http://10.1.16.132:8080',
      //   pathRewrite: {
      //     '^/kxd-admin': ''
      //   }
      // }

      // //测试服务器

      // '/kxd-admin/': {
      //   target: 'http://10.1.11.43:8080',
      //   pathRewrite: {
      //     '^/kxd-admin': ''
      //   }
      // }

      // 俊哥
      // '/kxd-admin/': {
      //   target: 'http://10.1.16.132:8080',

      //   pathRewrite: {
      //     '^/kxd-admin': ''
      //   }
      // }

      // 线上
      // '/kxd-admin/': {
      //   target: 'http://120.55.45.37/admin/',
      //   pathRewrite: {
      //     '^/kxd-admin': ''
      //   }
      // }
    }
  }
}
