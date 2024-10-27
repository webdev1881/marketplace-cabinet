import { login, logout, getInfo, getShops } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import router from '@/router'
import shop from '@/api/my/products.json'


const getDefaultState = () => {
  return {
    token: getToken(),
    info: null,
    shops: null,
    roles: [],
    permiss: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_SHOPS: (state, shops) => {
    state.shops = shops
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISS: (state, permiss) => {
    state.permiss = permiss
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username, password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log( data )
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        data.roles = ['admin']
        data.permiss = [
          {'can_create_product': true},
          {'can_create_brand': true},
        ]

        if (!data.roles || data.roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_INFO', data)
        commit('SET_ROLES', data.roles)
        commit('SET_PERMISS', data.permiss)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getShops({ commit, state }) {
    commit('SET_SHOPS', shop)
    // return shop
    // return new Promise((resolve, reject) => {
    // getShops(state.token).then(response => {
    //     const { data } = response
    //     console.log(data)
    //     if (!data) {
    //       return reject('Token failed, please Login again.')
    //     }
    //     commit('SET_SHOPS', data)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state }) {
    router.options.routes = []
    router.go()
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      router.options.routes = []
      resolve()
    })
  },

  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }




}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

