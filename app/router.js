'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.generator.home);
  router.get('/list', controller.generator.list);
  router.get('/edit', controller.generator.edit);
  router.get('/del', controller.generator.del);
  router.post('/save', controller.generator.save);
  router.post('/preview', controller.generator.preview_field);
  router.post('/form/resolve', controller.generator.resolve_form);
  router.post('/form/preview', controller.generator.preview_form);
  router.post('/table/resolve', controller.generator.resolve_table);
  router.post('/table/preview', controller.generator.preview_table);
};
