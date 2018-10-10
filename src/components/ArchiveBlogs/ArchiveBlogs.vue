<template>
    <div>
        <transition name="slide-x-transition" mode="out-in">
            <div v-if="blogInfos.length > 0">
                <card class="card-item" :class="{'card-item-mobile':$store.getIsMobile()}" :article="item" v-for="item in blogInfos" :key="item.id"></card>
            </div>
        </transition>
    </div>
</template>
<script>
import card from "components/card/card.vue";

export default {
    props: {
        id:String,
    },
    data(){
        return {
            blogInfos:[],
            sharedState: this.$store.state,
        };
    },
    created(){
        let that = this;
        this.$api.getTag(
            {
                id:this.id,
            },
            (tagResponse)=>{
                document.title = tagResponse.data.tagName;
                if (tagResponse.data.tagImg !== undefined) {
                    if(that.$store.getIsMobile()){
                        that.$store.setHeadBgUrl(tagResponse.data.tagImg.medium);
                        console.log(tagResponse.data.tagImg.medium);
                    }
                    else{
                        that.$store.setHeadBgUrl(tagResponse.data.tagImg.large);
                    }
                }
                this.$api.getBlogInfosByIDs(
                    {
                        blogInfoIDs:tagResponse.data.blogInfoIDs,
                    },
                    (blogInfosResponse)=>{
                        blogInfosResponse.data.forEach(function(item) {
                            if (!item.id || !item.title || !item.summary) {
                                console.log("获取blogInfo时数据有误:" + item.id);
                            }
                            that.blogInfos.push(item);
                        });
                    });
            });
    },
    components: {
        "card": card,
    },
};
</script>
<style scoped>
.card-item {
    margin-bottom: 25px;
}

.card-item-mobile{
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 25px;
}
</style>