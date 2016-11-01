module.exports = {
  devtool: "source-map",
  entry: {
    'main': './client/app/main.ts'
  },
  output: {
    path: './client/build',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.ts', '.png']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      }
    ]
  }
};
