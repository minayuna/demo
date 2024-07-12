// export const constantRoute = [
//   {
//     path: '/',
//     name: 'layout',
//     component: () => import('@/layout/index.vue'),
//     redirect: '/home',
//     chirdren: [
//       {
//         path: '/home',
//         component: () => import('@/views/home/index.vue'),
//         meta: {
//           title: '首页'
//         }
//       },
//       {
//         path: '/guide',
//         component: () => import('@/views/guide/index.vue'),
//         meta: {
//           title: '比赛指南'
//         }
//       },
//       {
//         path: '/show',
//         component: () => import('@/views/show/index.vue'),
//         meta: {
//           title: '作品展示'
//         }
//       },
//       {
//         path: '/winnerList',
//         component: () => import("@/views/winnerList/index.vue"),
//         meta: {
//           title: '获奖名单'
//         }
//       },
//       {
//         path: '/apply',
//         component: () => import('@/views/apply/index.vue'),
//         meta: {
//           title: '我要报名'
//         }
//       },
//       {
//         path: '/score',
//         component: () => import('@/views/score/index.vue'),
//         meta: {
//           title: '进入专家评审'
//         }
//       },
//     ]
//   },
//   {
//     path: '/404',
//     name: '404',
//     component: () => import('@/views/404/index.vue'),
//     meta: {
//       title: '404'
//     }
//   },
//   {
//     path: '/:pathMatch(/*)*)',
//     redirect: '/404',
//     name: 'any',
//     meta: {
//       title: 'any'
//     }
//   }
// ]

export const constantRoute = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      nav: false
    }
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      nav: true
    }
  },
  {
    path: '/guide',
    component: () => import('@/views/guide/index.vue'),
    meta: {
      title: '比赛指南',
      nav: true
    }
  },
  {
    path: '/show',
    component: () => import('@/views/show/index.vue'),
    meta: {
      title: '作品展示',
      nav: true
    }
  },
  {
    path: '/winnerList',
    component: () => import("@/views/winnerList/index.vue"),
    meta: {
      title: '获奖名单',
      nav: true
    }
  },
  {
    path: '/apply',
    component: () => import('@/views/apply/index.vue'),
    meta: {
      title: '我要报名',
      nav: true
    }
  },
  {
    path: '/score',
    component: () => import('@/views/score/index.vue'),
    meta: {
      title: '进入专家评审',
      nav: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      nav: false
    }
  },
  {
    path: '/:pathMatch(/*)*)',
    redirect: '/404',
    name: 'any',
    meta: {
      title: 'any',
      nav: false
    }
  }
]