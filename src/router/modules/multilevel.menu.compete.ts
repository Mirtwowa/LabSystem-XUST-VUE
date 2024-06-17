import type { RouteRecordRaw } from 'vue-router'
import MultMenuTeacher from "@/router/modules/mult.menu.teacher.ts";
function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/multilevel_menu_example',
  component: Layout,
  redirect: '/multilevel_menu_example/page.vue',
  name: 'multilevelMenuExample',
  meta: {
    title: '竞赛通知',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: '/test',
      name: 'multilevelMenuExample1',
      component: () => import('@/views/multilevel_menu_example/compete.vue'),
      meta: {
        title: '学科竞赛',
      },
    },
    {
      path: 'team',
      name: 'multilevelMenuExample2',
      component : () => import('@/views/multilevel_menu_example/team.vue'),
      meta: {
        title: '参赛队伍',
      },
    },

  ],

}

export default routes
