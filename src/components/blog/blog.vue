<template>
    <div class="blog">
        <transition name="el-zoom-in-center" mode="out-in">
            <div v-if="blogInfo.length > 0">
                <router-link :to="'/blog/'+item.blogID" v-for="item in blogInfo" :key="item.id">
                    <card class="card-item" :article="item"></card>
                </router-link>
            </div>
        </transition>
        <loading :showLoading="showLoading" style="margin-top: 20px"></loading>
        <div id="blogInfoLazyLoadingObserver"></div>
    </div>
</template>
<script>
import card from "components/card/card.vue"
import loading from 'components/loading/loading.vue'

export default {
    data() {
        return {
            blogInfo: [],
            showLoading:false,
            limt:10,
            currentPage:0,
            totalPage:0,
        };
    },
    components: {
        "card": card,
        "loading":loading
    },
    methods:{
        loadBlogInfo(){
            var that = this;
            if(that.showLoading) return;
            console.log("开始加载博客列表,currentPage:"+that.currentPage);
            that.showLoading = true;
            this.$axios({
                    url: '/api/blogInfo?_limit='+that.limt+'&_page='+(that.currentPage+1),
                    method: 'get'
                })
                .then((response) => {
                    that.showLoading = false;
                    that.totalPage = parseInt(response.headers['x-total-count']);
                    if(response.data.length>0){
                        that.currentPage++;
                    }
                    response.data.forEach(function(item) {
                        if (!item.id || !item.title || !item.summary) {
                            console.log("获取blogInfo时数据有误:" + item.id);
                        }
                        that.blogInfo.push(item);
                    });
                })
                .catch((error) => {
                    that.showLoading = false;
                    console.log("获取blogInfo时发生了错误:" + error);
                });
        },
    },
    mounted: function() {
        let that = this;
        this.$nextTick(()=>{
            //blogInfo懒加载
            const config = {
                rootMargin: '0px 0px 500px 0px',
                threshold: 0
            };
            let observer = new IntersectionObserver((entries, self)=>{
                if (entries[0].intersectionRatio <= 0) return;
                if(that.currentPage*that.limt<that.totalPage || that.currentPage==0){
                    that.loadBlogInfo();
                }
            }, config);
            observer.observe(document.querySelector('#blogInfoLazyLoadingObserver'));
        });
    },
}
</script>
<style scoped>
.card-item {
    margin-bottom: 25px;
}
</style>