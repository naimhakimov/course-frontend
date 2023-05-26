<script setup>
const userData = JSON.parse(localStorage.getItem('user'))
</script>

<template>
  <header>
    {{ userData.user.first_name + ' ' + userData.user.last_name }}

    <img src='../assets/images/no-avatar.webp'
         @error="$event.target.src = noImage"
         alt="">
  </header>
</template>

<style lang="scss" scoped>

header {
  padding: 20px;
  border-bottom: 1px solid var(--gray-400);
  position: sticky;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 15px;
  top: 0;
  background: var(--white);
  z-index: 100;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 50%;
  }
}
</style>
