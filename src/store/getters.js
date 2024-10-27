const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  locale: state => state.app.locale,
  
  token: state => state.user.token,
  info: state => state.user.info,
  shops: state => state.user.shops,
  roles: state => state.user.roles,
  permiss: state => state.user.permiss,

  permission_routes: state => state.permission.routes,

}
export default getters
