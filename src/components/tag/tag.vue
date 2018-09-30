<template>
    <router-link class="tag" :to="to">
        <slot></slot>
    </router-link>
</template>
<script>
export default {
    props:{
        to:{
            type:String,
            default:"/archive",
        },
    },
};
</script>
<style scoped>
.tag {
    position: relative;
    display: inline-block;
    max-width: 100%;
    height: 24px;
    line-height: 24px;
    padding: 0 8px 0 18px;
    border-radius: 0 4px 4px 0;
    background: #ddd;
    font-size: 12px;
    color: #333;
    overflow: hidden;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

.tag:hover{
    cursor: pointer;
    background: #333;
    color: #ddd;
}

.tag:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-width: 12px 12px 12px 0;
    border-color: #fff transparent;
    border-style: solid;
}

.tag:after {
    position: absolute;
    content: "";
    width: 4px;
    height: 4px;
    top: 10px;
    left: 8px;
    border-radius: 100%;
    background: #fff;
}
</style>