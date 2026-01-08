const path = require('path');
module.exports = {
  output: { path: path.resolve(__dirname, 'static') },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      loader: 'webpack-graphql-loader',
    });
    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext]',
      },
    });
    return config;
  },
  images: {
    domains: ['logo.clearbit.com', 'cdn.svgporn.com'],
  },
};
