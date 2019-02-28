<template>
    <div>
        <v-card>
            <v-card-title class="headline font-weight-Medium">
                发表{{blogID === "-1" ? '留言':'评论'}}
            </v-card-title>
            <v-card-text>
                <comment-form :blogID="blogID" :parentID="'-1'" v-on:submit_on_success="commentFormSubmitOnSuccess"></comment-form>
            </v-card-text>
            <v-card-text v-if="commentsTree.length > 0">
                <ul class="pa-0 ma-0">
                    <li v-for="(comments,parentIndex) in commentsTree" :key="comments[0].id" class="ma-0" style="list-style-type:none;">
                        <v-divider v-if="parentIndex!==0">
                        </v-divider>
                        <div style="display: flex;" class="commentItem py-3" :id="'comment'+comments[0].id">
                            <div>
                                <v-avatar><img :src="comments[0].user.avatar.small"></v-avatar>
                            </div>
                            <div class="ml-3" style="flex: 1;">
                                <div>
                                    <span class="subheading">{{comments[0].user.userName}}</span>
                                    <span class="grey--text caption"> · {{comments[0].time.Format("yy-MM-dd")}}</span>
                                    <v-btn small flat class="ma-0 pa-0 mr-2 replyBtn" @click="replyBtnOnClick(comments[0].id,comments[0].user.userName)" style="float: right;min-width: 40px;">回复</v-btn>
                                </div>
                                <div class="body-2 mt-2">
                                    <span>{{comments[0].content}}</span>
                                </div>
                            </div>
                        </div>
                        <ul style="padding: 0 0 0 64px;" class="ma-0">
                            <li v-for="(comment,sonIndex) in comments" v-if="sonIndex!==0" :key="comment.id" class="ma-0" style="list-style-type:none;">
                                <v-divider>
                                </v-divider>
                                <div style="display: flex;" class="commentItem py-3" :id="'comment'+comment.id">
                                    <div>
                                        <v-avatar><img :src="comment.user.avatar.small"></v-avatar>
                                    </div>
                                    <div class="ml-3" style="flex: 1;">
                                        <div>
                                            <span class="subheading">{{comment.user.userName}}</span>
                                            <span class="grey--text caption"> · {{comment.time.Format("yy-MM-dd")}}</span>
                                            <v-btn small flat class="ma-0 pa-0 mr-2 replyBtn" @click="replyBtnOnClick(comment.id,comment.user.userName)" style="float: right;min-width: 40px;">回复</v-btn>
                                        </div>
                                        <div class="body-2 mt-2">
                                            <a href="javascript:void(0)" @click="goAnchor('#comment'+comment.parentID)" style="color: #ff4081;">@{{idToCommentDir.get(comment.parentID).user.userName}}:</a>&nbsp;
                                            <span>{{comment.content}}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </v-card-text>
            <v-card-text v-else-if="showLoading">
                <loading :showLoading="showLoading"></loading>
            </v-card-text>
            <v-card-text v-else class="text-xs-center">
                暂时还没有评论,快来抢沙发吧!
            </v-card-text>
            <v-card-text class="text-xs-center" v-if="pageLength>1">
                <v-pagination v-model="page" :length="pageLength"></v-pagination>
            </v-card-text>
        </v-card>
        <v-dialog v-model="commentFormDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">回复 {{replyUserName}}</span>
                </v-card-title>
                <v-card-text>
                    <comment-form :blogID="blogID" :parentID="replyID" v-on:submit_on_success="commentFormSubmitOnSuccess"></comment-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import CommentForm from "components/CommentForm/CommentForm.vue";
import loading from 'components/loading/loading.vue';

