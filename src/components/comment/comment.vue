<template>
  <div>
    <v-card>
      <v-card-title class="headline font-weight-Medium">
        发表{{ blogid === "-1" ? '留言':'评论' }}
      </v-card-title>
      <v-card-text>
        <comment-form :blogid="blogid" :parent-i-d="'-1'" @submit_on_success="commentFormSubmitOnSuccess"></comment-form>
      </v-card-text>
      <v-card-text v-if="commentsTree.length > 0">
        <ul class="pa-0 ma-0">
          <li v-for="(comments,parentIndex) in commentsTree" :key="comments[0].id" class="ma-0" style="list-style-type:none;">
            <v-divider v-if="parentIndex!==0">
            </v-divider>
            <div :id="'comment'+comments[0].id" style="display: flex;" class="commentItem py-3">
              <div>
                <v-avatar><img :src="getAvatar(comments[0])"></v-avatar>
              </div>
              <div class="ml-3" style="flex: 1;">
                <div>
                  <span class="subheading">{{ comments[0].user.userName }}</span>
                  <span class="grey--text caption"> · {{ $utils.FormatTime(comments[0].time,"yy-MM-dd") }}</span>
                  <v-btn small flat class="ma-0 pa-0 mr-2 replyBtn" style="float: right;min-width: 40px;" @click="replyBtnOnClick(comments[0].id,comments[0].user.userName)">
                    回复
                  </v-btn>
                </div>
                <div class="body-2 mt-2">
                  <span>{{ comments[0].content }}</span>
                </div>
              </div>
            </div>
            <ul style="padding: 0 0 0 64px;" class="ma-0">
              <template v-for="(comment,sonIndex) in comments">
                <li v-if="sonIndex!==0" :key="comment.id" class="ma-0" style="list-style-type:none;">
                  <v-divider>
                  </v-divider>
                  <div :id="'comment'+comment.id" style="display: flex;" class="commentItem py-3">
                    <div>
                      <v-avatar><img :src="getAvatar(comment)"></v-avatar>
                    </div>
                    <div class="ml-3" style="flex: 1;">
                      <div>
                        <span class="subheading">{{ comment.user.userName }}</span>
                        <span class="grey--text caption"> · {{ $utils.FormatTime(comment.time,"yy-MM-dd") }}</span>
                        <v-btn small flat class="ma-0 pa-0 mr-2 replyBtn" style="float: right;min-width: 40px;" @click="replyBtnOnClick(comment.id,comment.user.userName)">
                          回复
                        </v-btn>
                      </div>
                      <div class="body-2 mt-2">
                        <a href="javascript:void(0)" style="color: #ff4081;" @click="goAnchor('#comment'+comment.parentID)">@{{ idToCommentDir.get(comment.parentID).user.userName }}:</a>&nbsp;
                        <span>{{ comment.content }}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </v-card-text>
      <v-card-text v-else-if="showLoading">
        <loading :show-loading="showLoading"></loading>
      </v-card-text>
      <v-card-text v-else class="text-xs-center">
        暂时还没有评论,快来抢沙发吧!
      </v-card-text>
      <v-card-text v-if="pageLength>1" class="text-xs-center">
        <v-pagination v-model="page" :length="pageLength"></v-pagination>
      </v-card-text>
    </v-card>
    <v-dialog v-model="commentFormDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">回复 {{ replyUserName }}</span>
        </v-card-title>
        <v-card-text>
          <comment-form :blogid="blogid" :parent-i-d="replyID" @submit_on_success="commentFormSubmitOnSuccess"></comment-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CommentForm from 'components/CommentForm/CommentForm.vue'
import loading from 'components/loading/loading.vue'

