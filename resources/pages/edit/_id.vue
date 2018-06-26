<template>
  <div>
    <InitConfig @preview="showPreviewModal" :form="form">
      <Button type="primary" style="margin-left: 12px">生成列表页面</Button>
      <Button type="primary" style="margin-left: 12px">生成编辑页面</Button>
      <Button type="primary" style="margin-left: 12px">生成查看页面</Button>
      <Button type="primary" style="margin-left: 12px">生成模拟数据</Button>
      <Button type="primary" style="margin-left: 12px">生成接口文档</Button>
    </InitConfig>
    <PreviewModal v-model="show" :data="data"></PreviewModal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'edit',
  components: {
    InitConfig: () => import('~/components/InitConfig.vue'),
    PreviewModal: () => import('~/components/PreviewModal.vue')
  },
  data () {
    return {
      show: false,
      data: {
        name: '',
        fields: []
      }
    }
  },
  asyncData ({params}) {
    return axios.post('http://127.0.0.1:7001/fields/get', {id: params.id}).then(res => {
      return { 
        form: {
          name: res.data.name,
          content: JSON.stringify(res.data.fields, null, 2)
        }
      }
    })
  },
  methods: {
   showPreviewModal (data) {
      axios.post('/fields/format', { name: data.name, content: eval('(' + data.content + ')') }).then(res => {
        this.data.fields = res.data.fields
        this.data.name = res.data.name
        this.show = true
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
