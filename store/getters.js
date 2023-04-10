const getters = {
  elements: state => state.auth.elements,
  version: state => state.app.version,
  updateProgress: state => state.app.updateProgress,
  updateState: state => state.app.updateState,
  updateing: state => state.app.updateing,
  needUpdate:state => state.app.needUpdate,
  deviceInfo:state => state.app.deviceInfo,
  newCount:state => state.app.newCount,
  taskCount:state => state.app.taskCount,
  userInfo: state => state.auth.userInfo,
}
export default getters