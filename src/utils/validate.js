
/**
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
  // console.log( /^(https?:|mailto:|tel:)/.test(path) )
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  // console.log( valid_map )
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}
