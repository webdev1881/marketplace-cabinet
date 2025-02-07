<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
   
    <transition name="sidebarLogoFade">

      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">

        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <img v-if="logo" src="https://www.getautismactive.com/wp-content/uploads/2021/01/Test-Logo-Circle-black-transparent.png" class="sidebar-logo">
        <!-- <h1 v-else class="sidebar-title">{{ title }} </h1> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">

        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <img v-if="logo" src="https://www.getautismactive.com/wp-content/uploads/2021/01/Test-Logo-Circle-black-transparent.png" class="sidebar-logo">
        <!-- <h1 class="sidebar-title">{{ title }} </h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'market',
      logo: 'https://www.getautismactive.com/wp-content/uploads/2021/01/Test-Logo-Circle-black-transparent.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  background: white;
  text-align: center;
  overflow: hidden;
  display: flex;

  & .sidebar-logo-link {
    display: flex!important;
    align-items: center;
    margin-left: 20px;
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      // width: 32px;
      // height: 32px;
      width: 50px;
      height: 50px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-size: 20px;
      // color: #fff;
      color: #0D0D0D;
      font-weight: 500;
      line-height: 50px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
