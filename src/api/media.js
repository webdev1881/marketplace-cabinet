import request from '@/utils/request'


export function uploadImg(data, id) {
  const req = new FormData()
  req.append( 'file', data, data.name )
  req.append( 'type', 1 )
  return request({
    url: `api/seller/${id}/products/9999/media/`,
    method: 'post',
    data: req
  })
}

export function fetchImg(id, params) {
  return request({
    url: `/api/seller/${id}/products/${params}/media/`,
    method: 'get',
  })
}


