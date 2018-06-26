'use strict';

const Controller = require('egg').Controller;

class FieldController extends Controller {
  async format() {
    const { content: fields, name } = this.ctx.request.body;
    const { components } = this.ctx.helper;
    for (const field of fields) {
      if (!field.type) {
        field.type = 'text';
      }
      if (!field.placeholder) {
        field.placeholder = field.label;
      }
      if (!field.message) {
        field.message = `The ${field.name} cannot be empty`;
      }
      if (!field.require) {
        field.require = true;
      }
      if (!field.default) {
        field.default = '';
      }
      components.forEach(component => {
        if (field.type === component.type && !field.options) {
          field.options = component.options;
        }
      });
    }
    this.ctx.body = { fields, name };
  }
  async save() {
    const result = 'success';
    this.ctx.validate({
      name: 'string',
      fields: {
        type: 'array',
        itemType: 'object',
        required: true,
        rule: {
          name: 'string',
          label: 'string',
        },
      },
    });
    const { fields, name, id } = this.ctx.request.body;
    if (!id) {
      await this.ctx.model.Form.findByIdAndUpdate(id, { fields, name });
    } else {
      await this.ctx.model.Form.create({ fields, name });
    }
    this.ctx.body = result;
  }
  async delete() {
    const { id } = this.ctx.query;
    await this.ctx.model.Form.findByIdAndRemove(id);
    this.ctx.redirect('/list');
  }
  async get() {
    const { id } = this.ctx.query;
    this.ctx.body = await this.ctx.model.Form.findById(id);
  }
  async list() {
    this.ctx.body = await this.ctx.model.Form.find({});
  }
}

module.exports = FieldController;
