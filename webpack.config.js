const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/views/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
    chunkFilename: '[id].js'
  },
  devServer: {
    port: 8010,
    watchContentBase: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/views/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
};
