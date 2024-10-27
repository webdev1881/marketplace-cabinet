import request from '@/utils/request'
import shop from '@/api/my/products.json'

export function searchUser(name) {
  return request({
    url: '/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return shop
  // return request({
  //   url: '/api/seller/5/products/',
  //   method: 'get',
  //   params: query
  // })
}
