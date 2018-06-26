<template>
  <Modal
    :value="modal"
    @input="toggleModal"
    ok-text="保存"
    @on-ok="save"
    width="90">
    <div slot="header" style="color:#f60;text-align:center">
      <Input v-model="name"></Input>
    </div>
    <Row>
      <Col span="8" v-for="(field, index) in fields" :key="field.name">
        <Card>
          <p slot="title">{{field.name}}</p>
          <Form :model="field" :label-width="80">
            <FormItem label="标签"><Input v-model="field.label" placeholder="标签"></Input></FormItem>
            <FormItem label="字段名"><Input v-model="field.name" placeholder="字段名"></Input></FormItem>
            <FormItem label="类型">
              <Select v-model="field.type" filterable @on-change="setOptions(index)">
                <Option v-for="component in components" :key="component.value" :value="component.value">{{component.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="必填">
              <i-switch v-model="field.require">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="提示"><Input v-model="field.placeholder" placeholder="提示"></Input></FormItem>
            <FormItem label="错误信息"><Input v-model="field.message" placeholder="错误信息"></Input></FormItem>
            <FormItem label="默认值"><Input v-model="field.default" placeholder="默认值"></Input></FormItem>
            <FormItem v-if="field.options" label="选项"><Input :value="field.options.join(',')" type="textarea" placeholder="选项"></Input></FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </Modal>
</template>
<script>
export default {
  name: 'PreviewModal',
  data () {
    return {
      modal: false,
      components: [
        { name: '输入框', value: 'text'},
        { name: '密码框', value: 'password' },
        { name: '文本域', value: 'textarea' },
        { name: '单选框', value: 'radio' },
        { name: '单选框组', value: 'radio-group' },
        { name: '多选框', value: 'checkbox' },
        { name: '多选框组', value: 'checkbox-group' },
        { name: '开关', value: 'switch' },
        { name: '选择框', value: 'select' },
        { name: '日期', value: 'date' },
        { name: '起止日期', value: 'daterange' },
        { name: '时间', value: 'time' },
        { name: '起止时间', value: 'timerange' },
        { name: 'datetime', value: '日期时间' },
        { name: '起止日期时间', value: 'datetimerange' }
      ],
      name: '',
      fields: [
        {
          default: '',
          label: '商品名称',
          message: 'The name cannot be empty',
          name: 'name',
          placeholder: '商品名称',
          require: true,
          type: 'text'
        }
      ]
    }
  },
  props: {
    value: Boolean
  },
  watch: {
    value: {
      handler (value) {
        this.modal = value
      },
      immediate: true
    }
  },
  methods: {
    toggleModal() {
      this.$emit('input', !this.modal)
    },
    setOptions(index) {
      let flag = false
      ;[
        {
          type: 'radio-group',
          options: ['radio1', 'radio2', 'radio3']
        },
        {
          type: 'checkbox-group',
          options: ['checkbox1', 'checkbox2', 'checkbox3']
        },
        {
          type: 'select',
          options: [{ value: 1, label: 'option1' }, { value: 2, label: 'option2' }, { value: 3, label: 'option3' }]
        }
      ].forEach(item => {
        if (item.type === this.fields[index].type) {
          this.fields[index].options = item.options
          flag = true
        }
      })
      if (!flag) {
        delete this.fields[index].options
      }
    },
    save() {
      axios.post('/fields/save', { name: this.name, fields: this.fields }).then(res => {
        if (res.data === 'success') {
          this.$Message.success('保存成功')
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
