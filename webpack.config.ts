const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const AutoPrefixerPlugin = require('autoprefixer');
const dartSass = require('sass');
const compress= require('compression');


module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src', 'index.tsx'),
    path.resolve(__dirname, 'src', 'index.scss'),
  ],
  output: {
    filename: 'static/index.min.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                parser: "postcss-scss",
                plugins: [
                  AutoPrefixerPlugin(),
                ],
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                implementation: dartSass,
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    // 404 fallback to index.html. Needed to get React Router to work in dev.
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/index.min.css',
    }),
    new StylelintPlugin({
      files: 'src/**/*.scss',
      configBasedir: 'src/styelint-scss.yml',
    }),
    // Browsersync for development server, only runs with --watch flag.
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080',
      notify: false,
      startPath: '/',
      open: false,
      middleware: [compress()],
      reloadDelay: 1000,
      files: 'src/**/*',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({excludeWarnings: true}),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};