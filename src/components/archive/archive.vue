<template>
    <div>
        <div>
            <v-hover v-for="item in tags" :key="item.id">
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 0}`" width="150px" height="150px" style="float: left;" :to="'/archive/'+item.id" class="ma-3">
                    <v-img class="white--text" :src="item.tagImg.small" style="height: 100%;width:100%;">
                        <v-container fill-height fluid ma-0 pa-0>
                            <v-layout ma-0 pa-0 fill-height>
                                <v-flex xs12 flexbox class="white--text text-center vertical-middle" fill-height style="background: rgba(0,0,0,.3);margin-top: auto;margin-bottom: auto;">
                                    <div>
                                        <div class="headline">{{item.tagName}}</div>
                                        <v-divider color="#fff" class="my-1"></v-divider>
                                        <div class="caption">共{{item.blogInfoIDs.length}}篇</div>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                </v-card>
            </v-hover>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            alert: true,
            tags: [],
        };
    },
    created() {
        this.$store.setHeadBgUrl(this.$store.getConfig().archiveHeadBgUrl || this.$store.getConfig().defaultHeadBgUrl);
        this.getTags();
    },
    methods:{
        async getTags(){
            try{
                let response = await this.$api.getTags();
                this.tags = response.data;
            }
            catch(error){
                console.error(error);
            }
        },
    },
};
</script>
<style scoped>
</style>