'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {
  async vue() {
    const { fields, name } = this.ctx.request.body;
    await this.ctx.helper.processFields(fields, 'filter');
    const data = await this.ctx.renderView('table_vue.html', { fields, name });
    this.ctx.body = { data };
  }
  async html() {
    const { fields, name } = this.ctx.request.body;
    await this.ctx.helper.processFields(fields, 'filter');
    const data = await this.ctx.renderView('table_iview.html', { fields, name });
    this.ctx.body = { data };
  }
}

module.exports = ListController;
