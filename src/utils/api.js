import axios from 'axios'
import { Message } from "element-ui"

axios.interceptors.request.use(config =>{
  if (window.sessionStorage.getItem('tokenStr')) {
    console.log(config)
    config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
  }
  return config
} , error =>{
  return Promise.reject(error)
})

axios.interceptors.response.use(success => {
  // if (success.status && success.status == 200) {
    // if (success.status == 403 || success.status == 401 || success.status == 500) {
      Message.success({message: success.data.Message})
      return success.data;
    // } 
  // }
}, error => {
  // if (error.response.code == 504 || error.response.code == 404) {
  //   Message.error({message: "无法连接服务器"})
  // } else if (error.response.code == 403) {
  //   Message.error({message: "权限不足"})
  // } else if (error.response.code == 401) {
  //   Message.error({message: "尚未登陆"})
  //   router.replace('/')
  // } else {
  //   if (error.response.data.message) {
  //     Message.error({message: error.response.data.message})
  //   } else {
  //     Message.error({message: "未知错误"})
  //   }
  // }
  Message.error({message: "无法连接服务器"})
  return error;
})

let base = '/acc'

export const postRequest= (url , params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}

export const getRequest= (url,params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params
  })
}

export const putRequest= (url,params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}

export const deleteRequest= (url,params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}