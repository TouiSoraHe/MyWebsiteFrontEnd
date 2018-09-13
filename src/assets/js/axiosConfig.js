import axios from 'axios'
import Vue from 'vue'


function errorMessage(msg){
    Vue.prototype.$message({
        message: msg,
        type: 'error',
        duration: 2000,
        showClose: true,
        center: true
    });
}

let lodingInstance;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    lodingInstance = Vue.prototype.$loading({});
    return config;
  }, function (error) {
    lodingInstance.close();
    errorMessage(error.message);
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    lodingInstance.close();
    return response;
  }, function (error) {
    lodingInstance.close();
    //弹出消息框
    if (error.response) {
        errorMessage('网络请求错误:' + error.response.status);
    } else {
        errorMessage(error.message);
    }
    return Promise.reject(error);
  });

export default{
    init:function(){
        Vue.prototype.$axios = axios;
    },
}