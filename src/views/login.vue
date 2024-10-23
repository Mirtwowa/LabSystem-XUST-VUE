<route lang="yaml">
meta:
  title: 登录
  constant: true
  layout: false
</route>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import Copyright from '@/layouts/components/Copyright/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import api from '@/api'

defineOptions({
  name: 'Login',
})

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const banner = new URL('../assets/images/login-banner.png', import.meta.url).href
const logo = new URL('../assets/images/logo.png', import.meta.url).href
const title = '双创中心'

// 登录方式，default 账号密码登录，qrcode 扫码登录
const loginType = ref('default')

// 表单类型，login 登录，register 注册，reset 重置密码
const formType = ref('login')
const loading = ref(false)
const redirect = ref(route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath)

// 登录
const loginFormRef = ref<FormInstance>()
// 登陆表单
const loginForm = ref({
  account: localStorage.login_account || '',
  password: '',
  remember: !!localStorage.login_account,
})
const loginRules = ref<FormRules>({
  account: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入邮箱',
    },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})
async function handleLogin() {
  loginFormRef.value && loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore.login(loginForm.value).then(() => {
        loading.value = false
        if (loginForm.value.remember) {
          localStorage.setItem('login_account', loginForm.value.account)
        }
        else {
          localStorage.removeItem('login_account')
        }
        router.push(redirect.value)
      }).catch(() => {
        loading.value = false
        ElMessage.error('用户名或者密码错误')
      })
    }
  },
  )
}

// 注册
const registerFormRef = ref<FormInstance>()
const registerForm = ref({
  account: '',
  captcha: '',
  password: '',
  checkPassword: '',
  userId: new Date().getTime().toString(),
})
const sentCodeForm = ref({
  account: registerForm.value.account,
  userId: registerForm.value.userId,
})
const registerRules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入邮箱' },
    {
      type: 'email',
      message: '请输入正确邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkPassword: [
    { required: true, trigger: 'blur', message: '请再次输入密码' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        else {
          callback()
        }
      },
    },
  ],
})
async function handleRegister() {
  registerFormRef.value && registerFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore.register(registerForm.value).then(() => {
        loading.value = false
        router.push(redirect.value)
      }).catch(() => {
        loading.value = false
        ElMessage.error('验证码错误')
      })
    }
  })
}

// 重置密码
const resetFormRef = ref<FormInstance>()
const resetForm = ref({
  account: localStorage.login_account,
  captcha: '',
  newPassword: '',
})
const resetRules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
  newPassword: [
    { required: true, trigger: 'blur', message: '请输入新密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})
function handleReset() {
  ElMessage({
    message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'info',
  })
  resetFormRef.value && resetFormRef.value.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
    }
  })
}

function testAccount(account: string) {
  loginForm.value.account = account
  loginForm.value.password = '123456'
  handleLogin()
}

/* const sendCode = async(account:string,userId:number)=>{
  const url= `/api/code/simple/send/mail/${account}/user-id/${userId}`
  await api.post(url).then(() => {
    loading.value = false
  }).catch(() => {
    loading.value = false
    ElMessage.error("错误!")
  })
} */
function sendCode() {
  const url = `/api/code/simple/send`
  const res = {
    account: registerForm.value.account,
    userId: registerForm.value.userId,
  }
  api.post(url, res)
  console.log(registerForm.value)
}
</script>

