<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const items = [
  {
    name: 'Истифодабардагон',
    link: 'users',
  },
  {
    name: 'Лексияхо',
    link: 'lecture',
  },
  {
    name: 'Кори лаборатори ',
    link: 'laboratory-work',
  },
  {
    name: 'Тестхо',
    link: 'quiz',
  },
  {
    name: 'Адабиётхо',
    link: 'material',
  },
  {
    name: 'Масъалахо',
    link: 'task',
  },
  {
    name: 'Видеохо',
    link: 'video',
  },
]

const route = useRoute()
const router = useRouter()
const linkActive = ref(route.path)

watch(route, (value) => {
  linkActive.value = value.path
})

function logout() {
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <div class="aside">
    <ul class="aside-list">
      <li class="aside__item" v-for="item in items" :key="item.link">
        <router-link
          :to="'/' + item.link"
          class="flex"
          :class="linkActive.includes(item.link) ? 'active' : ''"
        >
          {{ item.name }}
        </router-link>
      </li>
      <li class="aside__item" @click="logout">
        <a> Баромадан </a>
      </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
@import './src/assets/styles/variables';

.aside {
  padding: 20px 0;
  background: $gray-300;
  border-right: 1px solid $gray-400;
  height: 100vh;
  width: 299px;
  position: fixed;
  top: 0;

  &-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0 15px;
  }

  &__item {
    padding: 10px 20px;
    border-radius: 8px;
    transition: 0.4s all;

    &:has(.active) {
      background: $green;

      .icon {
        background: $white;
      }
    }

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      color: $black;
      text-decoration: none;
      cursor: pointer;

      &.active {
        color: $white;
      }
    }
  }
}
</style>