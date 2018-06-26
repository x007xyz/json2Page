'use strict';
const componentsTriggerChange = [ 'radio', 'radio-group', 'checkbox', 'checkbox-group', 'switch', 'select', 'date', 'daterange', 'time', 'timerange', 'datetime', 'datetimerange' ];
module.exports = {
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
    return await this.ctx.renderView(`components/${fileName}.html`, field);
  },
  async processFields(fields, model = 'form') {
    for (const field of fields) {
      field.value = `${model}.${field.name}`;
      field.trigger = componentsTriggerChange.indexOf(field.type) > -1 ? 'change' : 'blur';
      field.component = await this.getComponent(field);
    }
  },
  components: [{
    name: '输入框', value: 'text',
  }, {
    name: '密码框', value: 'password',
  }, {
    name: '文本域', value: 'textarea',
  }, {
    name: '单选框', value: 'radio',
  }, {
    name: '单选框组', value: 'radio-group', options: [ 'radio1', 'radio2', 'radio3' ],
  }, {
    name: '多选框', value: 'checkbox',
  }, {
    name: '多选框组', value: 'checkbox-group', options: [ 'checkbox1', 'checkbox2', 'checkbox3' ],
  }, {
    name: '开关', value: 'switch',
  }, {
    name: '选择框', value: 'select', options: [{ value: 1, label: 'option1' }, { value: 2, label: 'option2' }, { value: 3, label: 'option3' }],
  }, {
    name: '日期', value: 'date',
  }, {
    name: '起止日期', value: 'daterange',
  }, {
    name: '时间', value: 'time',
  }, {
    name: '起止时间', value: 'timerange',
  }, {
    name: '日期时间', value: 'datetime',
  }, {
    name: '起止日期时间', value: 'datetimerange',
  }],
};
