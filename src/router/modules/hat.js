const Layout = () => import('@/layout/index.vue')
const Snapshot = () => import('@/views/hat/snapshot.vue')
const Alarm = () => import('@/views/hat/alarm.vue')
const Statistic = () => import('@/views/hat/statistic.vue')

export default [
  {
    path: '/hat',
    component: Layout,
    name: 'DashboardHat',
    meta: {
      title: 'menu.hatmanagement',
    },
    // icon: 'icon-home',
    children: [
      {
        path: 'snapshot',
        name: 'HatSnapshot',
        component: Snapshot,
        meta: {
          title: 'menu.hatsnapshot',
          affix: true,
        },
      },
      {
        path: 'alarm',
        name: 'HatAlarm',
        component: Alarm,
        meta: {
          title: 'menu.hatalarm',
          affix: true,
        },
      },
      {
        path: 'statistic',
        name: 'HatStatistic',
        component: Statistic,
        meta: {
          title: 'menu.hatstatistic',
          affix: true,
        },
      },
    ],
  },
]
