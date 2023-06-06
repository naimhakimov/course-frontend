<template>
  <header class='header'>
    <div class='header_left'>
      <div class='logo_img'>
        <img src='@/assets/images/logo1.png' alt='logo'>
      </div>
      <div class='logo_name'>
        <div class='logo_name_top'>Бехатарии иттилоотӣ</div>
        <div class='logo_name_bottom'>ва ҳимояи иттилоот</div>
      </div>
    </div>
    <div class='header_right'>
      <i class='fa fa-bars'></i>
      <ul id='active'>
        <li><i class='fa fa-times'></i></li>
        <li><router-link to='/client'>Асосӣ</router-link></li>
        <li><router-link to='/client/lecture'>Лексия</router-link></li>
        <li><router-link to='/client/task'>Супориш</router-link></li>
        <li><router-link to='/client/quiz'>Тест</router-link></li>
        <li><router-link to='/client/material'>Адабиёт</router-link></li>
        <li><router-link to='/client/login'  class='login act'>Даромад</router-link></li>
      </ul>
    </div>
  </header>
</template>

<style lang='css' scoped>
ul {
  padding: 0 !important;
  margin: 0 !important;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #327076;
  height: 60px;
  box-shadow: 0 0 8px #444;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header_left {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
}

.header_right {
  margin-right: 40px;
}

.logo_img img {
  width: 45px;
  height: 38px;
}

.logo_name_top {
  color: #fff;
  text-transform: uppercase;
  margin-left: 15px;
  font-weight: 700;
  font-size: 13px;
  white-space: nowrap;
}

.logo_name_bottom {
  color: #fff;
  margin-left: 15px;
  white-space: nowrap;
}

.header_right ul {
  display: flex;
}

.header_right ul li {
  white-space: nowrap;
}

.header_right ul li a {
  color: #fff;
  margin-left: 30px;
}

.header_right ul li a:hover {
  color: #de6060;
}

.header_right ul li a.act {
  color: #de6060;
}

.header_right i.fa-bars, .header_right i.fa-times {
  display: none;
}
</style>