<template>
    <transition name='scale-transition'>
        <v-btn fab fixed right bottom v-scroll="onScroll" v-show="show" @click="$vuetify.goTo(0)">
            <v-icon large>arrow_upward</v-icon>
        </v-btn>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            scrollTop: 0,
        };
    },
    methods: {
        onScroll: function() {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrolltop;
            if (this.scrollTop > 800) {
                this.show = true;
            } else {
                this.show = false;
            }
        },
    },
}
</script>
<style scoped>
</style>