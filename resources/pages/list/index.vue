<template>
  <Card>
    <Table border :columns="columns" :data="list"></Table>
  </Card>
</template>
<script>
import axios from 'axios'
export default {
  name: 'list',
  data() {
    return {
      columns: [
        {
          title: 'ID',
          key: '_id'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Action',
          key: 'action',
          width: 240,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'edit-id', params: {id: params.row._id}})
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'edit-id', params: {id: params.row._id}})
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  asyncData({ params }) {
    return axios.post('http://127.0.0.1:7001/fields/list').then(res => {
      console.log(res.data)
      return { list: res.data }
    })
  }
}
</script>
<style lang="css" scoped>
</style>
