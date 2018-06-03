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
  // async components() {
  //   const body = this.ctx.request.body;
  //   console.log(body);
  //   const getTemplateVariable = function(tpl) {
  //     const re = /\{\{\s*([a-zA-Z\.\_0-9()]+)\s*\}\}/m;
  //     let match = re.exec(tpl);
  //     const fields = [];
  //     while (match) {
  //       if (match.index > 0) {
  //         fields.push({ name: match[1], explain: '' });
  //       }
  //       tpl = tpl.substring(match.index + match[0].length);
  //       match = re.exec(tpl);
  //     }
  //     return fields;
  //   };
  //   const str = await this.ctx.renderView('fields.html', { fields: getTemplateVariable(body.content) });
  //   console.log('str', str);
  //   this.ctx.body = { content: str };
  // }
  // async save_components() {
  //   console.log('components', this.ctx.request.body);
  //   const { body } = this.ctx.request;
  //   await this.ctx.model.Component.create(body);
  //   await this.ctx.render('home.html', {});
  // }
  async create_form() {
    await this.ctx.render('build_form.html', {});
  }
  async processFields(fields, model = 'form') {
    for (const field of fields) {
      field.value = `${model}.${field.name}`;
      field.trigger = this.componentsTriggerChange.indexOf(field.type) > -1 ? 'change' : 'blur';
      field.component = await this.getComponent(field);
    }
  }
  async save_form() {
    let result = { data: 'success' };
    const { content: fields, name } = this.ctx.request.body;
    if (Array.isArray(fields) && name !== '') {
      await this.ctx.model.Form.create({ fields, name });
    } else {
      result = { data: 'error' };
    }
    this.ctx.body = result;
  }
  async resolve_form() {
    const fields = this.ctx.request.body.content;
    await this.processFields(fields);
    const data = await this.ctx.renderView('form_components.html', { fields });
    this.ctx.body = { data };
  }
  async preview_form() {
    const fields = this.ctx.request.body.content;
    await this.processFields(fields);
    const template = await this.ctx.renderView('form_components.html', { fields });
    await this.ctx.render('iview_form.html', { template, fields });
  }
  async resolve_table() {
    const fields = this.ctx.request.body.content;
    await this.processFields(fields, 'filter');
    const data = await this.ctx.renderView('table.html', { fields });
    this.ctx.body = { data };
  }
  async preview_table() {
    const fields = this.ctx.request.body.content;
    await this.processFields(fields, 'filter');
    await this.ctx.render('iview_table.html', { fields });
  }
}

module.exports = GeneratorController;
