import axios from 'axios'
import Vue from 'vue'

export default{
    init:function(){
        Vue.prototype.$axios = axios;

        let lodingInstance;
        // 添加请求拦截器
        axios.interceptors.request.use(function (config) {
            // 在发送请求之前打开longding
            lodingInstance = Vue.prototype.$loading({
                lock:true,
                text:"test",
            });
            return config;
          }, function (error) {
            // 请求错误时关闭loading
            lodingInstance.close();
            Vue.prototype.$message({
                message: error.message,
                type: 'error',
                duration: 2000,
                showClose: true,
                center: true
            });
            return Promise.reject(error);
          });

        // 添加响应拦截器
        axios.interceptors.response.use(function (response) {
            // 收到响应是关闭loading
            lodingInstance.close();
            return response;
          }, function (error) {
            // 相应错误时关闭loading
            lodingInstance.close();
            //弹出消息框
            if (error.response) {
                Vue.prototype.$message({
                    message: '网络请求错误:' + error.response.status,
                    type: 'error',
                    duration: 2000,
                    showClose: true,
                    center: true
                });
            } else {
                Vue.prototype.$message({
                    message: error.message,
                    type: 'error',
                    duration: 2000,
                    showClose: true,
                    center: true
                });
            }
            return Promise.reject(error);
          });
    },
}