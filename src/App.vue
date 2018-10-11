<template>
    <v-app id="app" v-resize="onResize" v-scroll="onScroll">
        <header>
            <my-nav></my-nav>
        </header>
        <my-top-bg></my-top-bg>
        <main class="myMain" :style="myMainStyleObj">
            <v-container pa-0 ma-0 fluid>
                <v-layout>
                    <v-flex :class="leftContentLayoutObj">
                        <transition name="slide-x-transition" mode="out-in">
                            <router-view name="left"></router-view>
                        </transition>
                    </v-flex>
                    <v-flex v-if="!this.isMobile" class="text-center" :class="rightContentLayoutObj">
                        <div style="position:sticky;top:78px; margin-left: 30px;">
                            <transition name="slide-x-transition" mode="out-in">
                                <router-view name="right"></router-view>
                            </transition>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <my-back-to-top></my-back-to-top>
        <footer class="myFooter vertical-middle">
            <v-container pa-0 ma-0 fluid>
                <v-layout>
                    <v-flex class="text-center" :class="footerContentLayoutObj">
                        <div>(〃'▽'〃)</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </footer>
    </v-app>
</template>
<script type="text/javascript">
import nav from 'components/nav/nav.vue';
import top from 'components/backToTop/backToTop.vue';
import topBg from 'components/topBG/topBg.vue';
import Fingerprint2 from 'fingerprintjs2';

export default {
    data() {
        return {
            sharedState: this.$store.state,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.getFinger();
        });
    },
    computed: {
        isMobile() {
            return this.$store.getIsMobile();
        },
        windowSize() {
            return this.$store.getWindowSize();
        },
        layoutRatio() {
            return this.$store.getLayoutRatio();
        },
        leftContentLayoutObj() {
            return [
                'xs' + this.layoutRatio.xs[1], 'offset-xs' + this.layoutRatio.xs[0],
                'sm' + this.layoutRatio.sm[1], 'offset-sm' + this.layoutRatio.sm[0],
                'md' + this.layoutRatio.md[1], 'offset-md' + this.layoutRatio.md[0],
                'lg' + this.layoutRatio.lg[1], 'offset-lg' + this.layoutRatio.lg[0],
                'xl' + this.layoutRatio.xl[1], 'offset-xl' + this.layoutRatio.xl[0],
            ];
        },
        rightContentLayoutObj() {
            return [
                'xs' + this.layoutRatio.xs[2],
                'sm' + this.layoutRatio.sm[2],
                'md' + this.layoutRatio.md[2],
                'lg' + this.layoutRatio.lg[2],
                'xl' + this.layoutRatio.xl[2],
            ];
        },
        footerContentLayoutObj() {
            return [
                'xs' + (this.layoutRatio.xs[1] + this.layoutRatio.xs[2]), 'offset-xs' + this.layoutRatio.xs[0],
                'sm' + (this.layoutRatio.sm[1] + this.layoutRatio.sm[2]), 'offset-sm' + this.layoutRatio.sm[0],
                'md' + (this.layoutRatio.md[1] + this.layoutRatio.md[2]), 'offset-md' + this.layoutRatio.md[0],
                'lg' + (this.layoutRatio.lg[1] + this.layoutRatio.lg[2]), 'offset-lg' + this.layoutRatio.lg[0],
                'xl' + (this.layoutRatio.xl[1] + this.layoutRatio.xl[2]), 'offset-xl' + this.layoutRatio.xl[0],
            ];
        },
        myMainStyleObj() {
            let styleObj = {
                "min-height": this.windowSize.y + "px",
            };
            if (!this.isMobile) {
                styleObj['margin-top'] = '30px';
            }
            return styleObj;
        },
    },
    methods: {
        async getFinger() {
            function getFinger() {
                return new Promise((resolve) => {
                    Fingerprint2().get((result) => {resolve(result);});
                });
            }
            try{
                let finger = await getFinger();
                let response = await this.$api.getUser(finger);
                this.$store.setUser(response.data);
            }
            catch(error){
                console.error(error);
            }
        },
        onResize() {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                this.$store.setWindowSize({ x: document.documentElement.clientWidth, y: document.documentElement.clientHeight, });
            }
            else {
                this.$store.setWindowSize({ x: window.innerWidth, y: window.innerHeight, });
            }
            this.$store.setIsMobile(this.windowSize.x < 960);
        },
        onScroll() {
            this.$store.setScrollTop(window.pageYOffset || document.documentElement.scrollTop || document.body.scrolltop || 0);
        },
    },
    beforeCreate() {
        let el = document.getElementById('appLoading');
        if (el !== null) {
            el.className += "disappear";
            setTimeout(() => {
                document.body.removeChild(el);
            }, 300);
        }
    },
    components: {
        "my-nav": nav,
        "my-back-to-top": top,
        "my-top-bg": topBg,
    },
};
</script>
<style scoped>
#app {
    background: none;
}

.myFooter {
    width: 100%;
    background-color: #232323;
    min-height: 60px !important;
    height: auto !important;
    color: #888;
}
</style>