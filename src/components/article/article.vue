<template>
    <div>
        <transition name="slide-x-transition" mode="out-in">
            <v-card v-if="article" class="mb-5">
                <v-card-title>
                    <div class="display-1 font-weight-bold">{{article.blogInfo.title}}</div>
                </v-card-title>
                <v-card-text>
                    <span class="body-1 grey--text"><v-icon size="18px">{{$vuetify.icons['calendar']}}</v-icon>{{articleTime}}</span>&nbsp;&nbsp;
                    <span class="body-1 grey--text"><v-icon size="18px">{{$vuetify.icons['file-word']}}</v-icon><span>{{article.blogInfo.words}}</span></span>&nbsp;&nbsp;
                    <span class="body-1 grey--text"><v-icon size="18px">{{$vuetify.icons['eye']}}</v-icon><span>{{article.blogInfo.views}}</span></span>
                </v-card-text>
                <v-divider class="my-3"></v-divider>
                <v-card-text class="subheading" style="text-align: justify;">
                    <vue-markdown :source="article.content" @rendered="markdownRendered"></vue-markdown>
                </v-card-text>
                <v-divider class="mx-3 my-0"></v-divider>
                <v-card-actions class="pa-3" v-if="article.blogInfo.tags && article.blogInfo.tags.length > 0">
                    <my-tag v-for="(tag,index) in article.blogInfo.tags" :key="index" class="mr-2" :to="'/archive/'+tag.id">{{tag.tagName}}</my-tag>
                </v-card-actions>
            </v-card>
        </transition>
        <loading :showLoading="showLoading" style="margin-top: 20px"></loading>
        <transition name="slide-x-transition" mode="out-in">
            <my-comment v-if="article" :blogID="article.id.toString()" class="mb-5"></my-comment>
        </transition>
    </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
import loading from 'components/loading/loading.vue';
import comment from 'components/comment/comment.vue';
import tag from 'components/tag/tag.vue';

export default {
    props: {
        id: String,
    },
    data() {
        return {
            article: null,
            showLoading: false,
            sharedState: this.$store.state,
        };
    },
    computed: {
        articleTime: function() {
            if (!isNaN(Date.parse(this.article.blogInfo.time))) {
                return new Date(this.article.blogInfo.time).Format('yyyy-MM-dd');
            }
            return this.article.blogInfo.time;
        },
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(() => { this.$highlight(); });
        },
        async getBlog(){
            try{
                this.showLoading = true;
                let response = await this.$api.getBlog(this.id);
                this.article = response.data;
                document.title = this.article.blogInfo.title;
                if (this.article.blogInfo.bgImg.large !== undefined) {
                    this.$store.setHeadBgUrl(this.article.blogInfo.bgImg.large);
                }
            }
            catch(error){
                console.log(error);
            }
            finally{
                this.showLoading = false;
            }
        },
    },
    created: function() {
        this.getBlog();
    },
    components: {
        "vue-markdown": VueMarkdown,
        "loading": loading,
        "my-comment": comment,
        "my-tag": tag,
    },
};
</script>
<style scoped>
</style>