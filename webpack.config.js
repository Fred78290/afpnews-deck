const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const moduleConfig = {
  rules: [
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /(node_modules|afpnews-api)/,
      use: {
        loader: 'eslint-loader'
      }
    },
    {
      test: /\.vue$/,
      exclude: /node_modules/,
      use: {
        loader: 'vue-loader'
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.join('static', 'fonts/[name].[hash:7].[ext]')
      }
    }
  ]
}

const resolveConfig = {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    vue: 'vue/dist/vue.js'
  }
}

const electronConfig = {
  target: 'electron-main',
  node: {
    __dirname: false
  },
  entry: {
    electron: './src/electron-main/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'afpnews-deck.[name].js'
  },
  module: moduleConfig,
  resolve: resolveConfig
}

const webConfig = {
  target: 'web',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'afpnews-deck.js',
    library: 'afpNewsDeck',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: moduleConfig,
  resolve: resolveConfig,
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'})
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  }
}

module.exports = [webConfig, electronConfig]