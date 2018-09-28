<template>
    <transition name='scale-transition'>
        <v-btn fab fixed right bottom v-show="show" @click="$vuetify.goTo(0)">
            <v-icon large>arrow_upward</v-icon>
        </v-btn>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            sharedState:this.$store.state,
        };
    },
    computed:{
        show(){
            return this.$store.getScrollTop() > 500;
        },
    },
}
</script>
<style scoped>
</style>