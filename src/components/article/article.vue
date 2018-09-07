<template>
    <div class="article" v-loading="loadingArticle" element-loading-background="rgba(255, 255, 255, 0)" :style="articleStyleObj">
        <div class="title">
            <h3>{{article.title}}</h3></div>
        <div class="time">{{article.time}}</div>
        <div class="noneHr"></div>
        <div class="content">
            <vue-markdown :source="article.content" @rendered="markdownRendered"></vue-markdown>
        </div>
    </div>
</template>
<script>
import VueMarkdown from "vue-markdown"

export default {
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            article: {
                title: "",
                time: "",
                content: "",
            },
            loadingArticle: true,
        };
    },
    computed:{
        articleStyleObj:function(){
            if(this.loadingArticle){
                return {
                    "background-color": "rgba(255,255,255,0)"
                };
            }
            else{
                return {
                    "background-color": "rgba(255,255,255,1)"
                };
            }
        },
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(() => { this.highlight(); });
        },
    },
    created: function() {
        var that = this;
        that.loadingArticle = true;
        this.$axios
            .get('/api/blog/' + that.id)
            .then(function(response) {
                that.loadingArticle = false;
                that.article.title = response.data.title;
                that.article.time = response.data.time;
                that.article.content = response.data.content;
            })
            .catch(function(error) {
                that.loadingArticle = false;
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
    components: {
        "vue-markdown": VueMarkdown
    },
}
</script>
<style scoped>
.article {
    padding: 40px;
    background-color: rgba(255,255,255,1);
    border-radius: 5px;
}

.title {
    text-align: center;
}

.time {
    font-size: 0.9em;
    text-align: center;
}

.noneHr {
    width: 100%;
    margin: 1.5em 0;
    padding: 0.1px 0;
}
</style>