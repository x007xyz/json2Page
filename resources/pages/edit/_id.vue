<template>
  <div>
    <InitConfig @preview="showPreviewModal" :form="form">
      <Button type="primary" style="margin-left: 12px" @click="showList">生成列表页面</Button>
      <Button type="primary" style="margin-left: 12px" @click="showEdit">生成编辑页面</Button>
      <Button type="primary" style="margin-left: 12px" @click="showCheck">生成查看页面</Button>
      <Button type="primary" style="margin-left: 12px">生成模拟数据</Button>
      <Button type="primary" style="margin-left: 12px" @click="showApiDoc">生成接口文档</Button>
    </InitConfig>
    <PreviewModal v-model="show" :data="data"></PreviewModal>
    <mavon-editor v-model="value"></mavon-editor>
    <Modal
        v-model="modal"
        width="90"
        title="Common Modal dialog box title">
        <iframe src="" frameborder="0" id="frame" style="width: 100%;height: 400px;"></iframe>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'edit',
  components: {
    InitConfig: () => import('~/components/InitConfig.vue'),
    PreviewModal: () => import('~/components/PreviewModal.vue'),
    ApiDoc: () => import('~/components/ApiDoc.vue')
  },
  data () {
    return {
      modal: false,
      show: false,
      value: ''
    }
  },
  asyncData ({params}) {
    return axios.post('http://127.0.0.1:7001/fields/get', {id: params.id}).then(res => {
      return { 
        form: {
          name: res.data.name,
          content: JSON.stringify(res.data.fields, null, 2)
        },
        data: {
          name: res.data.name,
          fields: res.data.fields
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
    },
    showApiDoc () {
      axios.post('/doc/get', this.data).then(res => {
        console.log(res.data)
        this.value = res.data
      })
    },
    showList () {
      axios.post('/list/html', this.data).then(res => {
        document.getElementById('frame').srcdoc = res.data
        this.modal = true
      })
    },
    showEdit () {
      axios.post('/edit/html', this.data).then(res => {
        document.getElementById('frame').srcdoc = res.data
        this.modal = true
      })
    },
    showCheck () {
      axios.post('/check/html', this.data).then(res => {
        document.getElementById('frame').srcdoc = res.data
        this.modal = true
      })
    }
  },
  beforeMount () {
    console.log(this)
  }
}
</script>
<style lang="css" scoped>
</style>
