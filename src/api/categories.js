import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/seller/1/categories/',
    method: 'get',
    params
  })
}