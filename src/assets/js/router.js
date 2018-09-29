import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index/index.vue'
import blog from 'components/blog/blog.vue'
import music from 'components/music/music.vue'
import archive from 'components/archive/archive.vue'
import message from 'components/message/message.vue'
import article from 'components/article/article.vue'
import PersonalInfo from 'components/PersonalInfo/PersonalInfo.vue'

Vue.use(Router)

let router = new Router({
    routes: [
        { path: '/', components: { left: index }, meta: { title: '首页' } },
        { path: '/blog', components: { left: blog, right: PersonalInfo }, meta: { title: '博文' } },
        { path: '/archive', components: { left: archive }, meta: { title: '归档' } },
        { path: '/music', components: { left: music }, meta: { title: '音乐' } },
        { path: '/message', components: { left: message }, meta: { title: '留言' } },
        { path: '/blog/:id', components: { left: article, right: PersonalInfo }, props: { left: true }, meta: { title: '博文' } }
    ],
    linkActiveClass: 'active',
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;