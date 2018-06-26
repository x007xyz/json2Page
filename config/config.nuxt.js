'use strict';

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'starter',
    meta: [{
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Nuxt.js project',
    },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    }],
  },
  /*
   ** Global CSS
   */
  css: [ '~/assets/css/main.css', 'iview/dist/styles/iview.css', 'mavon-editor/dist/css/index.css' ],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070',
  },
  build: {
    vendor: [ 'axios', '~/plugins/iview', '~/plugins/markdown' ],
  },
  plugins: [{ src: '~/plugins/iview' }, { src: '~/plugins/markdown', ssr: false }],
};
