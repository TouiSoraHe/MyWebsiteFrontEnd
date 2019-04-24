<template>
  <form class="ma-0">
    <v-text-field v-model="replyComment.user.userName" v-validate="'required|max:10'" :counter="10" :error-messages="errors.collect('name')" label="昵称" data-vv-name="name" required name="name" placeholder="如何称呼您"></v-text-field>
    <v-text-field v-model="replyComment.user.email" v-validate="'email'" :error-messages="errors.collect('email')" label="邮箱" data-vv-name="email" name="email" placeholder="仅用于获取Gravatar头像"></v-text-field>
    <v-textarea
      v-model="replyComment.content"
      v-validate="'required|max:150'"
      :counter="150"
      :error-messages="errors.collect('comment')"
      :rows="2"
      label="内容"
      data-vv-name="comment"
      required
      name="comment"
      auto-grow
      background-color="#fff"
      aria-placeholder="规范文明言行 养成良好习惯"
    ></v-textarea>
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" :disabled="loading" :color="submitColor" @click="submit">
        提交
      </v-btn>
    </v-layout>
  </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

export default {
  $veeValidate: {
    validator: 'new'
  },

  props: {
    blogid: {
      type: String,
      default: undefined
    },
    parentID: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      dictionary: {
        attributes: {
          name: 'name',
          email: 'email',
          comment: 'comment'
        },
        custom: {
          name: {
            required: '昵称不能为空',
            max: '昵称不能超过10个字符'
          },
          email: {
            email: '邮箱地址不正确'
          },
          comment: {
            required: '内容不能为空',
            max: '内容不能超过150个字符'
          }
        }
      },
      loading: false,
      sharedState: this.$store.state,
      submitColor: 'normal'
    }
  },

  computed: {
    replyComment() {
      return {
        content: '',
        parentId: this.parentID,
        time: null,
        blogId: this.blogid,
        user: this.$store.getUser()
      }
    }
  },

  mounted() {
    this.$validator.localize('zh-CN', this.dictionary)
  },

  methods: {
    submit() {
      const that = this
      this.submitColor = 'normal'
      this.$validator.validateAll()
        .then(function(value) {
          if (value === true) {
            that.loading = true
            that.$api.addComment(that.replyComment)
              .then((response) => {
                that.loading = false
                that.$emit('submit_on_success', response.data)
                that.replyComment.content = ''
              })
              .catch((error) => {
                that.loading = false
                console.error(error)
                that.submitColor = 'error'
              })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
