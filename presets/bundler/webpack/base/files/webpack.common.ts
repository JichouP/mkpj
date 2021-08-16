import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';

const rules: webpack.RuleSetRule[] = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.[jt]sx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@': './src',
            },
          },
        ],
      ],
    },
  },
];

const module: webpack.ModuleOptions = {
  rules,
};

const config: webpack.Configuration = {
  target: 'node',
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  externals: [webpackNodeExternals() as any],
};

export default config;
