// Vue.filter('OrderDate', function(value) {
//     if (!value) return ''
//     const date = new Date(value)
//     const year = date.getFullYear()
//     const month = String(date.getMonth() + 1).padStart(2, '0')
//     const day = String(date.getDate()).padStart(2, '0')
//     const hours = String(date.getHours()).padStart(2, '0')
//     const minutes = String(date.getMinutes()).padStart(2, '0')
//     return `${year}-${month}-${day} ${hours}:${minutes}`
//     return value.slice(1, 8)
//   })


export default function orderFilter( value ) {

    if (!value) return ''
    const date = new Date(value)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}  |  ${hours}:${minutes}`
  
}