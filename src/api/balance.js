import request from '@/utils/request'


export function fetchBalance(query, id) {
  return request({
    url: `/api/seller/${id}/billing/history/`,
    method: 'get',
    params: query
  })
}