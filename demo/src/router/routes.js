import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

export const constantRoute = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    chirdren: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/guide',
        name: 'guide',
        component: () => import('@/views/guide/index.vue'),
        meta: {
          title: '比赛指南'
        }
      },
      {
        path: '/show',
        name: 'show',
        component: () => import('@/views/show/index.vue'),
        meta: {
          title: '作品展示'
        }
      },
      {
        path: '/winnerList',
        name: 'winnerList',
        component: () => import("@/views/winnerList/index.vue"),
        meta: {
          title: '获奖名单'
        }
      },
      {
        path: '/apply',
        name: 'apply',
        component: () => import('@/views/apply/index.vue'),
        meta: {
          title: '我要报名'
        }
      },
      {
        path: '/score',
        name: 'score',
        component: () => import('@/views/score/index.vue'),
        meta: {
          title: '进入专家评审'
        }
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/:pathMatch(/*)*)',
    redirect: '/404',
    name: 'any',
    meta: {
      title: 'any'
    }
  }
]