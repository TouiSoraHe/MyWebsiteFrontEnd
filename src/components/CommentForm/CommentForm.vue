<template>
    <form class="ma-0">
        <v-text-field v-validate="'required|max:10'" v-model="replyComment.user.userName" :counter="10" :error-messages="errors.collect('name')" label="昵称" data-vv-name="name" required name="name"></v-text-field>
        <v-text-field v-validate="'email'" v-model="replyComment.user.email" :error-messages="errors.collect('email')" label="邮箱" data-vv-name="email" name="email"></v-text-field>
        <v-textarea v-validate="'required|max:150'" v-model="replyComment.content"  :counter="150" :error-messages="errors.collect('comment')" label="内容" data-vv-name="comment" required name="comment"  auto-grow background-color="#fff" :rows="2"></v-textarea>
        <v-layout>
            <v-spacer></v-spacer>
            <v-btn @click="submit">提交</v-btn>
        </v-layout>
    </form>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
    $veeValidate: {
        validator: 'new',
    },

    data(){
        return {
            dictionary: {
                attributes: {
                    name: 'name',
                    email: 'email',
                    comment:'comment',
                },
                custom: {
                    name: {
                        required:'昵称不能为空',
                        max: '昵称不能超过10个字符',
                    },
                    email: {
                        email: '邮箱地址不正确',
                    },
                    comment:{
                        required:"内容不能为空",
                        max: '内容不能超过150个字符',
                    },
                },
            },
            sharedState: this.$store.state,
        };
    },

    props:{
        blogID:String,
        parentID:String,
    },

    computed:{
        replyComment() {
            return {
                content: '',
                parentID: this.parentID,
                time: null,
                blogID: this.blogID,
                user: this.$store.getUser(),
            };
        },
    },

    mounted() {
        this.$validator.localize('zh-CN', this.dictionary);
    },

    methods: {
        submit() {
            this.$validator.validateAll();
            console.log(this.replyComment);
        },
    },
};
</script>

<style scoped>
    
</style>