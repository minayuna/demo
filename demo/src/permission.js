import router from '@/router'
import pinia from './stores'
import useUserStore from './stores/modules/user'
import { ElMessage } from 'element-plus'
let userStore = useUserStore(pinia)
function checkUserRight(path) {
  if (path === '/score') {
    if (userStore.userType === 2) {
      return true
    } else {
      return false
    }
  }
  return true
}
//全局前置路由守卫
router.beforeEach((to, from, next) => {
  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (username) {
      if (checkUserRight(to.path)) {
        next()
      } else {
        ElMessage({
          type: 'error',
          message: '没有访问权限'
        })
        return
      }
    } else {
      try {
        userStore.userInfo()
        next()
      } catch (error) {
        userStore.userLogout()
        next({ path: '/'})
      }
    }
  } else {
    if (to.path === '/' || to.path === '/home') {
      next()
    } else {
      next({ path: '/'})
      ElMessage({
        type: 'error',
        message: '请先登录!'
      })
    }
  }
})
//全局后置路由守卫
router.afterEach((to, from) => {
  document.title = `大赛 - ${to.meta.title}`
})