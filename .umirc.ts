import { IConfig } from 'umi-types';
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const CompressionPlugin = require('compression-webpack-plugin');
import {
  memoryState, setMemory
} from './config/auto'
// ref: https://umijs.org/config/
const env = process.env.NODE_ENV
const config: IConfig = {
  treeShaking: true,
  hash:true,
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   }
  // ],
  disableCSSModules: true,
  chainWebpack: function (config) {
    if (env === 'production') {
      config.merge({
        // externals: {
        //   'react': 'React',
        //   'react-dom': 'ReactDOM',
        //   //   // 'react-router-dom': 'ReactRouterDOM',
        //   'antd': 'antd',
        //   'moment': 'moment'
        // },
        plugin: {
          'analazy': {
            plugin: new BundleAnalyzerPlugin({ analyzerHost: '0.0.0.0', analyzerMode: process.env.UNANALYZE ? 'disabled' : 'server' }),
          },
          'Replacement': {
            plugin: new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
          },
          'CompressionPlugin': {
            plugin: new CompressionPlugin()
          }
        }
      })
    }
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: 'bitcoin',
      dll: false,

      routes: {
        exclude: [
          /components\//,
          /step\//,
        ],
      },
    }],
    ['umi-plugin-auto', {
      server: {
        name: 'bit-animation',
        port: 3000,
        docker: true
      },
      quotes: 'single',
      pages: [
        {
          name: 'step',
          state: [memoryState],
          func: [setMemory],
          // type: 'class',
        },

      ]
    }]
  ],
}

export default config;
