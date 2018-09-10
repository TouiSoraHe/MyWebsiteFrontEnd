<template>
    <div class="card">
        <div class="text-center">
            <h4 class="slot title">
                <slot name="title"></slot>
            </h4>
        </div>
        <div class="text-center">
            <i class="my-icon-calendar time slot">&nbsp;<slot name="time"></slot></i>
        </div>
        <hr>
        <div class="slot content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
.card {
    position: relative;
    padding: 20px;
    width: 100%;
    margin: 15px auto;
    box-sizing: border-box;
    /*    background-color: rgba(0,0,0,0);
    box-shadow: 0 0 2px #aaa;
    z-index: 100;
    transition: all 0.1s linear;*/
}


/*.card:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 2px 3px #999;
    border-radius: 5px;
    transition: all 0.2s linear;
}*/

.card:before {
    content: "";
    position: absolute;
    background-color: #999;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
}

.text-center {
    text-align: center;
}

.title {
    color: #444;
    font-size: 23px;
}

.time {
    color: #00a7e0;
    font-size: 13px;
}

.content {
    color: #555;
    font-size: 14px;
}
.slot>* {
    display: inline !important;
}
</style>