<template>
  <div>
    <div class="bg-banner" />
    <div id="login-box">
      <div class="login-banner">
        <img :src="logo" class="logo">
        <img :src="banner" class="banner">
      </div>
      <ElForm v-show="formType === 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="mb-6">
          <HTabList
            v-model="loginType" :options="[
              { label: '密码登录', value: 'default' },
              { label: '扫码登录', value: 'qrcode' },
            ]"
          />
        </div>
        <template v-if="loginType === 'default'">
          <div class="title-container">
            <h3 class="title">
              欢迎来到 {{ title }} ! 👋🏻
            </h3>
          </div>
          <div>
            <ElFormItem prop="account">
              <ElInput v-model="loginForm.account" placeholder="用户名" type="text" tabindex="1">
                <template #prefix>
                  <SvgIcon name="i-ri:user-3-fill" />
                </template>
              </ElInput>
            </ElFormItem>
            <ElFormItem prop="password">
              <ElInput v-model="loginForm.password" type="password" placeholder="密码" tabindex="2" autocomplete="new-password" show-password @keyup.enter="handleLogin">
                <template #prefix>
                  <SvgIcon name="i-ri:lock-2-fill" />
                </template>
              </ElInput>
            </ElFormItem>
          </div>
          <div class="flex-bar">
            <ElCheckbox v-model="loginForm.remember">
              记住我
            </ElCheckbox>
            <ElLink type="primary" :underline="false" @click="formType = 'reset'">
              忘记密码了?
            </ElLink>
          </div>
          <ElButton :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">
            登录
          </ElButton>
          <div class="sub-link">
            <span class="text">还没有帐号?</span>
            <ElLink type="primary" :underline="false" @click="formType = 'register'">
              创建新帐号
            </ElLink>
          </div>
        </template>
        <template v-else-if="loginType === 'qrcode'">
          <div class="flex flex-col items-center">
            <el-image src="https://s2.loli.net/2024/04/26/GsahtuIZ9XOg5jr.png" class="h-[250px] w-[250px]" />
            <div class="mt-2 op-50">
              请使用微信扫码登录
            </div>
          </div>
        </template>
      </ElForm>
      <ElForm v-show="formType === 'register'" ref="registerFormRef" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on">
        <div class="title-container">
          <h3 class="title">
            探索从这里开始! 🚀
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="registerForm.account" placeholder="邮箱" tabindex="1">
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput v-model="registerForm.captcha" placeholder="验证码" tabindex="2">
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
              <template #append>
                <ElButton @click.prevent="sendCode">
                  发送验证码
                </ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput v-model="registerForm.password" type="password" placeholder="密码" tabindex="3" show-password>
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="checkPassword">
            <ElInput v-model="registerForm.checkPassword" type="password" placeholder="确认密码" tabindex="4" show-password>
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleRegister">
          注册
        </ElButton>
        <div class="sub-link">
          <span class="text">已经有帐号?</span>
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm>
      <ElForm v-show="formType === 'reset'" ref="resetFormRef" :model="resetForm" :rules="resetRules" class="login-form">
        <div class="title-container">
          <h3 class="title">
            忘记密码了? 🔒
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="resetForm.account" placeholder="用户名" type="text" tabindex="1">
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput v-model="resetForm.captcha" placeholder="验证码" type="text" tabindex="2">
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
              <template #append>
                <ElButton>发送验证码</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="newPassword">
            <ElInput v-model="resetForm.newPassword" type="password" placeholder="新密码" tabindex="3" show-password>
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleReset">
          确认
        </ElButton>
        <div class="sub-link">
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm>
    </div>
    <Copyright />
  </div>
</template>

<style lang="scss" scoped>
[data-mode="mobile"] {
  #login-box {
    position: relative;
    top: inherit;
    left: inherit;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    transform: translateX(0) translateY(0);

    .login-banner {
      width: 100%;
      padding: 20px 0;

      .banner {
        position: relative;
        top: inherit;
        right: inherit;
        display: inherit;
        width: 100%;
        max-width: 375px;
        margin: 0 auto;
        transform: translateY(0);
      }
    }

    .login-form {
      width: 100%;
      min-height: auto;
      padding: 30px;
    }
  }

  .copyright {
    position: relative;
  }
}

:deep(input[type="password"]::-ms-reveal) {
  display: none;
}

.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--g-container-bg), var(--g-bg));
}

#login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--g-container-bg);
  border-radius: 10px;
  box-shadow: var(--el-box-shadow);
  transform: translateX(-50%) translateY(-50%);

  .login-banner {
    position: relative;
    width: 450px;
    overflow: hidden;
    background-color: var(--g-bg);

    .banner {
      width: 100%;

      @include position-center(y);
    }

    .logo {
      position: absolute;
      top: 20px;
      left: 20px;
      height: 50px;
      border-radius: 50%;
      box-shadow: var(--el-box-shadow-light);
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    min-height: 500px;
    padding: 50px;
    overflow: hidden;

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 30px;
        font-size: 1.3em;
        font-weight: bold;
        color: var(--el-text-color-primary);
      }
    }
  }

  .el-form-item {
    margin-bottom: 24px;

    :deep(.el-input) {
      width: 100%;
      height: 48px;
      line-height: inherit;

      input {
        height: 48px;
      }

      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }

      .el-input__prefix {
        left: 10px;
      }

      .el-input__suffix {
        right: 10px;
      }
    }
  }

  :deep(.el-divider__text) {
    background-color: var(--g-container-bg);
  }

  .flex-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .sub-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--el-text-color-secondary);

    .text {
      margin-right: 10px;
    }
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}
</style>
