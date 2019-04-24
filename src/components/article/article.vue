<template>
  <div>
    <transition name="slide-x-transition" mode="out-in">
      <v-card v-if="article" class="mb-5">
        <v-card-title>
          <div class="display-1 font-weight-bold">
            {{ article.blogInfo.title }}
          </div>
        </v-card-title>
        <v-card-text>
          <span class="body-1 grey--text"><v-icon size="18px">{{ $vuetify.icons['calendar'] }}</v-icon>{{ articleTime }}</span>&nbsp;&nbsp;
          <span class="body-1 grey--text"><v-icon size="18px">{{ $vuetify.icons['file-word'] }}</v-icon><span>{{ article.blogInfo.words }}</span></span>&nbsp;&nbsp;
          <span class="body-1 grey--text"><v-icon size="18px">{{ $vuetify.icons['eye'] }}</v-icon><span>{{ article.blogInfo.views }}</span></span>
        </v-card-text>
        <v-divider class="my-3"></v-divider>
        <v-card-text class="subheading" style="text-align: justify;">
          <vue-markdown :source="article.content" rel="noreferrer" @rendered="markdownRendered"></vue-markdown>
        </v-card-text>
        <v-divider class="mx-3 my-0"></v-divider>
        <v-card-actions v-if="article.blogInfo.tags && article.blogInfo.tags.length > 0" class="pa-3">
          <my-tag v-for="(tag,index) in article.blogInfo.tags" :key="index" :to="'/archive/'+tag.id" class="mr-2">
            {{ tag.tagName }}
          </my-tag>
        </v-card-actions>
      </v-card>
    </transition>
    <loading :show-loading="showLoading" style="margin-top: 20px"></loading>
    <transition name="slide-x-transition" mode="out-in">
      <my-comment v-if="article" :blogid="article.id.toString()" class="mb-5"></my-comment>
    </transition>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import loading from 'components/loading/loading.vue'
import comment from 'components/comment/comment.vue'
import tag from 'components/tag/tag.vue'

export default {
  components: {
    'vue-markdown': VueMarkdown,
    'loading': loading,
    'my-comment': comment,
    'my-tag': tag
  },
  props: {
    id: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      article: null,
      showLoading: false,
      sharedState: this.$store.state
    }
  },
  computed: {
    articleTime: function() {
      if (!isNaN(Date.parse(this.article.blogInfo.time))) {
        return this.$utils.FormatTime(new Date(this.article.blogInfo.time), 'yyyy-MM-dd')
      }
      return this.article.blogInfo.time
    }
  },
  created: function() {
    this.getBlog()
  },
  methods: {
    markdownRendered: function() {
      this.$nextTick(() => { this.$highlight() })
    },
    async getBlog() {
      try {
        this.showLoading = true
        const response = await this.$api.getBlog(this.id)
        this.article = response.data
        document.title = this.article.blogInfo.title
        if (this.article.blogInfo.bgImg.large !== undefined) {
          this.$store.setHeadBgUrl(this.article.blogInfo.bgImg.large)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.showLoading = false
      }
    }
  }
}
</script>
<style scoped>
</style>
