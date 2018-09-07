<template>
    <div class="card">
        <div class="title">
            <h4>
                <slot name="title"></slot>
            </h4>
        </div>
        <div class="time">
            <p>
                <slot name="time"></slot>
            </p>
        </div>
        <hr>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
.card {
    box-sizing: border-box;
    width: 98%;
    font-size:98%;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0.1px 0.1px 2px #aaa;
    padding: 20px;
    margin: 15px auto;
    transition: all 0.1s linear;
}

.card:hover {
    cursor: pointer;
    width: 100%;
    font-size:100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 2px 6px #aaa;
    border-radius: 5px;
    transition: all 0.2s linear;
}

.title {
    text-align: center;
}

.time {
    font-size: 95%;
    text-align: center;
}
</style>