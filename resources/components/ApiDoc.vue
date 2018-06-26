<template>
  <div>
    <mavon-editor v-model="value"></mavon-editor>
  </div>
</template>
<script>
export default {
  name: 'ApiDoc',
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style lang="css" scoped>
</style>
