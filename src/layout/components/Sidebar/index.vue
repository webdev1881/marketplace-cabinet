<template>
  <div class="shops" :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />

    <!-- <el-select style="width: 95%"  v-model="shop" placeholder="Выберите магазин">
      <el-option label="Магазин_2" value="shop_1"></el-option>
      <el-option label="Магазин_3" value="shop_2"></el-option>
    </el-select> -->

    <el-scrollbar class="bar" wrap-class="scrollbar-wrapper">

      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="true" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item draggable class="bar" v-for="route in routes" :key="route.path" :item="route"
          :base-path="route.path" />
      </el-menu>
      



    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'



export default {
  components: { SidebarItem, Logo },
  data: () => ({
    shop: 'Магазин_1',
  }),
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      console.log( this.$router.options.routes )
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {}

}
</script>


<style scoped>
.shops {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.has-logo {
  font-size: 22px;
}

.bar {
  width: 100%;
  align-self: self-start;
}
</style>