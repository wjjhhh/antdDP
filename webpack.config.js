const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: './src',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    libraryTarget: "umd",
    library: "antdDP"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
            ],
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',{
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
              })
            ]
          }
        }],
        exclude: /node_modules/,
      },
      // {//CSS处理
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader?modules",
      //   exclude: /node_modules/,
      // },

      {//antd样式处理
        test: /\.css$/,
        exclude: /src/,
        use: [
          { loader: "style-loader", },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
    }),

  ],
  devServer: {
    port: 3100,
    open: true,
  },
  resolve: {
    alias: {
      '@components': path.join(__dirname, 'src/components'),
      '@utils': path.join(__dirname, 'src/utils'),
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.less']
  }

}