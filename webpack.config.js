var webpack = require('webpack')
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
      },
      // {
      //   test: /\.(jpg|png|gif|svg|pdf|ico)$/,
      //   use: [
      //       {
      //           loader: 'file-loader',
      //           options: {
      //               name: '[path][name]-[hash:8].[ext]'
      //           },
      //       },
      //   ]
      // }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    host: process.env.IP,
    port:  process.env.PORT || 8080
  }
};
