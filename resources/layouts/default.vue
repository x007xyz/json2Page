<template>
  <div class="layout">
      <Layout class="layout-wrapper">
          <Header :style="{position: 'fixed', width: '100%', zIndex: '9'}">
              <Menu mode="horizontal" theme="dark" active-name="1">
                  <div class="layout-logo"></div>
                  <div class="layout-nav">
                      <MenuItem name="1">
                        <nuxt-link to="/">
                          <Icon type="ios-navigate"></Icon>
                          新增
                        </nuxt-link>
                      </MenuItem>
                      <MenuItem name="2">
                        <nuxt-link to="/list">
                          <Icon type="ios-keypad"></Icon>
                          列表
                        </nuxt-link>
                      </MenuItem>
                  </div>
              </Menu>
          </Header>
          <Content class="content">
            <nuxt></nuxt>
          </Content>
      </Layout>
  </div>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  head () {
    return {
      title: 'Welcome Use nuxt-egg'
    }
  },
  components: {
    MyFooter
  }
}
</script>

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
  width: 200px;
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
