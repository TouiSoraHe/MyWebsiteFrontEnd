<template>
    <div class="card" v-if="article">
        <h4 class="text-center title">{{article.title}}</h4>
        <div class="text-center">
            <i class="my-icon-calendar time" v-show="article.time">&nbsp;发表于&nbsp;{{article.time}}</i>
            <span v-show="article.words">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <i class="my-icon-word_files_icon words" v-show="article.words">&nbsp;字数&nbsp;{{article.words}}</i>
            <span v-show="article.views">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <i class="my-icon-eye views" v-show="article.views">&nbsp;阅读次数&nbsp;{{article.views}}</i>
        </div>
        <hr>
        <div class="content" v-if="article.summary"><vue-markdown :source="article.summary" @rendered="markdownRendered"></vue-markdown></div>
    </div>
</template>
<script>
import VueMarkdown from "vue-markdown"

export default {
    props: {
        article: {
            type: Object
        }
    },
    components: {
        "vue-markdown": VueMarkdown
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(() => { this.$highlight(); });
        },
    },
}
</script>
<style scoped>
.card {
    position: relative;
    padding: 20px;
    z-index: 0;
    color: #606c76;
}

.card:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 2px 2px 3px #999;
    border-radius: 5px;
    transition: all 0.1s linear;
}

.card:hover:before {
    cursor: pointer;
    top: -4px;
    bottom: -4px;
    right: -4px;
    left: -4px;
    background-color: rgba(255, 255, 255, 1);
    transition: all 0.2s linear;
}

.title {
    color: #444;
    font-size: 23px;
}

.time,.words,.views{
    font-size: 13px;
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

.content {
    color: #555;
    font-size: 14px;
}
</style>