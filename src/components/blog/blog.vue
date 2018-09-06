<template>
    <div class="blog">
        <div>
            <router-link :to="'/blog/'+item.id" v-for="item in blogList" :key="item.id">
                <card>
                    <div slot="title">{{item.title}}</div>
                    <div slot="time">{{item.time}}</div>
                    <div slot="content">{{item.summary}}</div>
                </card>
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
        };
    },
    components: {
        "card": card
    },
    created: function() {
        var that = this;
        this.$axios
            .get('/api/blogList')
            .then(function(response) {
                response.data.forEach(function(item) {
                    that.blogList.push(item);
                });
            });
    },
}
</script>
<style scoped>
</style>