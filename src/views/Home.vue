<template>
  <Header/>
  <h1>Bienvenue ! </h1>
  <p>Avant de pouvoir bénéficier des services de l'application et de façon à conserver vos calendriers de façon sécurisée, vous devez vous connecter. </p>
  <Login/>

</template>

<script>
import Header from './Header.vue'
import Login from './Login.vue'

export default {
  components: {
    Header,
    Login
  }
}
</script>

