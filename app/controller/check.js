'use strict';

const Controller = require('egg').Controller;

class CheckController extends Controller {
  async vue() {
    const { fields, name } = this.ctx.request.body;
    await this.ctx.helper.processFields(fields);
    const data = await this.ctx.renderView('check_vue.html', { fields, name });
    this.ctx.body = data;
  }
  async html() {
    const { fields, name } = this.ctx.request.body;
    await this.ctx.helper.processFields(fields);
    const data = await this.ctx.renderView('check_iview.html', { fields, name });
    this.ctx.body = data;
  }
}

module.exports = CheckController;
