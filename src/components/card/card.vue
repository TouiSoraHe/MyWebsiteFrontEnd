<template>
    <div class="card">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="time">
            <slot name="time"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.card {
    box-sizing: border-box;
    width: 98%;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0.1px 0.1px 2px #aaa;
    padding: 20px;
    margin: 15px auto;
    transition: all 0.1s linear;
}

.card:hover {
    cursor: pointer;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 2px 6px #aaa;
    border-radius: 5px;
    transition: all 0.2s linear;
}

.card > .title {
    font-size: 1.17em;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
}

.card > .time {
    font-size: 0.75em;
    font-weight: 200;
    text-align: center;
    margin-bottom: 20px;
}
</style>