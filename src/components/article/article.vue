<template>
    <div>
        <div class="title">{{article.title}}</div>
        <div class="time">{{article.time}}</div>
        <div class="content">{{article.content}}</div>
    </div>
</template>
<script>
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
}
</script>
<style scoped>
.title {
    font-size: 1.17em;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
}

.time {
    font-size: 0.75em;
    font-weight: 200;
    text-align: center;
    margin-bottom: 20px;
}
</style>