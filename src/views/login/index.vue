<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Войти в аккаунт</h3>
        
        <p style="display:none">admin@example.com</p>
        <p style="display:none">pQ29EQqx8gU9</p>
           
      </div>


      <div class="tabs">
        <div class="tab_control">
          <div @click="active = 'tab1'; clear_form()" :class="{active: active === 'tab1'}" class="tab tab1">По номеру телефона</div>
          <div @click="active = 'tab2'; clear_form()" :class="{active: active === 'tab2'}" class="tab tab2">По email</div>
        </div>
      </div>

      <div v-show="active === 'tab1'" class="byphone">
        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="email"
            v-model="loginForm.phone"
            placeholder="Username"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      </div>

      <div v-show="active === 'tab2'" class="byemail">
        <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.username"
          placeholder="Username"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      </div>

      <div class="social">
         <!-- @click="createUserGoogle -->
        <el-button block class="social_btn p-1" variant="outline-primary">
          <img src="@/assets/svg/google.svg" alt="" class="social_img">
          Google
        </el-button>
        <el-button block class="social_btn p-1" variant="outline-primary">
          <img src="@/assets/svg/facebook.svg" alt="" class="social_img">
          Facebook
        </el-button>
      </div>


    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        // email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,

      mob: "",
      email: "",
      login_password: "",
      active: "tab2",


    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    clear_form() {
      this.email = ''
      this.mob = ''
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    

  }
}
</script>



<style lang="scss" >

.el-input__inner {
    padding-left: 40px;
  }

el-input {
  input.el-input__inner {
    padding-left: 40px;
  }
}

// $bg:#2d3a4b;
$bg:#ffff;
$dark_gray:#2d3a4b;
$light_gray:#2d3a4b;



.errors {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  color: red;
}

.email {
  margin-bottom: 20px;
}

.debug {
  // margin: 25px 0;
  padding: 25px 0;
}

.tabs {
  width: 100%;
  margin-bottom: 45px;
}

.tab_control {
  display: flex;
  .tab {
    width: 50%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding-bottom: 7px;
  }
  .active {
    border-bottom: 2px solid $dark_gray;
  }
}

.byphone, .byemail {
  width: 100%;
  // padding: 0 20px;
}

.agree {
  font-size: 14px;
  width: 100%;
}


.go_home, .user {
  color: white;
}

.login_title {
  margin: 45px 0 35px 0;
  display: flex;
  justify-content: center;
  h3 {
    font-weight: 600;
  }
}

.login_desc {
  margin-bottom: 15px;
}

.social {
  width: 100%;
  margin-top: 40px;
  .social_btn {
    padding: 5px;
    margin: 5px 0;
    width: 100%;
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
    }
  }
  .social_img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}

.register {
  color: white;
}

.login_wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 25%;
  min-width: 400px;
  border: 1px solid #e1dddd;
  padding: 35px;
  border-radius: 8px;
}

.google_button {
  position: relative;
  padding: 2px 0;
}

.google_button::before {
  // content: url("@/assets/svg/go.svg");
  position: absolute;
  width: 25px;
  height: 25px;
  margin: 3px 3px;
  left: 5px;
  z-index: -1;
}
  
.auth_wrap {
  // height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}











.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 70px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {

    position: absolute;
    top: -6px;
    left: 0;
    z-index: 1;


    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
