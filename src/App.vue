<template>
    <v-app id="app" v-resize="onResize" v-scroll="onScroll">
        <header>
            <my-nav></my-nav>
        </header>
        <div class="bg" :class="{showBg:isShowBg , mobileBgOffset:isMobile}" :style="bgStyleObj"></div>
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
import nav from 'components/nav/nav.vue'
import top from 'components/backToTop/backToTop.vue'
import Fingerprint2 from 'fingerprintjs2'

export default {
    data() {
        return {
            isShowBg: false,
            sharedState: this.$store.state,
        };
    },
    created() {
        this.loadBg();
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
        myMainStyleObj() {
            return {
                "min-height": this.windowSize.y + "px",
                "margin-top": "30px",
            };
        },
        leftContentLayoutObj() {
            return [
                'xs' + this.layoutRatio.xs[1], 'offset-xs' + this.layoutRatio.xs[0],
                'sm' + this.layoutRatio.sm[1], 'offset-sm' + this.layoutRatio.sm[0],
                'md' + this.layoutRatio.md[1], 'offset-md' + this.layoutRatio.md[0],
                'lg' + this.layoutRatio.lg[1], 'offset-lg' + this.layoutRatio.lg[0],
                'xl' + this.layoutRatio.xl[1], 'offset-xl' + this.layoutRatio.xl[0]
            ];
        },
        rightContentLayoutObj() {
            return [
                'xs' + this.layoutRatio.xs[2],
                'sm' + this.layoutRatio.sm[2],
                'md' + this.layoutRatio.md[2],
                'lg' + this.layoutRatio.lg[2],
                'xl' + this.layoutRatio.xl[2]
            ];
        },
        footerContentLayoutObj() {
            return [
                'xs' + (this.layoutRatio.xs[1] + this.layoutRatio.xs[2]), 'offset-xs' + this.layoutRatio.xs[0],
                'sm' + (this.layoutRatio.sm[1] + this.layoutRatio.sm[2]), 'offset-sm' + this.layoutRatio.sm[0],
                'md' + (this.layoutRatio.md[1] + this.layoutRatio.md[2]), 'offset-md' + this.layoutRatio.md[0],
                'lg' + (this.layoutRatio.lg[1] + this.layoutRatio.lg[2]), 'offset-lg' + this.layoutRatio.lg[0],
                'xl' + (this.layoutRatio.xl[1] + this.layoutRatio.xl[2]), 'offset-xl' + this.layoutRatio.xl[0]
            ];
        },
        bgStyleObj() {
            let mt = 0;
            if (!this.isMobile) {
                mt = 48;
            }
            return {
                height: this.windowSize.y * 0.5 + "px",
                'margin-top': mt + 'px',
            };
        },
    },
    methods: {
        loadBg() {
            let that = this;
            var headbg = new Image();
            headbg.src = require('assets/img/headbg.png');
            if (headbg.complete) {
                that.isShowBg = true;
            } else {
                headbg.onload = function() {
                    that.isShowBg = true;
                };
            }
        },
        getFinger() {
            let that = this;
            //获取浏览器指纹
            Fingerprint2().get((result) => {
                that.$axios({
                        url: '/api/users/' + result,
                        method: 'get'
                    })
                    .then((response) => {
                        that.$store.setUser(response.data);
                    })
                    .catch((error) => {
                        console.log("get user error:" + error);
                    });
            });
        },
        onResize() {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                this.$store.setWindowSize({ x: document.documentElement.clientWidth, y: document.documentElement.clientHeight });
            } else {
                this.$store.setWindowSize({ x: window.innerWidth, y: window.innerHeight });
            }
            this.$store.setIsMobile(this.windowSize.x < 960);
        },
        onScroll() {
            this.$store.setScrollTop(window.pageYOffset || document.documentElement.scrollTop || document.body.scrolltop);
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
    },
}
</script>
<style scoped>
#app {
    background: none;
}

.bg {
    /*position: fixed;*/
    /*height: 1057px;*/
    width: 100%;
    /*top: 60px;*/
    z-index: -1;
    background-size: cover;
    background-position: center 0;
    /*background-color: white;*/
    background-repeat: no-repeat;
    -webkit-mask-image: url('assets/img/circlemask.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
}

.showBg {
    background-image: url('assets/img/headbg.png');
    -webkit-animation: circle_zoom 1s ease-in;
}

.mobileBgOffset {
    background-position: 40% 0;
}

@keyframes circle_zoom {
    0% {
        opacity: 0;
        -webkit-mask-size: 0%
    }

    20% {
        opacity: .3;
        -webkit-mask-size: 50%
    }

    80% {
        opacity: .7;
        -webkit-mask-size: 250%
    }

    to {
        opacity: 1;
        -webkit-mask-size: 300%
    }
}

.myFooter {
    width: 100%;
    background-color: #232323;
    min-height: 60px !important;
    height: auto !important;
    color: #888;
}
</style>