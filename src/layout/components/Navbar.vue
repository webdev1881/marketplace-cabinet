<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />



    <div class="right-menu">

      <!-- <div class="test"> {{ 'aaa' | localize }} </div> -->

      <div class="lang">
        <input
          v-model="locale"
          @click="changeLanguage"
          type="radio"
          value="ua"
          id="ua"
        />
        <label
          class="lang__item"
          for="ua"
          :class="[locale === 'ua' ? 'active' : null]"
        >
          UA
        </label>
        <span class="lang__separator">|</span>
        <input
          v-model="locale"
          @click="changeLanguage"
          type="radio"
          value="ru"
          id="ru"
        />
        <label
          class="lang__item"
          for="ru"
          :class="[locale === 'ru' ? 'active' : null]"
        >
          EN
        </label>
      </div>




      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" alt="" class="user-avatar"> -->
          <div class="name">
            <!-- <h4 class="hello" >Приветствую, {{ info.first_name }} </h4> -->
            <h2 class="letter" > {{ info.name.charAt(0).toUpperCase() }} </h2>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">

              <router-link to="/">
                <el-dropdown-item>
                  Головна
                </el-dropdown-item>
              </router-link>

              <router-link to="/profile">
                <el-dropdown-item>
                  Профіль
                </el-dropdown-item>
              </router-link>

              <!-- <a href="/profile">
                <el-dropdown-item>Профіль</el-dropdown-item>
              </a> -->
              <a target="_blank" href="">
                <el-dropdown-item>Документація</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">Вихід</span>
              </el-dropdown-item>

            </el-dropdown-menu>
            <!-- <i class="el-icon-caret-bottom" /> -->
          </div>

        </div>

        <!-- <h3 class="balance" >{{ info.balance | splitNumber }} грн</h3> -->
        <h3 class="balance" >{{ 45850 | splitNumber }} грн</h3>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },

  data: () => ({
    locale: null,
  }),

  computed: {

    ...mapGetters([
      'sidebar',
      'info',
      // 'locale'
    ])
  },
  methods: {

    // ...mapActions('app', ['LOAD_LANGUAGE', 'CHANGE_LANGUAGE'] ),

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    changeLanguage(e) {
      let event = e.target.value;
      this.$store.dispatch("app/CHANGE_LANGUAGE", event)
    },
  },
  async mounted() {
    this.$store.dispatch("app/LOAD_LANGUAGE");
    this.locale = this.$store.getters.locale;
  },
}
</script>

<style lang="scss" scoped>

.hello {
  // display: inline-flex;
  line-height: 11px;
}

.test {
  margin-right: 40px;
}

#ua,
#ru {
  display: none;
}

.active {
  font-weight: 600 !important;
}

.lang {
  display: flex;
  margin-right: 10px;
  .lang__item {
    font-size: 15px;
    font-weight: 400;
    border: none;
    padding: 0 2px;
    background: inherit;
    color: #557e91;
    cursor: pointer;
    transition: 0.2s;
    text-decoration: none;
  }
}

.name {
  border: 1px solid #041536;
  line-height: 0;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025)
        }
      }
    }

    .avatar-container {
      display: flex;
      align-items: center;
      margin-right: 30px;

      .balance {
        margin-left: 10px;
      }

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
