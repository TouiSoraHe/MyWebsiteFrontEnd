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
        return axios.get('/api/blog-infos?_sort=time&_order=DESC&_limit='+limt+'&_page='+(currentPage+1));
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
        return axios.get('/api/blog-infos?_sort=time&_order=DESC&'+parametersString);
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
    getComment: async function(blogID,limt,page){
        let response =  await axios.get('/api/comments?blogID='+blogID+'&parentID=-1&_limit='+limt+'&_page='+page+'&_sort=time');
        let rootTotalCount = parseInt(response.headers['x-total-count']);
        let comments = response.data.slice();
        async function getAllChildComments(rootComments){
            for (var i = 0; i < rootComments.length; i++) {
                response =  await axios.get('/api/comments?blogID='+blogID+'&parentID='+rootComments[i].id);
                if(response.data.length>0){
                    comments = comments.concat(response.data);
                    await getAllChildComments(response.data);
                }
            }
        }
        await getAllChildComments(response.data);
        return {
            comments:comments,
            rootTotalCount:rootTotalCount,
        };
    },
};

Vue.prototype.$api = new Api();