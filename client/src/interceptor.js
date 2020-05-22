import axios from 'axios'
import Message from 'element-ui'
import router from './router'

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
  if (localStorage.eleToken) config.headers.Authorization = localStorage.eleToken
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截  401 token过期处理
axios.interceptors.response.use(response => {
  return response
}, error => {
  Message.error(error.response.data)

  const { status } = error.response
  if (status === 401) {
    Message.error('The login has run out of time. Please login again!')
    localStorage.removeItem('eleToken')
    router.push('/login')
  }

  return Promise.reject(error)
})

export default axios
