module.exports = {
  entry: './client/index.js',
  output: {
    path: './public/',
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  node: {
   fs: "empty"
  }
};
