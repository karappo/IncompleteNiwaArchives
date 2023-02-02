<template lang="pug">
.sorryScreen
  h1.en
    img(
      src='~/assets/image/top/logo-en.png'
      srcset='~/assets/image/top/logo-en.png 1x, ~/assets/image/top/logo-en@2x.png 2x'
      alt='Incomplete Niwa Archives'
    )
  p.ja
    | このページはモバイル端末には最適化されていません。<br>
    | デスクトップ版 Chrome での閲覧を推奨します。<br>
    | また、数GBの通信容量を消費する可能性がありますので、モバイル回線での閲覧にはご注意下さい。
  p.en
    | This page is not optimized for mobile devices. We recommend using the desktop version of Chrome. Also, please be careful when browsing on a mobile connection as it may consume several GB of communication space.
  a(@click="$store.commit('acceptUnoptimizedSP', true)") Accept and force to browse
  //- nuxt-link(to="/") Back to top
</template>

<style lang="sass" scoped>
.sorryScreen
  background-color: #121212
  color: white
  width: calc(100% - 40px)
  height: calc(100% - 40px)
  padding: 20px
  display: flex
  flex-direction: column
  justify-content: flex-end
  h1.en
    position: absolute
    top: 23px
    left: 20px
    margin-top: 0
    margin-bottom: auto
    img
      width: 105px
      height: auto
  p
    font-size: 12px
    line-height: 2
  p + p
    margin-top: 20px
  a
    margin-top: 40px
    margin-bottom: 20px
    background-color: #CECECE
    color: black
    font-size: 16px
    display: block
    height: 30px
    border-radius: 30px
    display: flex
    justify-content: center
    align-items: center
    padding: 10px
</style>
