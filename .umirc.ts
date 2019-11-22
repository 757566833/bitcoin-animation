import { IConfig } from 'umi-types';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {
  memoryState, setMemory
} from './config/auto'
// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
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
