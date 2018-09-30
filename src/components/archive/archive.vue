<template>
  <div>
    archive
  </div>
</template>
<script>
export default {
    data () {
        return {
            alert: true,
        };
    },
    created(){
        this.$store.setHeadBgUrl(this.$store.getConfig().archiveHeadBgUrl || this.$store.getConfig().defaultHeadBgUrl);
    },
};
</script>
<style scoped>
</style>