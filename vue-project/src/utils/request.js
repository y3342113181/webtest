import axios from 'axios'

const request = axios.create({
  baseURL: 'https://ijournal.topeditsci.com',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在这里可以添加token等认证信息
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request 