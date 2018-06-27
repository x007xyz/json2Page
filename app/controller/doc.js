'use strict';

const Controller = require('egg').Controller;

class DocController extends Controller {
  async get() {
    const { fields, name } = this.ctx.request.body;
    const data = await this.ctx.renderView('api_get.md', { fields, name });
    this.ctx.body = data;
  }
  async del() {
    const { fields, name } = this.ctx.request.body;
    const data = await this.ctx.renderView('api_del.md', { fields, name });
    this.ctx.body = data;
  }
  async save() {
    const { fields, name } = this.ctx.request.body;
    const data = await this.ctx.renderView('api_save.md', { fields, name });
    this.ctx.body = data;
  }
  async list() {
    const { fields, name } = this.ctx.request.body;
    const data = await this.ctx.renderView('api_list.md', { fields, name });
    this.ctx.body = data;
  }
}

module.exports = DocController;
