<template>
    <div>
        <v-card>
            <v-card-title class="headline font-weight-Medium">
                发表评论
            </v-card-title>
            <v-card-text>
                <form>
                    <v-text-field v-validate="'required|max:10'" v-model="name" :counter="10" :error-messages="errors.collect('name')" label="昵称" data-vv-name="name" required name="name"></v-text-field>
                    <v-text-field v-validate="'email'" v-model="email" :error-messages="errors.collect('email')" label="邮箱" data-vv-name="email" name="email"></v-text-field>
                    <v-textarea v-validate="'required|max:150'" v-model="comment"  :counter="150" :error-messages="errors.collect('comment')" label="内容" data-vv-name="comment" required name="comment"  auto-grow background-color="#fff" :rows="2"></v-textarea>
                    <v-layout>
                        <v-spacer></v-spacer>
                        <v-btn @click="submit">提交</v-btn>
                    </v-layout>
                </form>
            </v-card-text>
            <v-divider>
            </v-divider>
            <v-card-text class="subheading">
                评论内容
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
    $veeValidate: {
        validator: 'new',
    },

    data: () => ({
        name: '',
        email: '',
        comment:'',
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
                    required:"评论内容不能为空",
                    max: '评论内容不能超过150个字符',
                },
            },
        },
    }),

    mounted() {
        this.$validator.localize('zh-CN', this.dictionary);
    },

    methods: {
        submit() {
            this.$validator.validateAll();
            console.log(123);
        },
    },
};
</script>
<style scoped>
.comment {
    padding: 40px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 1px #bdbdbd;
}
</style>