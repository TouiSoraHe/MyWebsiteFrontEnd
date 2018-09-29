<template>
    <div>
        message
    </div>
</template>

<script>
export default{
    created(){
        this.$store.setHeadBgUrl(this.$store.getConfig().messageHeadBgUrl || this.$store.getConfig().defaultHeadBgUrl);
        this.$store.setHeadBgText(this.$store.getConfig().messageHeadBgText);
    },
};
</script>

<style scoped>
</style>