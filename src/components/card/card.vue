<template>
    <div v-if="article">
        <v-layout align-center justify-center>
            <v-flex sm10 md12>
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" :to="'/blog/'+article.blogID">
                        <v-img class="white--text" height="200px" src="https://source.unsplash.com/random/800x600">
                            <v-container fill-height fluid>
                                <v-layout fill-height column>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline">{{article.title}}</span>
                                    </v-flex>
                                    <v-flex xs12 align-end flexbox>
                                        <div class="subheading">
                                            {{article.summary}}
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                        <div class="grey--text px-3 pt-2">
                            <span class="body-1"><v-icon size="18px">date_range</v-icon>{{articleTime}}</span>&nbsp;&nbsp;
                            <span class="body-1"><v-icon size="18px">title</v-icon><span>{{article.words}}</span></span>&nbsp;&nbsp;
                            <span class="body-1"><v-icon size="18px">visibility</v-icon><span>{{article.views}}</span></span>
                        </div>
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import VueMarkdown from "vue-markdown"

export default {
    props: {
        article: {
            type: Object
        }
    },
    computed: {
        articleTime: function() {
            if (!isNaN(Date.parse(this.article.time))) {
                return new Date(this.article.time).Format('yyyy年MM月dd日');
            }
            return this.article.time;
        }
    },
    components: {
        "vue-markdown": VueMarkdown
    },
    methods: {
        markdownRendered: function() {
            this.$nextTick(() => { this.$highlight(); });
        },
    },
}
</script>
<style scoped>
</style>