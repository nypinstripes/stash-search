import { argv } from 'yargs';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { join, resolve } from 'path';
import chalk from 'chalk';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import jsonImporter from 'node-sass-json-importer';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import shapes from './shared/data/svgs.json';
import webpack from 'webpack';
import WebpackCleanupPlugin from 'webpack-cleanup-plugin';

const config = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  const minify = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    showErrors: true
  };

  const mode = ifProd('production', 'development');
  const progress = {
    bar: chalk.green(':bar'),
    status: chalk.cyan(':percent')
  };

  let agent = {
    'browser': {
      'name': 'Chrome',
      'version': '65.0.3325.162',
      'major': '65'
    },
    'cpu': {},
    'device': {},
    'engine': {
      'name': 'WebKit',
      'version': '537.36'
    },
    'os': {
      'name': 'Mac OS',
      'version': '10.13.3'
    }
  };

  let ua = {
    chrome: 'Chrome/65.0.3325.162',
    safari: 'Safari/537.36',
    moz: 'Mozilla/5.0',
    system: '(Macintosh; Intel Mac OS X 10_13_3)',
    webkit: 'AppleWebKit/537.36 (KHTML, like Gecko)'
  };

  agent.ua = `${ua.moz} ${ua.system} ${ua.webkit} ${ua.chrome} ${ua.safari}`;

  const configVars = {
    baseUrl: JSON.stringify('/'),
    envVars: {
      GIPHY_KEY: JSON.stringify(argv.GIPHY_KEY)
    },
    host: JSON.stringify('build'),
    originalUrl: JSON.stringify('/'),
    'process.env.NODE_ENV': JSON.stringify(mode),
    shapes: JSON.stringify(shapes),
    tagOptions: false,
    uaName: JSON.stringify(agent)
  };

  const envConfig = {
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      historyApiFallback: true,
      hot: true,
      publicPath: '/',
      stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        colors: true,
        depth: false,
        entrypoints: false,
        errors: true,
        errorDetails: true,
        hash: false,
        maxModules: 0,
        modules: false,
        performance: false,
        providedExports: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        usedExports: false,
        version: false,
        warnings: false
      }
    },
    devtool: ifProd(false, 'cheap-eval-source-map'),
    entry: [
      resolve(__dirname, 'server/styles/main.scss'),
      resolve(__dirname, 'src/index')
    ],
    mode,
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: 'pug-loader'
        },
        {
          test: /\.json$/,
          include: '/shared/data',
          loader: 'json-loader'
        },
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          include: resolve(__dirname, 'src'),
          loader: 'babel-loader'
        },
        {
          test: /\.(gif|ico|jpe?g|png)$/i,
          loader: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /(\.css|\.scss)$/,
          loaders: [
            {
              loader: 'style-loader',
              options: { sourceMap: !ifProd() }
            },
            {
              loader: 'css-loader',
              options: { sourceMap: !ifProd() }
            },
            {
              loader: 'sass-loader',
              options: {
                importer: jsonImporter(),
                sourceMap: !ifProd()
              }
            }
          ]
        }
      ]
    },
    output: {
      path: resolve(__dirname, 'dist'),
      pathinfo: ifNotProd(),
      publicPath: '/',
      filename: 'bundle.js'
    },
    performance: { hints: false },
    plugins: removeEmpty([
      ifProd(new ExtractTextPlugin('[name].[contenthash].css')),
      new HtmlWebpackPlugin({
        inject: false,
        minify: ifProd(minify, false),
        sourceMap: false,
        template: 'server/views/index.pug'
      }),
      ifNotProd(new LiveReloadPlugin({ appendScriptTag: true })),
      new ProgressBarPlugin({
        clear: false,
        format: ` ${progress.bar} ${progress.status} (:elapsed sec) \r`
      }),
      new webpack.DefinePlugin(configVars)
    ]),
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    target: 'web'
  };

  if (env.debug) {
    console.log(envConfig);
    debugger; // eslint-disable-line
  }

  return envConfig;
};

export default config;
