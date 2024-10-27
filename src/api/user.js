import request from '@/utils/request'
import shop from '@/api/my/products.json'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getShops(token) {

  return shop

  // return request({
  //   url: '/api/me/sellers/',
  //   method: 'get',
  // })
}