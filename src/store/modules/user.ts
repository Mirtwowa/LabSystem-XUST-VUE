import useSettingsStore from './settings'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'
import api from "@/api";
import login from '@/api/modules/user.ts'
import {ElMessage} from "element-plus";
const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()
    const status = ref(localStorage.status ?? '')
    const account = ref(localStorage.account ?? '')
    const token = ref(localStorage.token ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value!=0) {
        return true
      }else if(status.value=='用户名错误'||status.value=='密码错误'){
        return false
      }else
      return false
    })

    // 登录
    async function login(data: {
      account: string
      password: string
    }) {
      const res = await apiUser.login(data)
      localStorage.setItem('status',res.data.message)
      localStorage.setItem('account', res.data.account)
      localStorage.setItem('token', res.data.data)
      localStorage.setItem('avatar', res.data.avatar)
      account.value = res.data.account
      token.value = res.data.token
      avatar.value = res.data.avatar
    }
    async function register(data: {
      account: string
      captcha: string
      password: string
      checkPassword: string
      userId:string
    }) {
      const res = await apiUser.register(data)
      localStorage.setItem('status',res.data.message)
      localStorage.setItem('token', res.data.data)
      account.value = res.data.account
      token.value = res.data.token
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      localStorage.removeItem('avatar')
      account.value = ''
      token.value = ''
      avatar.value = ''
      permissions.value = []
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      avatar,
      permissions,
      isLogin,
      login,
      logout,
      register,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
