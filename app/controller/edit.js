'use strict';

const Controller = require('egg').Controller;

class EditController extends Controller {
  async vue() {
    const { fields, name } = this.ctx.request.body;
    await this.ctx.helper.processFields(fields, 'filter');
    const data = await this.ctx.renderView('form_vue.html', { fields, name });
    this.ctx.body = { data };
  }
  async html() {
    const { fields, name } = this.ctx.request.body;
    await this.ctx.helper.processFields(fields, 'filter');
    const data = await this.ctx.renderView('form_iview.html', { fields, name });
    this.ctx.body = { data };
  }
}

module.exports = EditController;
