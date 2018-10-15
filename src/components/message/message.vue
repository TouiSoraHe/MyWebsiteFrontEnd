<template>
    <div>
        <comment blogID="-1"></comment>
    </div>
</template>

<script>
import comment from 'components/comment/comment.vue';

export default{
    created(){
        this.$store.setHeadBgUrl(this.$store.getConfig().messageHeadBgUrl || this.$store.getConfig().defaultHeadBgUrl);
    },
    methods:{

    },
    components:{
        "comment":comment,
    },
};
</script>

<style scoped>
</style>