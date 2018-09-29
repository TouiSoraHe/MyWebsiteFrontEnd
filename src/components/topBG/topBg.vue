<template>
    <div class="bg" :class="{showBg1:isShowBg && switchBg,showBg2:isShowBg && !switchBg}" :style="[bgStyleObj,showBgStyleObj]">
        <div class="vertical-middle" style="height: 100%;width: 100%">
            <div class="text-center">
                <div class="display-2 white--text">helloworld</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShowBg: false,
            switchBg : false,
            sharedState: this.$store.state,
            bgUrl : "",
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
        closeBg(){
            this.bgUrl = "";
            this.isShowBg = false;
        },
        openBg(){
            this.bgUrl = this.headBgUrl;
            this.isShowBg = false;
            this.switchBg = !this.switchBg;
        },
    },
    computed:{
        isMobile(){
            return this.$store.getIsMobile();
        },
        windowSize(){
            return this.$store.getWindowSize();
        },
        headBgUrl(){
            return this.$store.getHeadBgUrl();
        },
        bgStyleObj() {
            let styleObj = {
                height: this.windowSize.y * 0.6 + "px",
            };
            if (!this.isMobile) {
                styleObj['margin-top'] = '48px';
            }
            return styleObj;
        },
        showBgStyleObj(){
            let styleObj = {};
            styleObj['background-image'] = 'url('+this.bgUrl+')';
            return styleObj;
        },
    },
    watch:{
        headBgUrl:function(){
            if(this.headBgUrl === "" || this.headBgUrl === undefined || this.headBgUrl === null){
                this.closeBg();
            }
            else{
                this.loadBg();
            }
        },
    },
};
</script>
<style scoped>
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
    -webkit-mask-image: url('circlemask.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
    background-color: rgba(255,255,255,1);
}

.showBg1 {
    background-color: rgba(255,255,255,0);
    -webkit-animation: circle_zoom1 1s ease-in-out;
}

.showBg2 {
    background-color: rgba(255,255,255,0);
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
</style>