<template>
    <div>
        music
    </div>
</template>

<script>
export default{
    created(){
        this.$store.setHeadBgUrl(this.$store.getConfig().musicHeadBgUrl || this.$store.getConfig().defaultHeadBgUrl);
    },
};
</script>

<style scoped>
</style>