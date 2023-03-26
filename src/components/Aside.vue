<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const items = [
  {
    name: 'Главная',
    icon: 'home',
    link: '/'
  },
  {
    name: 'Курс',
    icon: 'course',
    link: '/course'
  },
  {
    name: 'Создать',
    icon: 'create',
    link: '/create'
  }
]

const route = useRoute()
const linkActive = ref(route.path)

watch(route, (value, oldValue, onCleanup) => {
  linkActive.value = value.path
})

function logout() {
  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <div class='aside'>
    <ul class='aside-list'>
      <li class='aside__item'
          v-for='item in items'>
        <router-link :to='item.link' class='flex' :class="linkActive === item.link ? 'active' : ''">
          {{ item.name }}
        </router-link>
      </li>
      <li class='aside__item' @click='logout'>
        <a>
          Выйти
        </a>
      </li>
    </ul>

  </div>
</template>

<style lang='scss' scoped>
@import "./src/assets/styles/variables";

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
    transition: .4s all;


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