<template>
  <Modal
    :value="modal"
    @input="toggleModal"
    width="90">
    <Tabs value="name1" @on-click="selectApi">
        <TabPane label="获取详情" name="get"></TabPane>
        <TabPane label="获取列表" name="list"></TabPane>
        <TabPane label="删除数据" name="del"></TabPane>
        <TabPane label="保存数据" name="save"></TabPane>
    </Tabs>
    <mavon-editor v-model="doc"></mavon-editor>
  </Modal>
</template>
<script>
import axios from "axios";
export default {
  name: 'ApiDoc',
  data () {
    return {
      modal: false,
      search: 'get',
      doc: ''
    }
  },
  props: {
    value: Boolean,
    data: {
      type: Object,
      default () {
        return {
          name: '',
          fields: []
        }
      }
    }
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
    query () {
      axios.post(`/doc/${this.search}`, this.data).then(res => {
        this.doc = res.data
      })
    },
    selectApi (data) {
      this.search = data
      this.query()
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
<style lang="css" scoped>
</style>
