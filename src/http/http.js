"use strict"
import axios from 'axios'
import qs from "qs"
import env from "./env"

axios.interceptors.request.use(config=>{
  return config
},error=>{
  return Promise.reject(error)
})
axios.interceptors.response.use(response=>{
  return response
},error=>{
  return Promise.resolve(error.response)
})
function checkStatus(response){
  // Loading
  // 如果http的状态码正常  则直接返回数据
  if(response&&(response.status === 200 || response.status === 304 ||response.status === 400)){
    return response
    // 如果不需要处理data之外的数据  直接return response.data
  }
  // 异常状态下  把错误的信息返回出去
  return{
    status:-404,
    msg:"网络异常，稍后重试"
  }
}

function checkCode(res){
  // 如果code异常（这里已经包括网络错误，服务器错误，后端抛出的错误），并弹出一个错误提示告诉用户
  if(res.status == 404){
    console.log(res.msg);
    
  }
  if(res.status === 500){
    console.log(res.msg);
    
  }
  return res
}

export default{
  post(url,data){
    return axios({
      method:"post",
      baseURL:env.baseurl,
      url,
      data:qs.stringify(data),
      timeout:10000,
      headers:{
          'X-Requested-With':"XMLHttpRequest",
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((response)=>{
      return checkStatus(response)
    }).then((res)=>{
      return checkCode(res)
    })
  },
  get(url,params){
    return axios({
      method:"get",
      baseURL:env.baseurl,
      url,
      params,//get请求时带的参数
      timeout:10000,
      headers:{
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then((response)=>{
      return checkStatus(response)
    }).then((res)=>{
      return checkCode(res)
    })
  }
}