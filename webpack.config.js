const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { optimize } = require("webpack");

module.exports = {
  mode: "production",
  entry: "./Runner.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    chunkIds: 'total-size',
    innerGraph: true,
    mangleExports: 'size',
    mergeDuplicateChunks: true,
    minimize: true,
    moduleIds: 'size',
    removeEmptyChunks: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {},
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
