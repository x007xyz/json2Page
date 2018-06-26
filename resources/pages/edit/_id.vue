<template>
  <div>
    <InitConfig @preview="showPreviewModal"></InitConfig>
    <PreviewModal v-model="show"></PreviewModal>
  </div>
</template>
<script>
export default {
  name: 'edit',
  components: {
    InitConfig: () => import('~/components/InitConfig.vue'),
    PreviewModal: () => import('~/components/PreviewModal.vue')
  },
  data () {
    return {
      show: false
    }
  },
  asyncData ({params}) {
    console.log(params.id)
  },
  methods: {
    showPreviewModal () {
      this.show = true
    }
  }
}
</script>
<style lang="css" scoped>
</style>
