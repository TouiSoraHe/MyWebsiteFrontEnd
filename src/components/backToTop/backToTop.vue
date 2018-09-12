<template>
    <div class="my-go-top" v-show="show" @click="topOnClick">
        <i class="my-icon-fanhuidingbu"></i>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
        };
    },
    methods: {
        topOnClick: function() {
            (function smoothscroll() {
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, currentScroll - (currentScroll / 5));
                }
            })();
        },
    },
    created() {
        let that = this;
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 1000) {
                that.show = true;
            } else {
                that.show = false;
            }
        };
    },
}
</script>
<style scoped>
.my-go-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    cursor: pointer;
    width:50px;
    height: 50px;
    text-align: center;
    display: table;
    background-color: rgba(70,70,70,.2);
    color: #f7f7f7;
    transition: all 0.1s linear;
}

.my-icon-fanhuidingbu{
    font-size: 30px;
    line-height: 30px;
    display: table-cell;
    vertical-align: middle;
}

.my-go-top:hover {
    background-color: rgba(70,70,70,.6);
}
</style>