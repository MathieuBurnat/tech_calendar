<template lang="jade">

  {{ greeting }} World!
  OtherComponent
</template>

<script>
import OtherComponent from './Header.vue'
export default {
  components: {
    OtherComponent
  },
  data () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>

