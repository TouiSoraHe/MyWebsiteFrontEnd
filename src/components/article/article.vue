<template>
    <div>
        <transition name="el-zoom-in-center" mode="out-in">
            <div class="article" v-if="article" key="article">
                <h3 class="title text-center">{{article.title}}</h3>
                <div class="text-center">
                    <i class="my-icon-calendar time" v-if="article.time">&nbsp;发表于&nbsp;{{article.time}}</i>
                    <span v-if="article.words">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <i class="my-icon-word_files_icon words" v-if="article.words">&nbsp;字数&nbsp;{{article.words}}</i>
                    <span v-if="article.views">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <i class="my-icon-eye views" v-if="article.views">&nbsp;阅读次数&nbsp;{{article.views}}</i>
                </div>
                <div class="noneHr"></div>
                <div class="content">
                    <vue-markdown :source="article.content" @rendered="markdownRendered"></vue-markdown>
                </div>
            </div>
            <loading v-else key="loading" :showLoading="showLoading" style="margin-top: 100px"></loading>
        </transition>
    </div>
</template>
<script>
import VueMarkdown from "vue-markdown"
import loading from 'components/loading/loading.vue'

export default {
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            article: null,
            showLoading:false,
        };
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(() => { this.$highlight(); });
        },
    },
    created: function() {
        let that = this;
        that.showLoading = true;
        this.$axios
            .get('/api/blog/' + that.id)
            .then((response) => {
                that.showLoading = false;
                if (!response.data.id || !response.data.title || !response.data.content) {
                    console.log("获取article时数据有误:" + response.data.id);
                }
                that.article = response.data;
                document.title = that.article.title;
            })
            .catch((error) => {
                that.showLoading = false;
                console.log("获取article时发生了错误:" + error);
            });
    },
    components: {
        "vue-markdown": VueMarkdown,
        "loading":loading,
    },
}
</script>
<style scoped>
.article {
    padding: 40px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 1px #bdbdbd;
}

.title {
    color: #444;
}

.time,
.words,
.views {
    font-size: 0.8em;
}

.time {
    color: #00a7e0;
}

.words {
    color: #000;
}

.views {
    color: #ff3f1a;
}

.noneHr {
    width: 100%;
    margin: 1.5em 0;
    padding: 0.1px 0;
}
</style>