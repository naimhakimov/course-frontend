<template>
  <footer class='footer'>
    <div class='container'>
      <div class='footer__body'>
        <div class='footer__items'>
          <div class='footer__item'>
            <div class='footer__title'>Рақами телефонҳо барои тамос:</div>
            <div class='footer__list'>
              <div class='footer__link'>+992 00 177 51 04</div>
              <div class='footer__link'>+992 98 562 85 80</div>
            </div>
          </div>

          <div class='footer__item'>
            <div class='footer__title'>Барои истифодабарандагон:</div>
            <div class='footer__list'>
              <div class='footer__link'>Истифодабарандагон дар ҷои аввал меистанд.</div>
              <div class='footer__link'>Тарзи омӯзиши беҳтарин.</div>
              <div class='footer__link'>Мутахассиси кори худ ҳастем.</div>

            </div>
          </div>
          <div class='footer__item'>
            <div class='footer__title'>Мо дар шабакаҳои иҷтимоӣ:</div>
            <div class='footer__socials'>
              <a href='#' class='footer__social'>
                <img src='@/assets/images/facebook.svg' alt=''>
              </a>
              <a href='#' class='footer__social'>
                <img src='@/assets/images/instagram.svg' alt=''>
              </a>
              <a href='#' class='footer__social'>
                <img src='@/assets/images/telegram.svg' alt=''>
              </a>
            </div>
          </div>
        </div>
        <div class='footer__line'></div>
        <div class='footer__copyright'>
          <div>© 2023 Ҳамаи ҳуқуқҳо ҳифз карда шудаанд</div>

        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: #111;
  height: auto;
  width: 100vw;
  padding: 15px 70px;
  color: white;
  text-align: center;
}


.footer__line {
  width: 100%;
  height: 1px;
  margin: 20px 0;

  background: white;
}

.footer__copyright {
  text-align: right;
  justify-content: space-between;
  color: white;

}

.footer__copyright > div {
  color: white;
  font-weight: bold;
}

.footer__copyright > a {
  color: white;
  text-decoration: none;
}

.footer__items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.footer__item {
  margin-top: 50px;
  margin-bottom: 20px;
}

.footer__socials {
  margin: 25px 0 0 0;
  padding-left: 35px;
  display: flex;
  column-gap: 15px;
}

.footer__list {
  margin: 15px 0 0 0;
  color: #ffffff;
}

.footer__title {
  color: white;
  font-weight: bold;
}

.footer__link {
  margin: 5px 0;
  color: white;
}


</style>