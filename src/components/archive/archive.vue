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
        this.$store.setHeadBgText(this.$store.getConfig().archiveHeadBgText);
    },
};
</script>
<style scoped>
</style>