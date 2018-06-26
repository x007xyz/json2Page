'use strict';

const Controller = require('egg').Controller;

class DocController extends Controller {
  async get() {
    const { fields, name } = this.ctx.request.body;
    console.log(fields);
    const data = await this.ctx.renderView('api_list.md', { fields, name });
    this.ctx.body = data;
  }
}

module.exports = DocController;
