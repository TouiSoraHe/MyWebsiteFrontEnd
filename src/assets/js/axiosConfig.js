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

function callBack(func, para) {
    if (func !== null && func !== undefined) {
        if (para !== undefined) {
            func(para);
        }
        else {
            func();
        }
    }
}

function get(url,success, completed, error){
    axios
        .get(url)
        .then((response) => {
            callBack(completed);
            callBack(success, response);
        })
        .catch((errorMsg) => {
            callBack(completed);
            callBack(error, errorMsg);
            console.error(url+":"+errorMsg);
        });
}

Api.prototype = {
    constructor: Api,
    getBlog: function(para, success, completed, error) {
        get('/api/blogs/' + para.id,success,completed,error);
    },
    getBlogInfosByPage: function(para, success, completed, error) {
        get('/api/blog-infos?_limit='+para.limt+'&_page='+(para.currentPage+1),success,completed,error);
    },
    getBlogInfosByIDs: function(para, success, completed, error) {
        let first = true;
        let parametersString = new String();
        para.blogInfoIDs.forEach((id)=>{
            if(!first){
                parametersString += '&';
            }
            parametersString += 'id='+id;
            if(first){
                first = false;
            }
        });
        get('/api/blog-infos?'+parametersString,success,completed,error);
    },
    getUser: function(para, success, completed, error) {
        get('/api/users/' + para.userID,success,completed,error);
    },
    getTags: function(para, success, completed, error) {
        get('/api/tags',success,completed,error);
    },
    getTag: function(para, success, completed, error) {
        get('/api/tags/'+para.id,success,completed,error);
    },
};

Vue.prototype.$api = new Api();