/* jshint esversion: 6 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
    publicPath: 'http://localhost:8080/',
	host: '0.0.0.0',
    index: 'index.html',
    open: false
  },
  module: {
    rules: [
      {
        test: /\.(c|sa)ss$/,
        use: [ 'css-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
			}
          },
          'extract-loader',
          'html-loader?interpolate=true',
          'pug-html-loader'
        ]
      },
      // loader for large images, uses svg traces to load placeholders
      {
        test: /\.(?:png|jpe?g|gif)$/,
        include: [path.resolve(__dirname, 'src/assets/large')],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      // loader for small images
      {
        test: /\.(?:png|jpe?g|gif)$/,
        include: [path.resolve(__dirname, 'src/assets/small')],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      // loader for svgs
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};