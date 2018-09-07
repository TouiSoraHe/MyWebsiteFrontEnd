<template>
    <div class="article">
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
        };
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(()=>{this.highlight();});
        },
    },
    created: function() {
        var that = this;
        this.$axios
            .get('/api/blog/' + that.id)
            .then(function(response) {
                that.article.title = response.data.title;
                that.article.time = response.data.time;
                that.article.content = response.data.content;
            });
    },
    components: {
        "vue-markdown": VueMarkdown
    },
}
</script>
<style scoped>
.article{
    padding: 40px;
    background-color: #fff;
    border-radius: 5px;
}

.title {
    text-align: center;
}

.time {
    font-size: 0.9em;
    text-align: center;
}

.noneHr{
    width: 100%;
    margin: 1.5em 0;
    padding: 0.1px 0;
} 
</style>