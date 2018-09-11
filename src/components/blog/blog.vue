<template>
    <div class="blog" 
        v-loading="loadingBlogList" 
        element-loading-background="rgba(255, 255, 255, 0)"
        >
        <div>
            <router-link :to="'/blog/'+item.id" v-for="item in blogList" :key="item.id">
                <card class="card-item">
                    <div slot="title">{{item.title}}</div>
                    <div slot="time">{{item.time}}</div>
                    <div slot="content">
                        <vue-markdown :source="item.summary" @rendered="markdownRendered"></vue-markdown>
                    </div>
                </card>
            </router-link>
        </div>
    </div>
</template>
<script>
import card from "components/card/card.vue"
import VueMarkdown from "vue-markdown"

export default {
    data() {
        return {
            blogList: [],
            loadingBlogList: true,
        };
    },
    components: {
        "card": card,
        "vue-markdown": VueMarkdown
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(() => { this.highlight(); });
        },
    },
    created: function() {
        var that = this;
        that.loadedBlogList = true;
        this.$axios({
                url: '/api/blogList',
                method: 'get'
            })
            .then(function(response) {
                that.loadingBlogList = false;
                response.data.forEach(function(item) {
                    that.blogList.push(item);
                });
            })
            .catch(function(error) {
                that.loadingBlogList = false;
                if (error.response) {
                    that.$message({
                        message: '网络请求错误:' + error.response.status,
                        type: 'error',
                        duration: 2000,
                        showClose: true,
                        center: true
                    });
                } else {
                    that.$message({
                        message: error.message,
                        type: 'error',
                        duration: 2000,
                        showClose: true,
                        center: true
                    });
                }
            });
    },
}
</script>
<style scoped>
.card-item{
    margin-bottom: 15px;
}
</style>