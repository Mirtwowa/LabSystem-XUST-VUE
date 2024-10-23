<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import useUserStore from '@/store/modules/user'

const navigation = [
  { name: '竞赛通知', href: '#' },
  { name: '实验室预约', href: '#' },
  { name: '成果展示', href: '#' },
  { name: '资料汇总', href: '#' },
]

const buttons = [
  { type: 'primary', text: '登录' },
] as const

const userStore = useUserStore()
const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="p-1.5 -m-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="">
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 -m-2.5" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm text-gray-900 font-semibold leading-6">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <el-button
            v-for="button in buttons"
            :key="button.text"
            :type="button.type"
            text
            @click="userStore.logout()"
          >
            {{ button.text }}
          </el-button>
          <!--          <button  @click="userStore.logout()" class="text-sm font-semibold leading-6 text-gray-900">登录<span aria-hidden="true">&rarr;</span></button> -->
        </div>
      </nav>
      <Dialog class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="p-1.5 -m-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
            <button type="button" class="rounded-md p-2.5 text-gray-700 -m-2.5" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="py-6 space-y-2">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="block rounded-lg px-3 py-2 text-base text-gray-900 font-semibold leading-7 -mx-3 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <a href="#" class="block rounded-lg px-3 py-2.5 text-base text-gray-900 font-semibold leading-7 -mx-3 hover:bg-gray-50">登录</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl -top-40 -z-10 sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] rotate-[30deg] from-[#ff80b5] to-[#9089fc] bg-gradient-to-tr opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] -translate-x-1/2" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-2xl py-32 lg:py-56 sm:py-48">
        <div class="text-center">
          <h1 class="text-balance text-4xl text-gray-900 font-bold tracking-tight sm:text-6xl">
            计算机创新创业实验室
          </h1>
          <p class="mt-6 text-lg text-gray-600 leading-8">
            欢迎来到计算机双创实验室，我们致力于探索科学的前沿，通过创新研究为解决现实世界中的挑战提供方案。实验室拥有舒适的环境，支持我们在人工智能、APP开发、Web开发等多个领域有着深入的研究。
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
              开始
            </a>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] -z-10" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] from-[#ff80b5] to-[#9089fc] bg-gradient-to-tr opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] -translate-x-1/2" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
