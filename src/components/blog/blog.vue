<template>
    <div class="blog">
        <transition name="el-zoom-in-center" mode="out-in">
            <div v-if="blogList.length">
                <router-link :to="'/blog/'+item.id" v-for="item in blogList" :key="item.id">
                    <card class="card-item" :article="item"></card>
                </router-link>
            </div>
        </transition>
    </div>
</template>
<script>
import card from "components/card/card.vue"

export default {
    data() {
        return {
            blogList: [],
        };
    },
    components: {
        "card": card,
    },
    created: function() {
        var that = this;
        this.$axios({
                url: '/api/blogList',
                method: 'get'
            })
            .then(function(response) {
                response.data.forEach(function(item) {
                    let o = {
                        id: -1,
                        title: "",
                        time: "",
                        words: "",
                        views: "",
                        summary: ""
                    };
                    o.id = item.id;
                    o.title = item.title;
                    o.time = item.time;
                    o.words = item.words;
                    o.views = item.views;
                    o.summary = item.summary;
                    that.blogList.push(o);
                });
            });
    },
}
</script>
<style scoped>
.card-item {
    margin-bottom: 25px;
}
</style>