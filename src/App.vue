<template>
    <div id="app">
        <el-container>
            <el-header>
                <my-nav :contentMaxWidth="contentMaxWidth"></my-nav>
            </el-header>
            <div class="bg" :class="{showBg:isShowBg}"></div>
            <el-main class="myMain" :style="myMainStyleObj">
                <div class="mainContent" :style="mainStyleObj">
                    <div class="mainContentLeft">
                        <transition name="el-zoom-in-center" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                    <div class="mainContentRight">
                        <div style="width: 100%;background-color: #999;">占位</div>
                    </div>
                </div>
            </el-main>
            <my-back-to-top></my-back-to-top>
            <el-footer class="myFooter">
                <div :style="footerStyleObj" class="footerContent">
                    (〃'▽'〃)
                </div>
            </el-footer>
        </el-container>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import nav from 'components/nav/nav.vue'
import top from 'components/backToTop/backToTop.vue'
import Fingerprint2 from 'fingerprintjs2'

export default {
    data() {
        return {
            clientSize: {
                height: 0,
                width: 0,
            },
            contentMaxWidth: "1000px",
            isShowBg: false,
        };
    },
    components: {
        "my-nav": nav,
        "my-back-to-top": top,
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
    created() {
        this.loadBg();
    },
    mounted() {
        var that = this;
        this.$nextTick(() => {
            that.clientSize.height = document.documentElement.clientHeight;
            that.clientSize.width = document.documentElement.clientWidth;
            window.onresize = () => {
                that.clientSize.height = document.documentElement.clientHeight;
                that.clientSize.width = document.documentElement.clientWidth;
            };
            Fingerprint2().get((result) => {
                this.$axios({
                        url: '/api/users/' + result,
                        method: 'get'
                    })
                    .then((response) => {
                        Vue.prototype.$user = response.data;
                    })
                    .catch((error) => {
                        console.log("get user error:" + error);
                    });
            });
        });
    },
    computed: {
        mainStyleObj: function() {
            return {
                "max-width": this.contentMaxWidth,
            };
        },
        footerStyleObj: function() {
            return {
                "max-width": this.contentMaxWidth,
            };
        },
        myMainStyleObj: function() {
            return {
                "min-height": this.clientSize.height + "px"
            };
        },
    }
}
</script>
<style scoped>
.bg {
    position: fixed;
    height: 1057px;
    width: 100%;
    top: 60px;
    z-index: -1;
    background-size: cover;
    background-position: center 0;
    background-repeat: no-repeat;
    -webkit-mask-image: url('assets/img/circlemask.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
}

.showBg {
    background-image: url('assets/img/headbg.png');
    -webkit-animation: circle_zoom 1.2s ease-in;
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

.mainContent {
    margin-left: auto;
    margin-right: auto;
}

.mainContentLeft {
    min-height: inherit;
    float: left;
    width: 75%;
}

.mainContentRight {
    display: inline-block;
    float: right;
    width: 20%;
    margin-left: 5%;
}

.myFooter {
    width: 100%;
    background-color: #232323;
    min-height: 60px !important;
    height: auto !important;
    color: #888;
    display: table;
}

.footerContent {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

@media only screen and (max-width: 1000px) {
    .bg {
        background-position: 40% 0;
    }

    .mainContentLeft {
        width: 100%;
    }

    .myMain {
        padding-right: 0;
        padding-left: 0;
    }
}
</style>