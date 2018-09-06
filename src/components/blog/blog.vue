<template>
    <div class="blog">
        <div>
            <card v-for="item in blogList" :key="item.id">
                <div slot="title">{{item.title}}</div>
                <div slot="time">{{item.time}}</div>
                <div slot="content">{{item.summary}}</div>
            </card>
        </div>
    </div>
</template>
<script>
import card from "components/card/card.vue"

export default {
    data(){
        return {
            blogList:[],
        };
    },
    components: {
        "card": card
    },
    created: function() {
        var that = this;
        this.$axios
            .get('/api/blogList')
            .then(function(response){
                response.data.data.forEach(function(item){
                    that.blogList.push(item);
                });
            });
    },
}
</script>
<style>
</style>