export default {

  components: {
    'comment-form': CommentForm,
    'loading': loading
  },

  props: {
    blogid: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      showLoading: false,
      commentFormDialog: false,
      replyID: null,
      replyUserName: '',
      page: 1,
      limt: 5,
      idToCommentDir: new Map(),
      commentsPageMap: new Map(),
      commentsPageMapChangeTracker: 0,
      rootCommentTotalCount: 0
    }
  },

  computed: {
    commentsTree() {
      let x = this.commentsPageMapChangeTracker
      x = 0
      return this.commentsPageMap.get(this.page + x) || []
    },
    pageLength() {
      return Math.ceil(this.rootCommentTotalCount / this.limt)
    }
  },
  watch: {
    page: function() {
      this.loadComment()
    }
  },

  created() {
    this.loadComment()
  },
  methods: {
    async loadComment() {
      if (this.commentsPageMap.has(this.page)) return
      try {
        this.showLoading = true
        const resule = await this.$api.getComment(this.blogid, this.limt, this.page)
        this.rootCommentTotalCount = resule.rootTotalCount
        const comments = resule.comments
        this.sortedComments(comments)
        for (let i = 0; i < comments.length; i++) {
          this.idToCommentDir.set(comments[i].id, comments[i])
        }
        this.commentsPageMap.set(this.page, this.getCommentsTree(comments))
        this.commentsPageMapChangeTracker += 1
      } catch (error) {
        console.error(error)
      } finally {
        this.showLoading = false
      }
    },
    // 按照时间对comments进行排序
    sortedComments(comments) {
      comments.forEach((item) => {
        item.time = new Date(item.time)
      })
      comments.sort((a, b) => {
        return a.time - b.time
      })
    },
    getRootCommentID(comment) {
      if (comment.parentID.toString() === '-1') {
        return comment.id
      } else {
        return this.getRootCommentID(this.idToCommentDir.get(comment.parentID))
      }
    },
    // 得到一个二维数组,该数组的元素为一个comment[]的数组,该comment[]代表一个评论树,第一个元素为根节点,后续元素则按时间已排好序
    getCommentsTree(comments) {
      const map = new Map()
      comments.forEach((item) => {
        const rootID = this.getRootCommentID(item)
        if (!map.has(rootID)) {
          map.set(rootID, [])
        }
        if (item.parentID.toString() === '-1') {
          map.get(rootID).unshift(item)
        } else {
          map.get(rootID).push(item)
        }
      })
      const ret = []
      map.forEach((value) => {
        ret.push(value)
      })
      return ret
    },
    replyBtnOnClick(replyID, replyUserName) {
      this.commentFormDialog = true
      this.replyID = replyID.toString()
      this.replyUserName = replyUserName
    },
    commentFormSubmitOnSuccess(data) {
      this.commentFormDialog = false
      data.time = new Date(data.time)
      this.idToCommentDir.set(data.id, data)
      if (data.parentID !== -1) {
        const rootID = this.getRootCommentID(data)
        for (const comments of this.commentsTree) {
          if (rootID === comments[0].id) {
            comments.push(data)
            this.commentsPageMapChangeTracker += 1
            return
          }
        }
      } else {
        this.rootCommentTotalCount++
        if (this.commentsTree.length < this.limt) {
          const arr = []
          arr.push(data)
          this.commentsTree.push(arr)
          this.commentsPageMapChangeTracker += 1
        } else {
          this.page = this.pageLength
        }
      }
    },
    getAvatar(comment) {
      if (comment && comment.user && comment.user.email) {
        return this.$getGravatar(comment.user.email)
      }
      return comment.user.avatar.small || require('./avatar.png')
    },
    goAnchor(selector) {
      this.$vuetify.goTo(selector, { offset: -200 })
      const el = this.$el.querySelector(selector)
      let colorFlag = false
      const intervalID = setInterval(() => {
        if (!colorFlag) {
          el.style.backgroundColor = 'rgba(50, 50, 50, .1)'
        } else {
          el.style.backgroundColor = 'rgba(255, 255, 255, 1)'
        }
        colorFlag = !colorFlag
      }, 500)
      setTimeout(() => {
        el.style.backgroundColor = ''
        clearInterval(intervalID)
      }, 2000)
    }
  }
}
</script>
<style scoped>
.commentItem {
    background-color: rgba(255, 255, 255, 1);
    transition: all 0.2s;
}

.commentItem:hover {
    background-color: rgba(50, 50, 50, .1);
}

.commentItem .replyBtn {
    opacity: 0;
}

.commentItem:hover .replyBtn {
    opacity: 1;
}
</style>
