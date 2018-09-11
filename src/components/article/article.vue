<template>
    <div v-loading="loadingArticle" element-loading-background="rgba(255, 255, 255, 0)">
        <div class="article" v-show="articleIsShow">
            <h3 class="title text-center">{{article.title}}</h3>
            <div class="text-center">
                <i class="my-icon-calendar time" v-show="article.time">&nbsp;发表于&nbsp;{{article.time}}</i>
                <span v-show="article.words">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <i class="my-icon-word_files_icon words" v-show="article.words">&nbsp;字数&nbsp;{{article.words}}</i>
                <span v-show="article.views">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <i class="my-icon-eye views" v-show="article.views">&nbsp;阅读次数&nbsp;{{article.views}}</i>
            </div>
            <div class="noneHr"></div>
            <div class="content">
                <vue-markdown :source="article.content" @rendered="markdownRendered"></vue-markdown>
            </div>
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
                words:"",
                views:"",
                content: "",
            },
            articleIsShow:false,
            loadingArticle: true,
        };
    },
    computed:{
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(() => { this.$highlight(); });
        },
    },
    created: function() {
        let that = this;
        that.loadingArticle = true;
        that.articleIsShow = false;
        this.$axios
            .get('/api/blog/' + that.id)
            .then(function(response) {
                that.article.title = response.data.title;
                that.article.time = response.data.time;
                that.article.words = response.data.words;
                that.article.views = response.data.views;
                that.article.content = response.data.content;
                document.title = response.data.title;
                that.loadingArticle = false;
                that.articleIsShow = true;
            })
            .catch(function(error) {
                that.loadingArticle = false;
                that.$axiosError(error);
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
    box-shadow: 0 0 1px #bdbdbd;
}

.title {
    color:#444;
}

.time,.words,.views {
    font-size: 0.8em;
}

.time {
    color: #00a7e0;
}

.words{
    color: #000;   
}

.views{
    color:#ff3f1a;
}

.noneHr {
    width: 100%;
    margin: 1.5em 0;
    padding: 0.1px 0;
}
</style>