import axios from 'axios'

// 拦截请求
axios.interceptors.request.use(config => {
  // config.withCredentials = true
  config.timeout = 5000
  return config
})

// 拦截响应
axios.interceptors.response.use(res => {
  return res.data
})
