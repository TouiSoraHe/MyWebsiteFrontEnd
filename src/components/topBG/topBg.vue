<template>
    <div class="bg" :class="{showBg1:switchBg && isShowBg,showBg2:!switchBg && isShowBg}" :style="[bgStyleObj]">
        <div class="vertical-middle" style="height: 100%;width: 100%">
            <div class="text-center">
                <div class="display-2 white--text headBgText">{{headBgText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShowBg: false,
            switchBg: false,
            sharedState: this.$store.state,
            bgUrl: "",
        };
    },
    created() {
        this.loadBg();
    },
    methods: {
        loadBg() {
            let that = this;
            that.closeBg();
            var headbg = new Image();
            headbg.src = that.headBgUrl;
            if (headbg.complete) {
                that.openBg();
            }
            else {
                headbg.onload = function() {
                    that.openBg();
                };
            }
        },
        closeBg() {
            this.bgUrl = "";
            this.isShowBg = false;
        },
        openBg() {
            this.isShowBg = true;
            this.switchBg = !this.switchBg;
            this.bgUrl = this.headBgUrl;
        },
    },
    computed: {
        isMobile() {
            return this.$store.getIsMobile();
        },
        windowSize() {
            return this.$store.getWindowSize();
        },
        headBgUrl() {
            return this.$store.getHeadBgUrl();
        },
        headBgText() {
            return this.$store.getHeadBgText();
        },
        bgStyleObj() {
            let styleObj = {
                height: this.windowSize.y * 0.6 + "px",
            };
            styleObj['background-image'] = 'url(' + this.bgUrl + ')';
            return styleObj;
        },
    },
    watch: {
        headBgUrl: function() {
            if (this.headBgUrl === "" || this.headBgUrl === undefined || this.headBgUrl === null) {
                this.closeBg();
            }
            else {
                this.loadBg();
            }
        },
    },
};
</script>
<style scoped>
.bg {
    width: 100%;
    z-index: -1;
    background-size: cover;
    background-position: center 0;
    background-repeat: no-repeat;
    -webkit-mask-image: url('circlemask.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
    background-color: rgba(255, 255, 255, 1);
}

.showBg1 {
    background-color: rgba(255, 255, 255, 0);
    -webkit-animation: circle_zoom1 1s ease-in-out;
}

.showBg2 {
    background-color: rgba(255, 255, 255, 0);
    -webkit-animation: circle_zoom2 1s ease-in-out;
}

@keyframes circle_zoom1 {
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

@keyframes circle_zoom2 {
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

.headBgText {
    width: 60%;
    background: #fc5e5e;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    background-color: rgba(50,50,50,0.3);
}

.headBgText:before {
    content: "";
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    border-left: 3px solid rgba(255,255,255,0.8);
    border-top: 3px solid transparent;
    border-right: 3px transparent;
    border-bottom: 3px solid rgba(255,255,255,0.8);
}

.headBgText:after {
    content: "";
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0px;
    right: 0px;
    border-right: 3px solid rgba(255,255,255,0.8);
    border-top: 3px solid rgba(255,255,255,0.8);
    border-bottom: 3px solid transparent;
    border-left: 3px solid transparent;
}
</style>