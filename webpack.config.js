module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: `${__dirname}/docs`,
    filename: "bundle.js"
  },
  devtool: "sourcemap",
  devServer: {
    contentBase: `${__dirname}/docs`,
    historyApiFallback: true
  },
  externals: {
    paper: "paper",
    hljs: "hljs"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-spread"
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
};
