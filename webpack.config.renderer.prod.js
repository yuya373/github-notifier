/**
 * Build config for electron renderer process
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BabiliPlugin = require("babili-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const baseConfig = require("./webpack.config.base.js");
const CheckNodeEnv = require("./internals/scripts/CheckNodeEnv.js");

const BundleAnalyzerPlugin = WebpackBundleAnalyzer.BundleAnalyzerPlugin;

CheckNodeEnv('production');

module.exports = merge.smart(baseConfig, {
  devtool: 'source-map',

  target: 'electron-renderer',

  entry: './app/index.js',

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/',
    filename: 'renderer.prod.js'
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),

    /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
    new BabiliPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true'
    }),
  ],
});
