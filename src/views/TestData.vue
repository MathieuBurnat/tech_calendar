<template>
  <Header/>
    <h2> Test. Test. Test-Data !</h2>
</template>

<script>
  import Header from './Header.vue'

  export default {
    components: {
      Header
    }
  }


  function connection(){
    // getting-started.js
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    // we're connected!
    });
  }
</script>
