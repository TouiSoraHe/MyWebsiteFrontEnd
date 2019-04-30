import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.error(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

export default service
