<template>
    <div class="test">
        Archive
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.test {
    position: relative;
}

.test:after {
    content: "";
    position: absolute;
    background-color: #999;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
}
</style>