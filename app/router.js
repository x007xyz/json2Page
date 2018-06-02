'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/form/create', controller.generator.create_form);
  router.post('/form/preview', controller.generator.preview_form);
  router.post('/form/save', controller.generator.save_form);
  router.post('/form/resolve', controller.generator.resolve_form);
  router.post('/generator/components', controller.generator.components);
  router.post('/generator/components/save', controller.generator.save_components);
};
