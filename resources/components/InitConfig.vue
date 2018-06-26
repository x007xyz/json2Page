<template>
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
</template>
<script>
export default {
  name: 'InitConfig',
  data () {
    return {
      form: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    preview() {
      this.$emit('preview')
      const { name, content } = this.form
      if (name === '') {
        this.$Message.error('name不能为空')
      } else if (!/\[*\]/.test(content)) {
        this.$Message.error('json格式错误')
      } else {
        axios.post('/fields/format', { name, content: eval('(' + content + ')') }).then(res => {
          this.fields = res.data.fields
          this.name = res.data.name
          this.modal = true
        })
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
