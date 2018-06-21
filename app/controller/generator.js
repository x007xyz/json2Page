'use strict';

const Controller = require('egg').Controller;

class GeneratorController extends Controller {
  get components() {
    return [ 'text', 'password', 'textarea', 'radio', 'radio-group', 'checkbox', 'checkbox-group', 'switch', 'select', 'date', 'daterange', 'time', 'timerange', 'datetime', 'datetimerange' ];
  }
  get componentsTriggerChange() {
    return [ 'radio', 'radio-group', 'checkbox', 'checkbox-group', 'switch', 'select', 'date', 'daterange', 'time', 'timerange', 'datetime', 'datetimerange' ];
  }
  async getComponent(field) {
    const fileMap = {
      input: [ 'text', 'password', 'textarea' ],
      date: [ 'date', 'daterange', 'datetime', 'datetimerange' ],
      time: [ 'time', 'timerange' ],
    };
    let fileName = field.type;
    for (const key in fileMap) {
      if (fileMap.hasOwnProperty(key)) {
        if (fileMap[key].indexOf(fileName) > -1) {
          fileName = key;
        }
      }
    }
    console.log(fileName);
    return await this.ctx.renderView(`components/${fileName}.html`, field);
  }
  async home() {
    await this.ctx.render('home.html', {});
  }
  async list() {
    const list = await this.ctx.model.Form.find({});
    list.forEach(item => { item.fields = JSON.stringify(item.fields); });
    await this.ctx.render('list.html', { list });
  }
  async edit() {
    const { id } = this.ctx.query;
    const form = await this.ctx.model.Form.findById(id);
    console.log('form', form);
    await this.ctx.render('home.html', { id: form._id, name: form.name, fields: JSON.stringify(form.fields, null, 2) });
  }
  async del() {
    const { id } = this.ctx.query;
    await this.ctx.model.Form.findByIdAndRemove(id);
    this.ctx.redirect('/list');
  }
  async processFields(fields, model = 'form') {
    for (const field of fields) {
      field.value = `${model}.${field.name}`;
      field.trigger = this.componentsTriggerChange.indexOf(field.type) > -1 ? 'change' : 'blur';
      field.component = await this.getComponent(field);
    }
  }
  async formatFields(fields) {
    fields.forEach(field => {
      for (const key in field) {
        if (field.hasOwnProperty(key)) {
          const element = field[key];
          if (element === 'true') {
            field[key] = true;
          } else if (element === 'false') {
            field[key] = false;
          }
        }
      }
    });
  }
  async save() {
    let result = { data: 'success' };
    const { content: fields, name, id } = this.ctx.request.body;
    this.formatFields(fields);
    if (Array.isArray(fields) && name !== '') {
      if (id !== '') {
        await this.ctx.model.Form.findByIdAndUpdate(id, { fields, name });
      } else {
        await this.ctx.model.Form.create({ fields, name });
      }
    } else {
      result = { data: 'error' };
    }
    this.ctx.body = result;
  }
  async resolve_form() {
    const { content: fields, name } = this.ctx.request.body;
    await this.processFields(fields);
    const data = await this.ctx.renderView('form_vue.html', { fields, name });
    this.ctx.body = { data };
  }
  async preview_form() {
    const fields = this.ctx.request.body.content;
    await this.processFields(fields);
    await this.ctx.render('form_iview.html', { fields });
  }
  async resolve_table() {
    const { content: fields, name } = this.ctx.request.body;
    await this.processFields(fields, 'filter');
    const data = await this.ctx.renderView('table_vue.html', { fields, name });
    this.ctx.body = { data };
  }
  async preview_table() {
    const fields = this.ctx.request.body.content;
    await this.processFields(fields, 'filter');
    await this.ctx.render('table_iview.html', { fields });
  }
}

module.exports = GeneratorController;
