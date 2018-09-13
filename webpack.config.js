const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => ({
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin("build", {}),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      filename: "index.html"
    }),
    new WebpackMd5Hash(),
    new MonacoWebpackPlugin({ languages: ["markdown", "typescript"] })
    // https://github.com/Microsoft/monaco-editor-webpack-plugin/issues/13#issuecomment-390806320
    // new webpack.ContextReplacementPlugin(
    //   /monaco-editor(\\|\/)esm(\\|\/)vs(\\|\/)editor(\\|\/)common(\\|\/)services/,
    //   __dirname
    // )
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    overlay: true
  },
  node: {
    fs: "empty",
    module: "empty"
  }
});
