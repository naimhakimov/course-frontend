<script setup>
const noImage = 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
const userData = JSON.parse(localStorage.getItem('user'))
</script>

<template>
  <header>
    {{ userData.user.first_name + ' ' + userData.user.last_name }}

    <img :src="userData.user?.image?.url ?  userData.user?.image?.url : noImage"
         @error="$event.target.src = noImage"
         alt="">
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

header {
  padding: 20px;
  border-bottom: 1px solid $gray-400;
  position: sticky;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 15px;
  top: 0;
  background: $white;
  z-index: 100;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 50%;
  }
}
</style>