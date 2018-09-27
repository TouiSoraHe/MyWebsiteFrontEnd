<template>
    <transition mode="out-in" name="fade-transition">
        <v-toolbar dense fixed v-if="!isMobile" key="pcNav">
            <v-flex md2></v-flex>
            <v-toolbar-items>
                <v-btn flat to="/">
                    <v-icon left>home</v-icon><span>主页</span>
                </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat v-for="item in links" :to="item.url" :key='item.title'>
                    <v-icon>{{ item.icon }}</v-icon><span>{{ item.title }}</span>
                </v-btn>
            </v-toolbar-items>
            <v-flex md2></v-flex>
        </v-toolbar>
        <div v-else key="mobileNav">
            <v-btn small fixed fab @click.stop="drawer = !drawer" style="top: 10px;left: 10px;"><v-icon>menu</v-icon></v-btn>
            <v-navigation-drawer v-model="drawer" fixed temporary width="200">
                <v-list class="pa-1">
                    <v-list-tile to="/">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>主页</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-list class="pt-0" dense>
                    <v-divider class="ma-0"></v-divider>
                    <v-list-tile v-for="item in links" :to="item.url" :key="item.title" ripple>
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            drawer: false,
            links: [
                { title: '博文', icon: 'format_bold', url: '/blog' },
                { title: '归档', icon: 'archive', url: '/archive' },
                { title: '音乐', icon: 'music_video', url: '/music' },
                { title: '留言', icon: 'message', url: '/message' },
            ],
        };
    },
}
</script>
<style scoped>
</style>