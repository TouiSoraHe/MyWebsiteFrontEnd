<template>
    <div v-if="article">
        <v-hover>
            <v-card slot-scope="{ hover }"  :class="`elevation-${hover ? 12 : 2}`" :to="'/blog/'+article.blogID">
                <v-img class="white--text" height="250px" :src="article.imgUrl">
                    <v-container fill-height fluid ma-0 pa-0>
                        <v-layout ma-0 pa-0>
                            <v-flex xs12 flexbox class="white--text" pa-3 style="background: rgba(0,0,0,.2);margin-top: auto;">
                                <div class="headline">{{article.title}}</div>
                                <v-divider class="my-2" color="#fff"></v-divider>
                                <div class="subheading">
                                    {{article.summary}}
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-img>
                <v-card-text class="grey--text">
                    <span class="body-1"><v-icon size="18px">date_range</v-icon>{{articleTime}}</span>&nbsp;&nbsp;
                    <span class="body-1"><v-icon size="18px">title</v-icon><span>{{article.words}}</span></span>&nbsp;&nbsp;
                    <span class="body-1"><v-icon size="18px">visibility</v-icon><span>{{article.views}}</span></span>
                </v-card-text>
            </v-card>
        </v-hover>
    </div>
</template>
<script>

export default {
    props: {
        article: {
            type: Object
        }
    },
    computed: {
        articleTime: function() {
            if (!isNaN(Date.parse(this.article.time))) {
                return new Date(this.article.time).Format('yyyy-MM-dd');
            }
            return this.article.time;
        }
    },
}
</script>
<style scoped>
</style>