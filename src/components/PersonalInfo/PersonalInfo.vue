<template>
    <div>
        <v-card class="text-center" style="width: 315px">
            <v-card-media class="pa-3">
                <v-avatar size="80px">
                    <v-img :src="bloggerInfo.BloggerAvatar"></v-img>
                </v-avatar>
            </v-card-media>
            <v-card-text class="subheading pa-0">
                {{bloggerInfo.BloggerName}}
            </v-card-text>
            <v-card-text>
                <v-tooltip top v-for="item in links" :key="item.link">
                    <v-btn fab small depressed color="rgba(0,0,0,0.1)" slot="activator" :href="item.link" :target="item.target">
                        <v-icon>{{$vuetify.icons[item.icon]}}</v-icon>
                    </v-btn>
                    <span>{{item.description}}</span>
                </v-tooltip>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sharedState: this.$store.state,
            links: [
                { link: "https://github.com/zzy213326", icon: "github-circle", description: "github", target :"_blank", },
                { link: "mailto:zzymailaddr@gmail.com", icon: "email", description: "email", target : "_blank", },
                { link: "https://telegram.me/touisorahe", icon: "telegram", description: "telegram", target : "_blank", },
            ],
        };
    },
    computed: {
        bloggerInfo() {
            return this.$store.getConfig().BloggerInfo;
        },
    },
};
</script>
<style scoped>
</style>