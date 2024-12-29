const Layout = () => import('@/layout/index.vue')
const Snapshot = () => import('@/views/glass/snapshot.vue')
const Alarm = () => import('@/views/glass/alarm.vue')
const Statistic = () => import('@/views/glass/statistic.vue')

export default [
  {
    path: '/glass',
    component: Layout,
    name: 'DashboardGlass',
    meta: {
      title: 'menu.glassmanagement',
    },
    // icon: 'icon-home',
    children: [
      {
        path: 'snapshot',
        name: 'GlassSnapshot',
        component: Snapshot,
        meta: {
          title: 'menu.glasssnapshot',
          affix: true,
        },
      },
      {
        path: 'alarm',
        name: 'GlassAlarm',
        component: Alarm,
        meta: {
          title: 'menu.glassalarm',
          affix: true,
        },
      },
      {
        path: 'statistic',
        name: 'GlassStatistic',
        component: Statistic,
        meta: {
          title: 'menu.glassstatistic',
          affix: true,
        },
      },
    ],
  },
]
