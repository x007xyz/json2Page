<template>
   <div>
      <InitConfig @preview="showPreviewModal"></InitConfig>
      <PreviewModal v-model="show" :data="data"></PreviewModal>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {
    InitConfig: () => import('~/components/InitConfig.vue'),
    PreviewModal: () => import('~/components/PreviewModal.vue')
  },
  data() {
    return {
      show: false,
      data: {
        name: '',
        fields: []
      }
    }
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