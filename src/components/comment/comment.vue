<template>
    <div>
        <v-card>
            <v-card-title class="headline font-weight-Medium">
                发表评论
            </v-card-title>
            <v-card-text>
                <comment-form :blogID="blogID"></comment-form>
            </v-card-text>
            <v-card-text v-if="commentsTreePagination.length>0">
                <ul class="pa-0 ma-0">
                    <li v-for="(comments,parentIndex) in commentsTreePagination" :key="comments[0].id" class="ma-0" style="list-style-type:none;">
                        <v-divider v-if="parentIndex!==0">
                        </v-divider>
                        <div style="display: flex;" class="commentItem py-3" :id="'comment'+comments[0].id">
                            <div>
                                <v-avatar><img :src="comments[0].user.avatar"></v-avatar>
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
                                        <v-avatar><img :src="comment.user.avatar"></v-avatar>
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
            <v-card-text v-else class="text-xs-center">
                暂时还没有评论,快来抢沙发吧!
            </v-card-text>
            <v-card-text class="text-xs-center" v-if="pageLength>1">
                <v-pagination
                  v-model="page"
                  :length="pageLength"
                  @input="paginationInput"
                ></v-pagination>
            </v-card-text>
        </v-card>
        <v-dialog v-model="commentFormDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">回复 {{replyUserName}}</span>
                </v-card-title>
                <v-card-text>
                    <comment-form :blogID="blogID" :parentID="replyID"></comment-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import CommentForm from "components/CommentForm/CommentForm.vue";

export default {
    data() {
        return {
            commentFormDialog: false,
            replyID: null,
            replyUserName: "",
            page:1,
            pageCount:5,
        };
    },

    props: {
        comments: Array,
        blogID: String,
    },

    computed: {
        //按时间升序排序后的评论列表
        sortedComments() {
            let ret = this.comments || [];
            ret = ret.slice();
            ret.forEach((item) => {
                item.time = new Date(item.time);
            });
            ret.sort((a, b) => {
                return a.time - b.time;
            });
            return ret;
        },
        //map,id为键,评论为值
        idToCommentDir() {
            let ret = new Map();
            let comments = this.sortedComments;
            comments.forEach((item) => {
                ret.set(item.id, item);
            });
            return ret;
        },
        commentsTree() {
            let that = this;
            let comments = this.sortedComments;
            //用于得到一条评论的根评论ID
            function getRootCommentID(comment) {
                if (comment.parentID === null) {
                    return comment.id;
                }
                else
                    return getRootCommentID(that.idToCommentDir.get(comment.parentID));
            }
            let map = new Map();
            comments.forEach((item) => {
                let rootID = getRootCommentID(item);
                if (!map.has(rootID)) {
                    map.set(rootID, []);
                }
                if (item.parentID === null) {
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
        commentsTreePagination(){
            return this.commentsTree.slice((this.page-1)*this.pageCount,(this.page-1)*this.pageCount+this.pageCount);
        },
        pageLength(){
            return Math.ceil(this.commentsTree.length/this.pageCount);
        },
    },

    methods: {
        replyBtnOnClick(replyID, replyUserName) {
            this.commentFormDialog = true;
            this.replyID = replyID;
            this.replyUserName = replyUserName;
        },
        goAnchor(selector) {
            this.$vuetify.goTo(selector,{offset:-200,});
            let el = this.$el.querySelector(selector);
            let colorFlag = false;
            let intervalID = setInterval(()=>{
                if (!colorFlag){
                    el.style.backgroundColor="rgba(50, 50, 50, .1)";
                }
                else{
                    el.style.backgroundColor="rgba(255, 255, 255, 1)";
                }
                colorFlag = !colorFlag;
            },500);
            setTimeout(()=>{
                el.style.backgroundColor="";
                clearInterval(intervalID);
            },2000);
        },
        paginationInput(){
            console.log(this.commentsTreePagination);
        },
    },

    components: {
        "comment-form": CommentForm,
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