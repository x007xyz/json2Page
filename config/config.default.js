'use strict';

module.exports = appInfo => {
  const config = (exports = {
    security: { csrf: { enable: false } },
    view: { defaultViewEngine: 'nunjucks', mapping: { '.html': 'nunjucks' } },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/lts-form',
        options: {},
      },
    },
    nuxt: require('./config.nuxt'),
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527644320032_8463';

  // add your config here
  config.middleware = [];

  return config;
};
