'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/fields/format', controller.field.format);
  router.post('/fields/save', controller.field.save);
  router.post('/fields/list', controller.field.list);
  router.post('/fields/get', controller.field.get);

  router.post('/doc/get', controller.doc.get);
  router.post('/doc/list', controller.doc.list);
  router.post('/doc/save', controller.doc.save);
  router.post('/doc/del', controller.doc.del);

  router.post('/list/vue', controller.list.vue);
  router.post('/list/html', controller.list.html);

  router.post('/edit/vue', controller.edit.vue);
  router.post('/edit/html', controller.edit.html);

  router.post('/check/vue', controller.check.vue);
  router.post('/check/html', controller.check.html);
  // router.get('/', controller.generator.home);
  // router.get('/list', controller.generator.list);
  // router.get('/edit', controller.generator.edit);
  // router.get('/del', controller.generator.del);
  // router.post('/save', controller.generator.save);
  // router.post('/preview', controller.generator.preview_field);
  // router.post('/form/resolve', controller.generator.resolve_form);
  // router.post('/form/preview', controller.generator.preview_form);
  // router.post('/table/resolve', controller.generator.resolve_table);
  // router.post('/table/preview', controller.generator.preview_table);
};
