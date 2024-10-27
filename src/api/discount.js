import request from '@/utils/request'

// const min = 1;
// const max = 4;
// function randomNum(min, max) {
// 	return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
// }

// const test = {
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
//   name: 'Скидка_',
//   number: 0,
//   status: '',
//   type: '',
//   value: '',
//   valid_from: '',
//   valid_to: '',
// }

// for (let i = 0; i < 110; i++) {
//   test.name = 'Скидка_'+i,
//   test.number = +new Date() + i
//   test.status = randomNum(min, max)
//   test.type = randomNum(1, 2)
//   test.value = 0
//   test.valid_from = '2017-01-02 03:04:05'
//   test.valid_to = '2017-01-02 03:04:05'
//   console.log( test )
//   createPromo(test)
// }

// export function createPromo(data) {

//   let req = new FormData()
//   req.append('description', data.description)
//   req.append('name', data.name)
//   req.append('number', data.number)
//   req.append('status', data.status)
//   req.append('type', data.type)
//   req.append('value', data.value)
//   req.append('valid_from', data.valid_from)
//   req.append('valid_to', data.valid_to)

//   return request({
//     url: 'api/seller/1/discount/',
//     method: 'post',
//     data: req
//   })
// }

const status = {
  'Черновик': 1,
  'Действующий': 2,
  'Отменённый': 3,
  'Завершенный': 4,
}

const type = {
  'Процент': 1,
  'Сумма': 2,
}

export function fetchDiscount(query) {
  return request({
    url: '/api/seller/1/discount/',
    method: 'get',
    params: query
  })
}



export function createDiscount(data, id) {
// console.log( data )
  let req = new FormData()
  req.append('description', data.description)
  req.append('name', data.name)
  req.append('number', data.number)
  req.append('status', data.status)
  req.append('value', data.value)
  req.append('valid_from', data.valid_from.toISOString())
  req.append('valid_to', data.valid_to.toISOString())

  return request({
    url: `api/seller/${id}/discount/`,
    method: 'post',
    data: req
  })
}

export function updateDiscount(data) {

  let req = new FormData()
  req.append('description', data.description)
  req.append('name', data.name)
  req.append('number', data.number)
  req.append('status', data.status)
  req.append('value', data.value)
  req.append('valid_from', data.valid_from.toISOString())
  req.append('valid_to', data.valid_to.toISOString())

  return request({
    url: `/api/seller/1/discount/${data.id}/`,
    method: 'put',
    data: req
  })
}

export function deleteDiscount(id) {
  return request({
    url: `/api/seller/1/discount/${id}/`,
    method: 'delete',
  })
}

