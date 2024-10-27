import request from '@/utils/request'


export function fetchOrders(query) {
  return request({
    url: "/api/me/orders/",
    method: 'get',
    params: query
  })
}




export function fetchList(query, id) {
  return request({
    url: `/api/seller/${id}/products/`,
    method: 'get',
    params: query
  })
}

export function fetchBrands(query, id) {
  return request({
    url: `/api/seller/${id}/brands/`,
    method: 'get',
    params: query
  })
}

export function fetchCategories(query, id) {
  return request({
    url: `/api/seller/${id}/categories/`,
    method: 'get',
    params: query
  })
}


export function createArticle(data, id) {

  let req = new FormData()
  req.append('sku', data.sku)
  req.append('price', data.price)
  req.append('name_uk', data.name_uk)
  req.append('brand_id', data.brand_id)
  req.append('category_id', data.category_id)

  return request({
    url: `api/seller/${id}/products/`,
    method: 'post',
    data: req
  })
}

export function updateArticle(data, id) {

  let req = new FormData()
  req.append('sku', data.sku)
  req.append('price', data.price)
  req.append('name_uk', data.name_uk)
  req.append('brand_id', +data.brand.id)
  req.append('category_id', data.category_id)

  return request({
    url: `/api/seller/${id}/products/${data.id}/`,
    method: 'put',
    data: req
  })
}

export function deleteArticle(row, id) {
  return request({
    url: `/api/seller/${id}/products/${row}/`,
    method: 'delete',
  })
}

