<template>
  <v-container v-if="!logged" fluid fill-height justify-center align-center>
    <Login v-on:loggingSuccess="loggedIn"/>
  </v-container>
  <v-container v-else>
    <Navbar/>
    <router-view></router-view>
  </v-container>
</template>



<script>
import Register from '../components/Register';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
// import Notifs from '../components/Notifs'

export default {
  data () {
    return {
      id: -1,
      logged: false,
      loading: false,
      actions: true,
      tags: ['Netflix & chill', 'Adventurer', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Romantic', 'Gamer'],
      selected : [],
    }
  },
  mounted () {
    // recup du localstorage et si ya rien set a -1 et logged a false
  },
  components: {
    Register,
    Login,
    Navbar,
    //Notifs
  },
  methods: {
    loggedIn(userId)
    {
      this.id = userId;
      console.log(userId);
      this.logged = true;
    }
  }
};
</script>
