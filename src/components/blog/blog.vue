<template>
    <div class="blog">
        <transition name="el-zoom-in-center" mode="out-in">
            <div v-if="blogList.length > 0">
                <router-link :to="'/blog/'+item.blogID" v-for="item in blogList" :key="item.id">
                    <card class="card-item" :article="item"></card>
                </router-link>
            </div>
        </transition>
        <loading :showLoading="showLoading" style="margin-top: 100px"></loading>
    </div>
</template>
<script>
import card from "components/card/card.vue"
import loading from 'components/loading/loading.vue'

export default {
    data() {
        return {
            blogList: [],
            showLoading:false,
        };
    },
    components: {
        "card": card,
        "loading":loading
    },
    created: function() {
        var that = this;
        that.showLoading = true;
        this.$axios({
                url: '/api/blogList',
                method: 'get'
            })
            .then((response) => {
                that.showLoading = false;
                response.data.forEach(function(item) {
                    if (!item.id || !item.title || !item.summary) {
                        console.log("获取blogList时数据有误:" + item.id);
                    }
                    that.blogList.push(item);
                });
            })
            .catch((error) => {
                that.showLoading = false;
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