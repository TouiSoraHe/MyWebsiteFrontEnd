<template>
    <div class="blog" 
        v-loading="loadingBlogList" 
        element-loading-background="rgba(255, 255, 255, 0)"
        >
        <div>
            <router-link :to="'/blog/'+item.id" v-for="item in blogList" :key="item.id">
                <card class="card-item" :article="item"></card>
            </router-link>
        </div>
    </div>
</template>
<script>
import card from "components/card/card.vue"

export default {
    data() {
        return {
            blogList: [],
            loadingBlogList: true,
        };
    },
    components: {
        "card": card,
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
                    let o = {
                        id:-1,
                        title:"",
                        time:"",
                        words:"",
                        views:"",
                        summary:""
                    };
                    o.id = item.id;
                    o.title = item.title;
                    o.time = item.time;
                    o.words = item.words;
                    o.views = item.views;
                    o.summary = item.summary;
                    that.blogList.push(o);
                });
            })
            .catch(function(error) {
                that.loadingBlogList = false;
                that.$axiosError(error);
            });
    },
}
</script>
<style scoped>
.card-item{
    margin-bottom: 15px;
}
</style>