<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-wrapper {
  overflow-y: auto;
  height: 100%;
}
.layout-footer-center {
  text-align: center;
}
.content {
  padding: 104px 50px;
  height: 100%;
}
</style>
<template>
    <div class="layout">
        <Layout class="layout-wrapper">
            <Header :style="{position: 'fixed', width: '100%', zIndex: '9'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content class="content">
              <Row :gutter="16">
                <Col span="12">
                  <Card>
                    <p slot="title">初始配置</p>
                    <Form :model="form" :label-width="80">
                      <FormItem label="标题">
                        <Input v-model="form.name" placeholder="请输入标题"></Input>
                      </FormItem>
                      <FormItem label="json">
                        <Input v-model="form.content" type="textarea" :rows="18" placeholder="输入json..."></Input>
                      </FormItem>
                      <FormItem>
                        <Button type="primary" @click="preview">预览</Button>
                      </FormItem>
                    </Form>
                  </Card>
                </Col>
                <Col span="12">
                  <Row>
                    <Col span="12" v-for="field in fields" :key="field.name">
                      <Card>
                        <p slot="title">{{field.name}}</p>
                        <Form :model="field" :label-width="80">
                          <FormItem label="标签"><Input v-model="field.label" placeholder="标签"></Input></FormItem>
                          <FormItem label="字段名"><Input v-model="field.name" placeholder="字段名"></Input></FormItem>
                          <FormItem label="类型">
                            <Select v-model="field.type" filterable>
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
                          <FormItem v-if="field.options" label="选项"><Input v-model="field.options" type="textarea" placeholder="选项"></Input></FormItem>
                        </Form>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Content>
        </Layout>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      components: [ {
        name: '输入框', value: 'text'}, {name: '密码框', value: 'password'}, {name: '文本域', value: 'textarea'}, {name: '单选框', value: 'radio'}, {name: '单选框组', value: 'radio-group'}, {name: '多选框', value: 'checkbox'}, {name: '多选框组', value: 'checkbox-group'}, {name: '开关', value: 'switch'}, {name: '选择框', value: 'select'}, {name: '日期', value: 'date'}, {name: '起止日期', value: 'daterange'}, {name: '时间',value: 'time'}, {name: '起止时间', value: 'timerange'}, {name: 'datetime', value: '日期时间'}, {name: '起止日期时间', value: 'datetimerange'} ],
      form: {
        name: '',
        content: ''
      },
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
  methods: {
    preview() {
      const { name, content } = this.form
      axios.post('/preview', { name, content: eval('(' + content + ')') }).then(res => {
        this.fields = res.data
      })
    }
  }
}
</script>