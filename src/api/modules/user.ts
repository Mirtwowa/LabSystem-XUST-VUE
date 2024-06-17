import api from '../index'
import {data} from "autoprefixer";

export default {
  //登录
  login: (data: {
    account: string
    password: string,
  }) => api.post('/userLogin', data)
  ,
  register: (data: {
    account: string,
    captcha: string,
    password: string,
    checkPassword: string,
    userId: string
  }) => api.post('/register', data)
  ,
  sendCode:(data:{
    account:string,
    userId:string
  })=>api.post('api/code/simple/send'),
  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),
}
