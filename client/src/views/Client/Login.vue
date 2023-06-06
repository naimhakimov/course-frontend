<template>
  <div class="lecture">
    <div class="login_form">
      <form action="#" method="post">
        <div class="reg_h1">
          <div @click="log()" class="log_b log_act" id="log_b">Даромад</div>
          <div @click="reg()" class="reg_b" id="reg_b">Бақайдгирӣ</div>
        </div>
        <div id="log_input">
          <input class="log" type="text" name="login" placeholder="E-mail">
          <input class="log" type="password" name="password" placeholder="Парол">
          <input class="submit" type="submit" value="Даромад">
        </div>
        <div id="reg_input" class="none">
          <input class="log" type="text" name="name" placeholder="Ном">
          <input class="log" type="text" name="name" placeholder="Насаб">
          <input class="log" type="text" name="login" placeholder="E-mail">
          <input class="log" type="text" name="password_reg" placeholder="Парол">
          <input class="submit" type="submit" value="Бақайдгирӣ">
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
function openMenu() {
  document.getElementById("active").classList.toggle('active');
}
function log() {
  document.getElementById("log_b").classList.add('log_act');
  document.getElementById("reg_b").classList.remove('reg_act');
  document.getElementById("log_input").classList.remove('none');
  document.getElementById("reg_input").classList.add('none');
}
function reg() {
  document.getElementById("reg_b").classList.add('reg_act');
  document.getElementById("log_b").classList.remove('log_act');
  document.getElementById("log_input").classList.add('none');
  document.getElementById("reg_input").classList.remove('none');
}
</script>

<style scoped>

</style>