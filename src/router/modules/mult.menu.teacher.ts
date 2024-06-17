import type { RouteRecordRaw } from 'vue-router'
function Layout() {
  return import('@/layouts/index.vue')
}


const routes: RouteRecordRaw = {
  path: '/mult_menu_teacher',
  component: Layout,
  redirect: '/multilevel_menu_example/page.vue',
  name: 'multilevelMenuTeacher',
  meta: {
    title: '指导教师',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'teacher1',
      name: 'multilevelMenuTeacher1',
      component: () => import('@/views/mult_menu_teacher/teacher.vue'),
      meta: {
        title: '靳红梅',
      },
    },
    {
      path: 'teacher2',
      name: 'multilevelMenuTeacher2',
      component : () =>import('@/views/mult_menu_teacher/teacher.vue'),
      meta: {
        title: '贾澎涛',
      },
    },

  ],

}

export default routes
