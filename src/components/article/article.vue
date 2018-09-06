<template>
    <div>
        <div class="title">
            <h3>{{article.title}}</h3></div>
        <div class="time">{{article.time}}</div>
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
.title {
    text-align: center;
}

.time {
    font-size: 0.9em;
    text-align: center;
}
</style>