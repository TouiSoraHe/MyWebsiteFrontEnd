import axios from 'axios';
import Vue from 'vue';

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
    }
    else {
        errorMessage(error.message);
    }
    // router.go(-1);
    return Promise.reject(error);
});

function Api() {}

Api.prototype = {
    constructor: Api,
    getBlog: function(id) {
        return axios.get('/api/blogs/' + id);
    },
    getBlogInfosByPage: function(limt,currentPage) {
        return axios.get('/api/blog-infos?_limit='+limt+'&_page='+(currentPage+1));
    },
    getBlogInfosByIDs: function(blogInfoIDs) {
        let first = true;
        let parametersString = new String();
        blogInfoIDs.forEach((id)=>{
            if(!first){
                parametersString += '&';
            }
            parametersString += 'id='+id;
            if(first){
                first = false;
            }
        });
        return axios.get('/api/blog-infos?'+parametersString);
    },
    getUser: function(userID) {
        return axios.get('/api/users/' + userID);
    },
    getTags: function() {
        return axios.get('/api/tags');
    },
    getTag: function(id) {
        return axios.get('/api/tags/'+id);
    },
};

Vue.prototype.$api = new Api();