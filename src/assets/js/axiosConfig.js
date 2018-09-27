import axios from 'axios'
import Vue from 'vue'
// import router from 'assets/js/router'

function errorMessage(msg){
    console.error(msg);
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    errorMessage(error.message);
    // router.go(-1);
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    //弹出消息框
    if (error.response) {
        errorMessage('网络请求错误:' + error.response.status);
    } else {
        errorMessage(error.message);
    }
    // router.go(-1);
    return Promise.reject(error);
  });

export default{
    init:function(){
        Vue.prototype.$axios = axios;
    },
}