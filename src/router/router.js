import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      name: 'error',
      redirect: '/error/404',
      component: Layout,
      meta: { title: '错误' },
      children: [
        {
          path: '404',
          name: '404',
          components: {
            left: () => import('@/views/404/404.vue')
          },
          meta: { title: '资源不存在' }
        }
      ]
    },

    {
      path: '/blog',
      name: 'blog',
      redirect: '/blog/blog-list',
      component: Layout,
      meta: { title: '博客' },
      children: [
        {
          path: 'blog-list',
          name: 'blog-list',
          components: {
            left: () => import('@/views/blog/blog.vue'),
            right: () => import('components/PersonalInfo/PersonalInfo.vue')
          },
          meta: { title: '博客列表' }
        },
        {
          path: ':id',
          name: 'article',
          components: {
            left: () => import('components/article/article.vue'),
            right: () => import('components/PersonalInfo/PersonalInfo.vue')
          },
          props: {
            left: true
          },
          meta: { title: '文章' }
        }
      ]
    },

    {
      path: '/archive',
      name: 'archive',
      redirect: '/archive/archive-list',
      component: Layout,
      meta: { title: '归档' },
      children: [
        {
          path: 'archive-list',
          name: 'archive-list',
          components: {
            left: () => import('components/archive/archive.vue'),
            right: () => import('components/PersonalInfo/PersonalInfo.vue')
          },
          meta: { title: '归档' }
        },
        {
          path: ':id',
          name: 'article-tag',
          components: {
            left: () => import('@/views/blog/blog.vue'),
            right: () => import('components/PersonalInfo/PersonalInfo.vue')
          },
          props: {
            left: true
          },
          meta: { title: '文章' }
        }
      ]
    },

    {
      path: '/music',
      name: 'music',
      redirect: '/music/play-list',
      component: Layout,
      meta: { title: '音乐' },
      children: [
        {
          path: 'play-list',
          name: 'play-list',
          components: {
            left: () => import('components/music/music.vue'),
            right: () => import('components/PersonalInfo/PersonalInfo.vue')
          },
          meta: { title: '音乐' }
        }
      ]
    },

    {
      path: '/message',
      name: 'message',
      redirect: '/message/message-list',
      component: Layout,
      meta: { title: '留言' },
      children: [
        {
          path: 'message-list',
          name: 'message-list',
          components: {
            left: () => import('components/message/message.vue'),
            right: () => import('components/PersonalInfo/PersonalInfo.vue')
          },
          meta: { title: '留言板' }
        }
      ]
    },

    { path: '/', redirect: '/blog/blog-list' },

    { path: '/_empty' },
    { path: '*', redirect: '/error/404' }
  ],
  linkActiveClass: 'active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})
