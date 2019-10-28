<template>
  <v-container v-if="!logged" fluid fill-height justify-center align-center>
    <Login v-on:loggingSuccess="loggedIn" v-on:alertMsg="fireAlert" />
  </v-container>
  <v-container v-else>
    <Navbar />
    <router-view v-on:alertMsg="fireAlert" v-on:notif=""></router-view>
  </v-container>
</template>



<script>
import io from "socket.io-client";
import Register from "../components/Register";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
// import Notifs from '../components/Notifs'

export default {
  data() {
    return {
      id: -1,
      logged: false,
      loading: false,
      actions: true,
      tags: [
        "Netflix & chill",
        "Adventurer",
        "Athletic",
        "Gastronomy",
        "Nature lovers",
        "Nightlife",
      ],
      selected: [],
      socket: io("localhost:5000")
    };
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
    });
    // recup du localstorage et si ya rien set a -1 et logged a false
  },
  components: {
    Register,
    Login,
    Navbar
    //Notifs
  },
  methods: {
    loggedIn(userId) {
      this.id = userId;
      console.log(userId);
      this.logged = true;
    },
    fireAlert(state, message) {
      this.$emit("alertMsg", state, message);
    },
    notif() {
      this.$emit(notif, obj);
    }
  }
};
</script>
