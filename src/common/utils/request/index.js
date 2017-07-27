/**
 * 封装了 Http 请求和错误处理
 */
import axios from 'axios'
import './interceptors'
import { serverConfig } from '@/common/config'

const axiosConfig = {
  baseURL: serverConfig.host
}

function _Get (url, params = {}) {
  return axios.get(url, Object.assign(axiosConfig, {
    params: params
  }))
}

function _Post (url, params = {}) {
  return axios.post(url, params, Object.assign(axiosConfig, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }))
}

export default {
  get: _Get,
  post: _Post
}
