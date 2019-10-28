<template>
  <v-container v-if="!logged" fluid fill-height justify-center align-center>
    <Login v-on:loggingSuccess="loggedIn" v-on:alertMsg="fireAlert" />
  </v-container>
  <v-container v-else>
    <Navbar v-on:loggingOutSuccess="loggedOut"/>
    <Navbar />
    <router-view v-on:alertMsg="fireAlert"></router-view>
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
  created () {
    document.addEventListener('beforeunload', this.loggedOut);
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
    });
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
     // console.log(userId);
      this.logged = true;
    },
    loggedOut()
    {
      this.id = -1;
      this.logged = false; // penser a faire la requete qui delog et enregistre la derniere heure de connection
      axios.post("http://localhost:8001/getUserOnline", {
        userId: this.id,
        online: 0,
      });
      axios.post("http://localhost:8001/saveLastConnection", {
        userId: this.id,
      });
    },
    fireAlert(state, message) {
      this.$emit("alertMsg", state, message);
    }
  }
};
</script>
