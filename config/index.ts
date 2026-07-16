import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import devConfig from './dev';
import prodConfig from './prod';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'taro_template',
    date: '2025-12-10',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: process.env.TARO_OUTPUT_DIR || 'dist',
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
      },
    },
    cache: {
      enable: true,
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['nut-'],
          },
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        
        chain.optimization.splitChunks({
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'initial',
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: -20,
              chunks: 'initial',
              reuseExistingChunk: true,
            },
            taro: {
              name: 'taro',
              test: /[\\/]node_modules[\\/](@tarojs)[\\/]/,
              priority: 10,
              chunks: 'initial',
            },
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 10,
              chunks: 'initial',
            },
          },
        });
        
        chain.optimization.runtimeChunk({
          name: 'runtime',
        });
        
        chain.optimization.minimize(true);
        
        if (process.env.ANALYZE === 'true') {
          chain.plugin('bundle-analyzer').use(BundleAnalyzerPlugin.BundleAnalyzerPlugin, [
            {
              analyzerMode: 'static',
              reportFilename: 'bundle-report.html',
              openAnalyzer: true,
            },
          ]);
        }
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['body'],
            baseFontSize: 37.5,
            unitPrecision: 5,
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        
        chain.optimization.splitChunks({
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'initial',
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: -20,
              chunks: 'initial',
              reuseExistingChunk: true,
            },
            taro: {
              name: 'taro',
              test: /[\\/]node_modules[\\/](@tarojs)[\\/]/,
              priority: 10,
              chunks: 'initial',
            },
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 10,
              chunks: 'initial',
            },
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        });
        
        chain.optimization.runtimeChunk({
          name: 'runtime',
        });
        
        chain.optimization.minimize(true);
        
        chain.optimization.set('providedExports', true);
        chain.optimization.set('usedExports', true);
        
        if (process.env.ANALYZE === 'true') {
          chain.plugin('bundle-analyzer').use(BundleAnalyzerPlugin.BundleAnalyzerPlugin, [
            {
              analyzerMode: 'static',
              reportFilename: 'bundle-report.html',
              openAnalyzer: true,
            },
          ]);
        }
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: true,
        },
      },
    },
  };
  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, devConfig);
  }
  return merge({}, baseConfig, prodConfig);
});