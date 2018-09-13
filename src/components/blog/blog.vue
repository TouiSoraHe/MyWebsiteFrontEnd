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
            .then((response) => {
                response.data.forEach(function(item) {
                    if (!item.id || !item.title || !item.summary) {
                        console.log("获取blogList时数据有误:" + item.id);
                    }
                    that.blogList.push(item);
                });
            })
            .catch((error) => {
                console.log("获取blogList时发生了错误:" + error);
            });
    },
}
</script>
<style scoped>
.card-item {
    margin-bottom: 25px;
}
</style>