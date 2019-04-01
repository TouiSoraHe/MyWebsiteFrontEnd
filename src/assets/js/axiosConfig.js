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

function fixBlogInfo(blogInfo){
    if(blogInfo.blogID === undefined){
        blogInfo.blogID = blogInfo.blogId;
    }
}

function fixBlogInfos(blogInfos){
    for(let blogInfo of blogInfos){
        fixBlogInfo(blogInfo);
    }
}

function fixComment(comment){
    if(comment.blogID === undefined){
        comment.blogID = comment.blogId;
    }
    if(comment.parentID === undefined){
        comment.parentID = comment.parentId;
    }
}

function fixComments(comments){
    for(let comment of comments){
        fixComment(comment);
    }
}

Api.prototype = {
    constructor: Api,
    getBlog: function(id) {
        return axios.get('/api/blog/' + id);
    },
    getBlogInfosByPage: async function(limt,currentPage) {
        let ret = await axios.get('/api/blog-info?_sort=time&_order=DESC&_limit='+limt+'&_page='+(currentPage+1));
        fixBlogInfos(ret.data);
        return ret;
    },
    getBlogInfosByIDs: async function(blogInfoIDs) {
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
        let ret = await axios.get('/api/blog-info?_sort=time&_order=DESC&'+parametersString);
        fixBlogInfos(ret.data);
        return ret;
    },
    getUser: function(userID) {
        return axios.get('/api/user/' + userID);
    },
    getTags: function() {
        return axios.get('/api/tag');
    },
    getTag: function(id) {
        return axios.get('/api/tag/'+id);
    },
    getComment: async function(blogID,limt,page){
        let response = await axios.get('/api/comment?blogID='+blogID+'&_limit='+limt+'&_page='+page+'&_sort=time');
        let rootTotalCount = parseInt(response.headers['x-total-count']);
        let comments = response.data.slice();
        fixComments(comments);
        return {
            comments:comments,
            rootTotalCount:rootTotalCount,
        };
    },
    getCommentBackUp: async function(blogID,limt,page){
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
        fixComments(comments);
        return {
            comments:comments,
            rootTotalCount:rootTotalCount,
        };
    },
    addComment:async function(comment){
        let response = await axios.post('/api/comment',comment);
        fixComment(response.data);
        return response;
    },
    getBloggerInfo:async function() {
        let response = await axios.get('/api/blogger-info');
        return response;
        
    },
};

Vue.prototype.$api = new Api();