<template>
    <div>
        <transition name="slide-x-transition" mode="out-in">
            <v-card v-if="article">
                <v-card-title>
                    <div class="display-1 font-weight-bold">{{article.title}}</div>
                </v-card-title>
                <v-card-text>
                    <span class="body-1 grey--text"><v-icon size="18px">date_range</v-icon>{{articleTime}}</span>&nbsp;&nbsp;
                    <span class="body-1 grey--text"><v-icon size="18px">title</v-icon><span>{{article.words}}</span></span>&nbsp;&nbsp;
                    <span class="body-1 grey--text"><v-icon size="18px">visibility</v-icon><span>{{article.views}}</span></span>
                </v-card-text>
                <v-divider class="my-3"></v-divider>
                <v-card-text class="subheading" style="text-align: justify;">
                    <vue-markdown :source="article.content" @rendered="markdownRendered"></vue-markdown>
                </v-card-text>
            </v-card>
        </transition>
        <loading :showLoading="showLoading" style="margin-top: 20px"></loading>
        <transition name="slide-x-transition" mode="out-in">
            <comment v-if="article" :comments="article.comments"></comment>
        </transition>
    </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
import loading from 'components/loading/loading.vue';
import comment from 'components/comment/comment.vue';

export default {
    props: {
        id: {
            type: String,
        },
    },
    data() {
        return {
            article: null,
            showLoading:false,
            sharedState: this.$store.state,
        };
    },
    computed:{
        articleTime:function(){
            if(!isNaN(Date.parse(this.article.time))){
                return new Date(this.article.time).Format('yyyy-MM-dd');
            }
            return this.article.time;
        },
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
            .get('/api/blogs/' + that.id)
            .then((response) => {
                that.showLoading = false;
                if (!response.data.id || !response.data.title || !response.data.content) {
                    console.log("获取article时数据有误:" + response.data.id);
                }
                that.article = response.data;
                document.title = that.article.title;
                if(that.article.imgUrl !== undefined){
                    that.$store.setHeadBgUrl(that.article.imgUrl);
                }
            })
            .catch((error) => {
                that.showLoading = false;
                console.log("获取article时发生了错误:" + error);
            });
    },
    components: {
        "vue-markdown": VueMarkdown,
        "loading":loading,
        "comment":comment,
    },
};
</script>
<style scoped>
</style>