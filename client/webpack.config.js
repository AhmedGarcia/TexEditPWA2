
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',  // Set mode to 'development' for development build
    entry: {
      main: './client/src/js/index.js',  // Adjusted path
      install: './client/src/js/install.js',  // Adjusted path
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
      new CleanWebpackPlugin(), 

      new HtmlWebpackPlugin({
        template: './client/index.html',  // Adjusted path for the HTML template
        title: 'J.A.T.E',
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js',  // Adjusted path for service worker
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Takes notes with JavaScript syntax highlighting!',
        background_color: '#225cca',
        theme_color: '#225cca',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'),  // Adjusted path for the logo
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,  // Handle image files
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'client'),  // Serve files from the 'client' directory
      },
      compress: true,
      port: 8080,  // Webpack Dev Server running on port 8080
      hot: true,
      proxy: {
        '/api': 'http://localhost:3000',  // Proxy API requests to the backend server running on port 3000
      },
    },
  };
};