import Vue from 'vue'
import Router from 'vue-router'
const blog = () => import('components/blog/blog.vue')
const music = () => import('components/music/music.vue')
const archive = () => import('components/archive/archive.vue')
const message = () => import('components/message/message.vue')
const article = () => import('components/article/article.vue')
const PersonalInfo = () => import('components/PersonalInfo/PersonalInfo.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      components: {
        left: blog,
        right: PersonalInfo
      },
      meta: {
        title: '首页'
      }
    },
    {
      path: '/archive',
      components: {
        left: archive,
        right: PersonalInfo
      },
      meta: {
        title: '归档'
      }
    },
    {
      path: '/music',
      components: {
        left: music
      },
      meta: {
        title: '音乐'
      }
    },
    {
      path: '/message',
      components: {
        left: message
      },
      meta: {
        title: '留言'
      }
    },
    {
      path: '/blog/:id',
      components: {
        left: article,
        right: PersonalInfo
      },
      props: {
        left: true
      },
      meta: {
        title: '博文'
      }
    },
    {
      path: '/archive/:id',
      components: {
        left: blog,
        right: PersonalInfo
      },
      props: {
        left: true
      },
      meta: {
        title: '标签详情'
      }
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