export default {
    data() {
        return {
            showLoading: false,
            commentFormDialog: false,
            replyID: null,
            replyUserName: "",
            page: 1,
            limt: 5,
            idToCommentDir: new Map(),
            commentsPageMap: new Map(),
            commentsPageMapChangeTracker: 0,
            rootCommentTotalCount:0,
        };
    },

    props: {
        blogID: String,
    },

    created() {
        this.loadComment();
    },

    computed: {
        commentsTree(){
            let x= this.commentsPageMapChangeTracker;
            x = 0;
            return this.commentsPageMap.get(this.page + x) || [];
        },
        pageLength(){
            return Math.ceil(this.rootCommentTotalCount / this.limt);
        },
    },
    watch: {
        page: function () {
            this.loadComment();
        },
    },
    methods: {
        async loadComment() {
            if(this.commentsPageMap.has(this.page)) return;
            try{
                this.showLoading = true;
                let resule = await this.$api.getComment(this.blogID, this.limt, this.page);
                this.rootCommentTotalCount = resule.rootTotalCount;
                let comments = resule.comments;
                this.sortedComments(comments);
                for (let i = 0; i < comments.length; i++) {
                    this.idToCommentDir.set(comments[i].id, comments[i]);
                }
                this.commentsPageMap.set(this.page, this.getCommentsTree(comments));
                this.commentsPageMapChangeTracker += 1;
            }
            catch(error){
                console.error(error);
            }
            finally{
                this.showLoading = false;
            }
        },
        //按照时间对comments进行排序
        sortedComments(comments) {
            comments.forEach((item) => {
                item.time = new Date(item.time);
            });
            comments.sort((a, b) => {
                return a.time - b.time;
            });
        },
        getRootCommentID(comment) {
            if (comment.parentID == "-1") {
                return comment.id;
            }
            else{
                return this.getRootCommentID(this.idToCommentDir.get(comment.parentID));
            }
        },
        //得到一个二维数组,该数组的元素为一个comment[]的数组,该comment[]代表一个评论树,第一个元素为根节点,后续元素则按时间已排好序
        getCommentsTree(comments) {
            let map = new Map();
            comments.forEach((item) => {
                let rootID = this.getRootCommentID(item);
                if (!map.has(rootID)) {
                    map.set(rootID, []);
                }
                if (item.parentID == "-1") {
                    map.get(rootID).unshift(item);
                }
                else {
                    map.get(rootID).push(item);
                }
            });
            let ret = [];
            map.forEach((value) => {
                ret.push(value);
            });
            return ret;
        },
        replyBtnOnClick(replyID, replyUserName) {
            this.commentFormDialog = true;
            this.replyID = replyID.toString();
            this.replyUserName = replyUserName;
        },
        commentFormSubmitOnSuccess(data){
            this.commentFormDialog = false;
            data.time = new Date(data.time);
            this.idToCommentDir.set(data.id, data);
            if(data.parentID !== -1){
                let rootID = this.getRootCommentID(data);
                for(let comments of this.commentsTree){
                    if(rootID === comments[0].id){
                        comments.push(data);
                        this.commentsPageMapChangeTracker += 1;
                        return;
                    }
                }
            }
            else{
                this.rootCommentTotalCount++;
                if(this.commentsTree.length < this.limt){
                    let arr = [];
                    arr.push(data);
                    this.commentsTree.push(arr);
                    this.commentsPageMapChangeTracker += 1;
                }
                else{
                    this.page = this.pageLength;
                }
            }
        },
        goAnchor(selector) {
            this.$vuetify.goTo(selector, { offset: -200, });
            let el = this.$el.querySelector(selector);
            let colorFlag = false;
            let intervalID = setInterval(() => {
                if (!colorFlag) {
                    el.style.backgroundColor = "rgba(50, 50, 50, .1)";
                }
                else {
                    el.style.backgroundColor = "rgba(255, 255, 255, 1)";
                }
                colorFlag = !colorFlag;
            }, 500);
            setTimeout(() => {
                el.style.backgroundColor = "";
                clearInterval(intervalID);
            }, 2000);
        },
    },

    components: {
        "comment-form": CommentForm,
        "loading": loading,
    },
};
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